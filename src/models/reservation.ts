import { ObjectInterface } from "./other";

export class Reservation {
  constructor(
    public id: string = "",
    public date: Date = new Date(),
    public clientFirstName: string = "",
    public clientLastName: string = "",
    public message: string = "",
    public clientEmail: string = "",
    public clientPhone: number = 0,
  ) {
    this.id = id;
    this.date = date;
    this.clientFirstName = clientFirstName;
    this.clientLastName = clientLastName;
    this.message = message;
    this.clientEmail = clientEmail;
    this.clientPhone = clientPhone;
  }

  public get name(): string {
    return `${this.clientFirstName} ${this.clientLastName}`;
  }
}
