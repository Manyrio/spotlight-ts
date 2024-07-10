import { Image } from "./image";
import { ApiRetrieveResponse, ObjectInterface } from "./other";

export class Article implements ObjectInterface {
  constructor(
    public id: string = "",
    public attributes = {
      title: "",
      type: "",
      description: "",
      content: "",
      image: new ApiRetrieveResponse<Image>(),
      createdAt: "",
      slug: ""
    },
  ) {
    this.id = id;
    this.attributes = attributes;
  }
}
