import { ApiListResponse, ApiRetrieveResponse, NotyResponse } from "@/models/other";
import { call, Method } from "./api";
import { Annonce, AnnonceObject } from "@/models/annonce";
import { FormData } from 'formdata-node'; // Import from form-data package
import { blobFrom } from 'node-fetch';

export async function syncAnnonces() {

    let notyApiKey = process.env.NOTY_API_KEY
    let baseApiPath = "https://api.broadcast.test.noty.fr"

    let response: NotyResponse<Annonce> = await call(baseApiPath + "/annonces", Method.get, null, "application/json", {
        "AUTH-TOKEN": notyApiKey
    })


    for (let i = 0; i < response.results.length; i++) {
        const annonce = response.results[i];



        let { data: existingStrapiAnnonce }: ApiListResponse<AnnonceObject> = await call(`annonces?filters[uuid][$eq]=${annonce.uuid}`, Method.get)
        console.log(existingStrapiAnnonce)

        if (!existingStrapiAnnonce || existingStrapiAnnonce.length == 0) {

            const uploadedStrapiAnnonce: ApiRetrieveResponse<AnnonceObject> = await (await fetch('https://admin.laube-lhomme-caulnes.notaires.fr/api/annonces', {
                method: 'post',
                body: JSON.stringify({
                    data: {
                        uuid: annonce.uuid,
                        natureBien: annonce.bien.nature,
                        transaction: annonce.transaction,
                        object: annonce
                    } // Strapi attend un objet sous la clé "data"
                }),
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${process.env.STRAPI_API_TOKEN}`
                }
            })).json();


            const formData = new FormData();
            formData.append('refId', uploadedStrapiAnnonce.data.id);
            formData.append('ref', 'api::annonce.annonce');
            formData.append('field', 'photos');

            for (let j = 0; j < annonce.bien.photos.length; j++) {
                const photo = annonce.bien.photos[j];
                if (photo && photo.href) {
                    const photoBinary = await fetch(`${photo.href}`);
                    let photoBuffer = await photoBinary.arrayBuffer();
                    //  upload photo to strapi
                    if (photoBuffer) {
                        console.log(photoBuffer)

                        const blob = new Blob([photoBuffer], { type: "image/jpeg" });
                        console.log(blob)
                        formData.append('files', blob, `${annonce.uuid}-${i}.jpeg`);
                    }
                }
            }

            if (annonce.bien.photos.length > 0) {


                const strapiPhoto = await fetch('https://admin.laube-lhomme-caulnes.notaires.fr/api/upload', {
                    method: 'post',
                    body: formData,
                    headers: {
                        "Authorization": `Bearer ${process.env.STRAPI_API_TOKEN}`
                    }
                });
                console.log(strapiPhoto)
                let photoResponse = await strapiPhoto.json()

                console.log(photoResponse)


            }
        }
    }
}