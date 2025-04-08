

import { Etude } from "./etudes";
import { Image } from "./image";
import { ApiListResponse, ApiRetrieveResponse, ObjectInterface } from "./other";

export class ContenusAffiches implements ObjectInterface {
    constructor(
        public id: string = "",
        public attributes = {
            maskArticles: false,
            maskAnnonces: false,
            maskMap: false,
            maskMeetings: false,
        },
    ) {
        this.id = id;
        this.attributes = attributes;
    }
}
