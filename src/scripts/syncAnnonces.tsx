import { Annonce, AnnonceObject, TypeTransaction, getAnnonceSurface } from "@/models/annonce";
import { ApiListResponse, ApiRetrieveResponse, NotyResponse } from "@/models/other";
import { Method, call } from "./api";

require("dotenv").config(); // Load environment variables from .env file

export async function syncAnnonces() {
    console.log("running sync annonces")
    const notyApiKey = process.env.NOTY_API_KEY!;
    const baseApiPath = process.env.NOTY_API_URL!;
    const strapiApiPath = process.env.STRAPI_API_URL!;
    const strapiToken = process.env.STRAPI_API_TOKEN!;

    // 1. Récupère les annonces depuis Noty
    const response: NotyResponse<Annonce> = await call(
        `${baseApiPath}/annonces`,
        Method.get,
        null,
        "application/json",
        { "AUTH-TOKEN": notyApiKey }
    );

    // 2. Récupère les annonces déjà présentes dans Strapi
    const existingAnnonces: ApiListResponse<AnnonceObject> = await call(
        `annonces?pagination[pageSize]=100&populate=photos`,
        Method.get
    );

    // 3. Supprime les annonces obsolètes
    const newIds = response.results.map(r => r.uuid);
    const oldIds = existingAnnonces.data.map(r => r.attributes.uuid);
    const toRemove = oldIds.filter(id => !newIds.includes(id));
    for (const uuid of toRemove) {
        const ann = existingAnnonces.data.find(e => e.attributes.uuid === uuid);
        if (ann) {
            await call(`annonces/${ann.id}`, Method.delete);
            console.log(`Deleted old annonce id=${ann.id}, uuid=${uuid}`);

            console.log("Suppression des anciennes photos ...");

            const oldPhotos = ann.attributes.photos || [];
            console.log("oldPhotos")
            console.log(oldPhotos)
            if (Array.isArray(oldPhotos.data)) {
                for (const photo of oldPhotos.data) {
                    await fetch(`${strapiApiPath}/upload/files/${photo.id}`, {
                        method: "DELETE",
                        headers: { "Authorization": `Bearer ${strapiToken}` }
                    });
                    console.log(`Deleted old photo id=${photo.id}`);
                }
            }
        }
    }

    // 4. Parcours et synchronise chaque annonce
    for (const annonce of response.results) {
        const existing = existingAnnonces.data.find(e => e.attributes.uuid === annonce.uuid);
        const exists = !!existing;
        console.log(`Annonce ${annonce.uuid} exists? `, exists);

        // a) Création ou mise à jour des données d'annonce
        const url = `${strapiApiPath}/annonces${exists ? `/${existing!.id}` : ""}`;
        const method = exists ? "PUT" : "POST";
        const payload = {
            data: {
                uuid: annonce.uuid,
                natureBien: annonce.bien.nature,
                transaction: annonce.transaction,
                tierCreatedAt: annonce.created_at,
                object: annonce,
                nombrePieces: annonce.bien.nb_pieces,
                localisation: annonce.bien.commune.code_postal,
                ville: annonce.bien.commune.libelle,
                surface: getAnnonceSurface(annonce) || 0,
                prix:
                    annonce.transaction === TypeTransaction.location ? annonce.loyer :
                        annonce.transaction === TypeTransaction.vente_immo_interactif ? annonce.prix_hni :
                            annonce.transaction === TypeTransaction.vente_viager ? annonce.rente.montant :
                                annonce.transaction === TypeTransaction.vente_traditionnelle ? annonce.prix_hni :
                                    null,
            }
        };
        const upResp = await fetch(url, {
            method,
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${strapiToken}`
            },
            body: JSON.stringify(payload)
        });
        const uploaded: ApiRetrieveResponse<AnnonceObject> = await upResp.json();
        const annonceId = uploaded.data.id;
        console.log(`Annonce ${annonce.uuid} (${exists ? "MàJ" : "Créée"}) id=${annonceId}`);

        // b) Suppression des anciennes photos s'il y en a
        console.log("Suppression des anciennes photos (le cas échéant)...");
        const strapiWithPhotos = await fetch(
            `${strapiApiPath}/annonces/${annonceId}?populate=photos`,
            {
                method: "GET",
                headers: { "Authorization": `Bearer ${strapiToken}` }
            }
        );
        const strapiJson: ApiRetrieveResponse<AnnonceObject> = await strapiWithPhotos.json();
        const oldPhotos = strapiJson.data.attributes.photos || [];
        console.log("oldPhotos")
        console.log(oldPhotos)
        if (Array.isArray(oldPhotos.data)) {

            for (const photo of oldPhotos.data) {
                await fetch(`${strapiApiPath}/upload/files/${photo.id}`, {
                    method: "DELETE",
                    headers: { "Authorization": `Bearer ${strapiToken}` }
                });
                console.log(`Deleted old photo id=${photo.id}`);
            }
        }

        // c) Ré-upload de toutes les photos
        if (annonce.bien.photos.length > 0) {
            console.log("Upload des nouvelles photos...");
            const formData = new FormData();
            formData.append("refId", String(annonceId));
            formData.append("ref", "api::annonce.annonce");
            formData.append("field", "photos");

            for (let j = 0; j < annonce.bien.photos.length; j++) {
                const photo = annonce.bien.photos[j];
                if (photo?.href) {
                    const resp = await fetch(photo.href);
                    const buf = await resp.arrayBuffer();
                    const blob = new Blob([buf], { type: "image/jpeg" });
                    formData.append("files", blob, `${annonce.uuid}-${j}.jpeg`);
                }
            }

            await fetch(`${strapiApiPath}/upload`, {
                method: "POST",
                headers: { "Authorization": `Bearer ${strapiToken}` },
                body: formData
            });
            console.log("Photos re-uploadées pour annonce", annonce.uuid);
        } else {
            console.log("Aucune photo à uploader pour annonce", annonce.uuid);
        }
    }

    console.log("finished syncAnnonces");
}
