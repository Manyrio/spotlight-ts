

import { Etude } from "./etudes";
import { Image } from "./image";
import { ApiListResponse, ApiRetrieveResponse, ObjectInterface } from "./other";

export class MailReservation implements ObjectInterface {
    constructor(
        public id: string = "",
        public attributes = {
            sendObject: "", // Text
            send: "", // Rich text (Markdown)
            confirmationObject: "", // Text
            confirmation: "", // Rich text (Markdown)
            deniedObject: "", // Text
            denied: "", // Rich text (Markdown)
            cancelObject: "", // Text
            canceled: "", // Rich text (Markdown)
            moveObject: "", // Text
            move: "", // Rich text (Markdown)
        },
    ) {
        this.id = id;
        this.attributes = attributes;
    }
}
