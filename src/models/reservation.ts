import { ObjectInterface } from "./other";

export class Reservation implements ObjectInterface {
  constructor(
    public id: string = "",
    public attributes = {
      date: new Date(),
      clientFirstName: "",
      clientLastName: "",
      message: "",
      clientEmail: "",
      clientPhone: 0,
      status: ""
    }
  ) {
    this.id = id;
    this.attributes = attributes;
  }
}
