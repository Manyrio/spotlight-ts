import { Image } from "./image";
import { ApiRetrieveResponse, ObjectInterface } from "./other";

export class Label implements ObjectInterface {
  constructor(
    public id: string = "",
    public attributes = {
      name: "",
      image: new ApiRetrieveResponse<Image>(),
      description: ""
    },
  ) {
    this.id = id;
    this.attributes = attributes;
  }
}
