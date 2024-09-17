import { ObjectInterface } from "./other";

export class LienEtSocial implements ObjectInterface {
    constructor(
        public id: string = "",
        public attributes = {
            facebook: "",
            twitter: "",
            instagram: "",
            youtube: "",
            titre: "",
            description: "",
            copyright: "",
        },
    ) {
        this.id = id;
        this.attributes = attributes;
    }
}
