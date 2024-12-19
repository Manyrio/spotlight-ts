

import { Color } from "./colors";
import { ApiListResponse, ApiRetrieveResponse, ObjectInterface, SeoObject } from "./other";
import { DocumentFile } from "./documents";
import { Image } from "./image";
import { WebFont } from "./fonts";

export class EtudeOuvertures {

    [key: string]: EtudeHoraires[];

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

export enum ButtonStyle {
    Solid = "solid",
    Outline = "outline",
    Plain = "plain",

}

export interface EtudeButton {
    href: string;
    name: string,
    style: ButtonStyle
}

export class SectionsTexte {
    constructor(
        public id: string = "",
        public attributes = {
            title: "",
            content: "",

            medias: new ApiListResponse<Image>,
            button: {
                href: "",
                name: "",
                style: ButtonStyle.Solid
            },
        }
    ) {
        this.id = id;
        this.attributes = attributes;
    }
}




export enum EtudePosition {
    left = "left",
    right = "right",
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
            font: new ApiRetrieveResponse<WebFont>(),
            titleFont: new ApiRetrieveResponse<WebFont>(),
            pricing: new ApiRetrieveResponse<DocumentFile>(),
            image: new ApiRetrieveResponse<Image>(),
            carousel: new ApiListResponse<Image>(),
            description: "",
            addressDescription: "",
            email: "",
            position: EtudePosition.left,
            phone: "",
            address: "",
            slug: "",
            ouvertures: new EtudeOuvertures(),
            mapUrl: "",
            seo: new SeoObject(),
            sections_textes_accueil: new ApiListResponse<SectionsTexte>(),
            sections_textes_office: new ApiListResponse<SectionsTexte>(),
        },
    ) {
        this.id = id;
        this.attributes = attributes;
    }
}



