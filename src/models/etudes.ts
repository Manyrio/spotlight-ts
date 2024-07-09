

import { Color } from "./colors";
import { ApiRetrieveResponse, ObjectInterface } from "./other";

export class Etude implements ObjectInterface {
    constructor(
        public id: string = "",
        public attributes = {
            name: "",
            colors: new ApiRetrieveResponse<Color>(),
            description: "",
            email: "",
            schedules: "",
            phone: "",
            address: "",
            slug: ""
        },
    ) {
        this.id = id;
        this.attributes = attributes;
    }
}



