
export interface PlaceInterface {
    address: string;
    email: string;
    phone: string;
    schedules: string;
    scope: string;
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
            scope: "",
            infos: "",
            title: "",
            description: "",
        }
    ) {
        this.attributes = attributes;
    }
}