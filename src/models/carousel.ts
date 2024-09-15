

import { Etude } from "./etudes";
import { Image } from "./image";
import { ApiListResponse, ObjectInterface } from "./other";

export class CarouselComponent implements ObjectInterface {
    constructor(
        public id: string = "",
        public attributes = {
            images: new ApiListResponse<Image>(),
        },
    ) {
        this.id = id;
        this.attributes = attributes;
    }
}



