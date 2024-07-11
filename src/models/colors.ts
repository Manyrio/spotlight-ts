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
            secondary: "",
            accent: "",
            indicator: "",
        },
    ) {
        this.id = id;
        this.attributes = attributes;
    }
}

