import { AnnonceObject } from "@/models/annonce";
import { ApiListResponse } from "@/models/other";
import { call, Method } from "@/scripts/api";
import { NextRequest, NextResponse } from "next/server";
import { Annonce, getAnnonceSurface, TypeTransaction } from '@/models/annonce'
import { ApiRetrieveResponse, NotyResponse } from '@/models/other'


export async function GET(req: NextRequest, { params }: { params: { id: string } }) {

    let id = params.id

    if (id == "sync") {
        syncAnnonces()
        return NextResponse.json({
            message: "syncing"
        }, {
            status: 200,
        })
    }

    let response: ApiListResponse<AnnonceObject> = await call("annonces?populate=*&filters[uuid][$eq]=" + id, Method.get)
    console.log(response)
    let annonce = response.data.find(a => a.attributes.uuid == id) as AnnonceObject

    if (annonce) {
        return NextResponse.json(annonce, {
            status: 200,
        })
    } else {
        return NextResponse.json({
            message: "Not found"
        }, {
            status: 404,
        })
    }

}






async function syncAnnonces() {

    let notyApiKey = process.env.NOTY_API_KEY
    let baseApiPath = process.env.NOTY_API_URL
    let strapiApiPath = process.env.STRAPI_API_URL

    let response: NotyResponse<Annonce> = await call(baseApiPath + "/annonces", Method.get, null, "application/json", {
        "AUTH-TOKEN": notyApiKey
    })




    for (let i = 0; i < response.results.length; i++) {
        const annonce = response.results[i];

        let { data: existingStrapiAnnonce }: ApiListResponse<AnnonceObject> = await call(`annonces?filters[uuid][$eq]=${annonce.uuid}`, Method.get)
        console.log(existingStrapiAnnonce)
        let exists = existingStrapiAnnonce && existingStrapiAnnonce.length > 0
        console.log("exists", exists)

        let url = strapiApiPath + '/annonces'
        let suffix = !exists ? '' : '/' + existingStrapiAnnonce[0].id
        let method = !exists ? 'post' : 'put'

        console.log("url", url + suffix)

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
        console.log(uploadedStrapiAnnonce)

        if (!existingStrapiAnnonce || existingStrapiAnnonce.length == 0 && uploadedStrapiAnnonce.data.id) {

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
        }
    }

    return

}


