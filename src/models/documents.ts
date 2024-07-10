import { Image } from "./image";
import { ApiRetrieveResponse, ObjectInterface } from "./other";

export class DocumentFile implements ObjectInterface {
    constructor(
        public id: string = "",
        public attributes = {
            description: "",
            name: "",
            file: new ApiRetrieveResponse<Image>(),
        },
    ) {
        this.id = id;
        this.attributes = attributes;
    }
}
