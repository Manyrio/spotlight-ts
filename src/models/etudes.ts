

import { Color } from "./colors";
import { ApiRetrieveResponse, ObjectInterface } from "./other";

export class EtudeOuvertures {
    constructor(
        public lundi: EtudeHoraires = { start: "", end: "" },
        public mardi: EtudeHoraires = { start: "", end: "" },
        public mercredi: EtudeHoraires = { start: "", end: "" },
        public jeudi: EtudeHoraires = { start: "", end: "" },
        public vendredi: EtudeHoraires = { start: "", end: "" }
    ) {
        this.lundi = lundi;
        this.mardi = mardi;
        this.mercredi = mercredi;
        this.jeudi = jeudi;
        this.vendredi = vendredi;
    }
}

export interface EtudeHoraires {
    start: string;
    end: string;
}
export class Etude implements ObjectInterface {
    constructor(
        public id: string = "",
        public attributes = {
            name: "",
            colors: new ApiRetrieveResponse<Color>(),
            description: "",
            email: "",
            schedules: "",
            phone: "",
            address: "",
            slug: "",
            ouvertures: new EtudeOuvertures(),
        },
    ) {
        this.id = id;
        this.attributes = attributes;
    }
}



