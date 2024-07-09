export interface Localisation {
    latitude: number;
    longitude: number;
    addresse: Addresse;
}

export interface Addresse {
    rue: string;
    codePostal: string;
    ville: string;
    pays: string;
}

export function formatLocalisation(localisation: Localisation) {
    return `${localisation.addresse.rue}, ${localisation.addresse.codePostal} ${localisation.addresse.ville}, ${localisation.addresse.pays}`;
}