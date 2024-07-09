

import { Image } from "./image";
import { ApiListResponse, ApiRetrieveResponse, ObjectInterface } from "./other";

export class Member implements ObjectInterface {
    constructor(
        public id: string = "",
        public attributes = {
            name: "",
            role: "",
            certifications: "",
            email: "",
            phone: "",
            image: new ApiListResponse<Image>(),
            languages: "",
        },
    ) {
        this.id = id;
        this.attributes = attributes;
    }
}



