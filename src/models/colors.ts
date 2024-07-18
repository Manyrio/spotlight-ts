import { ObjectInterface } from "./other";

export class Color implements ObjectInterface {
    constructor(
        public id: string = "",
        public attributes = {
            name: "",
            hint: "#888888",
            background: "#ffffff",
            border: "#888888",
            tintedBackground: "#EEEEEE",
            divider: "#888888",
            primary: "#181818",
            secondary: "#888888",
            accent: "#181818",
            indicator: "#888888",
        }
    ) {
        this.id = id;
        this.attributes = attributes;
    }
}

