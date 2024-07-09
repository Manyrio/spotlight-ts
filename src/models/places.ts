import { Scope } from "./etudes";

export interface PlaceInterface {
    address: string;
    email: string;
    phone: string;
    schedules: string;
    scope: Scope;
    infos: string;
    title: string;
    description: string;
}


export class Place {
    constructor(
        public attributes: PlaceInterface = {
            address: "",
            email: "",
            phone: "",
            schedules: "",
            scope: Scope.Caulnes,
            infos: "",
            title: "",
            description: "",
        }
    ) {
        this.attributes = attributes;
    }
}