import { ObjectInterface } from "./other";

export enum ReservationStatus {
  Confirmed = "confirmed",
  Draft = "draft",
}

export class Reservation {
  constructor(
    public id: string = "",
    public date: Date = new Date(),
    public clientFirstName: string = "",
    public clientLastName: string = "",
    public message: string = "",
    public clientEmail: string = "",
    public clientPhone: number = 0,
    public status: ReservationStatus = ReservationStatus.Draft
  ) {
    this.id = id;
    this.date = date;
    this.clientFirstName = clientFirstName;
    this.clientLastName = clientLastName;
    this.message = message;
    this.clientEmail = clientEmail;
    this.clientPhone = clientPhone;
    this.status = status;
  }

  public get name(): string {
    return `${this.clientFirstName} ${this.clientLastName}`;
  }
}
