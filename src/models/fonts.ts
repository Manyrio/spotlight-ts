import { ObjectInterface } from "./other";

export class WebFont implements ObjectInterface {
    constructor(
        public id: string = "",
        public attributes = {
            name: "",
            fontUrl: "",
        },
    ) {
        this.id = id;
        this.attributes = attributes;
    }
}

