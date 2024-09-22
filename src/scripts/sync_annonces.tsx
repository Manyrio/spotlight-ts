import { NotyResponse } from "@/models/other";
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
    console.log(response)


    for (let i = 0; i < response.results.length; i++) {
        const annonce = response.results[i];
        let photos: any = []

        for (let j = 0; j < annonce.bien.photos.length; j++) {
            const photo = annonce.bien.photos[j];
            if (photo && photo.uuid) {
                let photoBinary = await call(`${baseApiPath}/annonces/${annonce.uuid}/photos/${photo.uuid}`, Method.get, null, "application/json", {
                    "AUTH-TOKEN": notyApiKey
                })

                return photoBinary

                //  upload photo to strapi
                if (photoBinary) {

                    const formData = new FormData();

                    // Convert the binary string to a Buffer
                    const buffer = Buffer.from(photoBinary, 'binary');

                    formData.append('files', buffer);
                    formData.append('refId', annonce.uuid);
                    formData.append('ref', "annonce");
                    formData.append('field', "photos");


                    console.log(formData)
                    try {
                        let strapiPhoto = await call("upload", Method.post, formData);
                        photos.push(strapiPhoto)

                    } catch (error) {
                        console.log(error)
                    }

                }
            }


            let strapiAnnonce: AnnonceObject["attributes"] = {
                object: annonce,
                photos: photos
            }

            console.log(strapiAnnonce)

        }
    }
}