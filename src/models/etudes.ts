

import { Color } from "./colors";
import { ApiRetrieveResponse, ObjectInterface } from "./other";

export class EtudeOuvertures {
    constructor(
        public lundi: EtudeHoraires[] = [],
        public mardi: EtudeHoraires[] = [],
        public mercredi: EtudeHoraires[] = [],
        public jeudi: EtudeHoraires[] = [],
        public vendredi: EtudeHoraires[] = []
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



