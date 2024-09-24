

import { Etude } from "./etudes";
import { Image } from "./image";
import { ApiListResponse, ApiRetrieveResponse, ObjectInterface } from "./other";

export class Steps implements ObjectInterface {
    constructor(
        public id: string = "",
        public attributes = {
            steps: [{ id: "", question: "", responses: [{ response: "" }] }],
            contact: { "description": "", "title": "" },
        },
    ) {
        this.id = id;
        this.attributes = attributes;
    }
}



