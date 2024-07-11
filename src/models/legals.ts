import { ObjectInterface } from "./other";

export class Legal implements ObjectInterface {
    constructor(
        public id: string = "",
        public attributes = {
            privacy: "",
            legals: "",
            usage: "",
        },
    ) {
        this.id = id;
        this.attributes = attributes;
    }
}

