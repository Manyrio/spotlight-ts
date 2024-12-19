

import { Etude } from "./etudes";
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
            etudes: new ApiListResponse<Etude>()
        },
    ) {
        this.id = id;
        this.attributes = attributes;
    }
}



