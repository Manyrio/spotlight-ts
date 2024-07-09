import { ObjectInterface } from "./other";

export class Image implements ObjectInterface {
    constructor(
        public id: string = "",
        public attributes = {
            "name": "",
            "alternativeText": "",
            "caption": "",
            "width": 0,
            "height": 0,
            "hash": "",
            "ext": "",
            "mime": "",
            "size": 0,
            "url": "",
            "previewUrl": "",
            "provider": "",
            "provider_metadata": "",
        },
    ) {
        this.id = id;
        this.attributes = attributes;
    }
}



