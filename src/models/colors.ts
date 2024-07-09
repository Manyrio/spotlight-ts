import { ObjectInterface } from "./other";

export class Color implements ObjectInterface {
    constructor(
        public id: string = "",
        public attributes = {
            name: "",
            hint: "",
            background: "",
            border: "",
            tintedBackground: "",
            divider: "",
            primary: "",
            accent: "",
            indicator: "",
        },
    ) {
        this.id = id;
        this.attributes = attributes;
    }
}

