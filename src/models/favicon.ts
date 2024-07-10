import { Image } from "./image";
import { ApiListResponse, ApiRetrieveResponse, ObjectInterface } from "./other";

export class Favicon implements ObjectInterface {
    constructor(
        public id: string = "",
        public attributes = {
            "icon": new ApiRetrieveResponse<Image>(),
            "name": ""
        },
    ) {
        this.id = id;
        this.attributes = attributes;
    }
}



