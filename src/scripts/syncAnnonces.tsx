import { Annonce, AnnonceObject, TypeTransaction, getAnnonceSurface } from "@/models/annonce";
import { ApiListResponse, ApiRetrieveResponse, NotyResponse } from "@/models/other";
import { Method, call } from "./api";

require("dotenv").config(); // Load environment variables from .env file

export async function syncAnnonces() {
    console.log("running sync annonces")
    let notyApiKey = process.env.NOTY_API_KEY
    let baseApiPath = process.env.NOTY_API_URL
    let strapiApiPath = process.env.STRAPI_API_URL

    let response: NotyResponse<Annonce> = await call(baseApiPath + "/annonces", Method.get, null, "application/json", {
        "AUTH-TOKEN": notyApiKey
    })
    let existingAnnonces: ApiListResponse<AnnonceObject> = await call(`annonces?pagination[pageSize]=100`, Method.get)

    const newAnnonceIds = response.results.map((res) => res.uuid)
    const oldAnnonceIds = existingAnnonces.data.map((res) => res.attributes.uuid)
    const annoncesToRemove = oldAnnonceIds.filter((id) => !newAnnonceIds.includes(id))

    console.log("Old annonces ids: ", annoncesToRemove)
    //delete old annonces
    console.log("deleting old annonces...")
    for (let i = 0; i < annoncesToRemove.length; i++) {
        const annonceId = annoncesToRemove[i];
        let existingStrapiAnnonce = existingAnnonces.data.find((existingAnnonce) => existingAnnonce.attributes.uuid == annonceId)
        if (existingStrapiAnnonce) {
            await await call(`annonces/${existingStrapiAnnonce.id}`, Method.delete)
        }
    }
    console.log("deleted old annonces...")


    for (let i = 0; i < response.results.length; i++) {
        const annonce = response.results[i];

        let existingStrapiAnnonce = existingAnnonces.data.find((existingAnnonce) => existingAnnonce.attributes.uuid == annonce.uuid)
        let exists = existingStrapiAnnonce ? true : false
        console.log("annonce is existing ? ", exists)

        let url = strapiApiPath + '/annonces'
        let suffix = !exists ? '' : '/' + existingStrapiAnnonce!.id
        let method = !exists ? 'post' : 'put'

        const uploadedStrapiAnnonce: ApiRetrieveResponse<AnnonceObject> = await (await fetch(url + suffix, {
            method: method,
            body: JSON.stringify({
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
                                    annonce.transaction === TypeTransaction.vente_traditionnelle ? annonce.prix_hni : null,
                } // Strapi attend un objet sous la clé "data"
            }),
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${process.env.STRAPI_API_TOKEN}`
            }
        })).json();
        console.log("uploaded annonce successfully with uuid: ", annonce.uuid)

        if (!existingStrapiAnnonce && uploadedStrapiAnnonce.data.id) {
            console.log("generating photos...")

            const formData = new FormData();
            formData.append('refId', uploadedStrapiAnnonce.data.id);
            formData.append('ref', 'api::annonce.annonce');
            formData.append('field', 'photos');

            for (let j = 0; j < annonce.bien.photos.length; j++) {
                const photo = annonce.bien.photos[j];
                if (photo && photo.href) {
                    const photoBinary = await fetch(`${photo.href}`);
                    let photoBuffer = await photoBinary.arrayBuffer();
                    if (photoBuffer) {
                        const blob = new Blob([photoBuffer], { type: "image/jpeg" });
                        formData.append('files', blob, `${annonce.uuid}-${i}.jpeg`);
                    }
                }
            }

            if (annonce.bien.photos.length > 0) {
                await fetch(strapiApiPath + '/upload', {
                    method: 'post',
                    body: formData,
                    headers: {
                        "Authorization": `Bearer ${process.env.STRAPI_API_TOKEN}`
                    }
                });

            }
            console.log("generated photos...")

        }
        console.log("processed annonce successfully with uuid: ", annonce.uuid)
    }
    console.log("finished syncAnnonces")


    return

}


