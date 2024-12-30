import { Image } from "./image";
import { ApiRetrieveResponse, ObjectInterface } from "./other";

export class Logo implements ObjectInterface {
    constructor(
        public id: string = "",
        public attributes = {
            "logo": new ApiRetrieveResponse<Image>(),
        },
    ) {
        this.id = id;
        this.attributes = attributes;
    }
}



