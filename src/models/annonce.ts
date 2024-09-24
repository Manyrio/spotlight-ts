import { Image } from "./image";
import { ApiListResponse } from "./other";

// Enum for transaction types
export enum TypeTransaction {
  vente_traditionnelle = "vente_traditionnelle",
  vente_immo_interactif = "vente_immo_interactif",
  vente_viager = "vente_viager",
  location = "location"
}

export enum TypeHonoraires {
  "charge_vendeur" = "charge_vendeur",
  "charge_acquereur" = "charge_acquereur"
}

export type AnnonceObject = {
  id: string,
  attributes: {
    object: Annonce,
    photos: ApiListResponse<Image>,
    natureBien: BienNature,
    nombrePieces: number,
    transaction: TypeTransaction,
    tierCreatedAt: Date,
    prix: number,
    uuid: string,
    surface: number,
  }
}

export type Annonce = {
  uuid: string;
  reference: string;
  description: string;
  created_at: Date;
  updated_at: Date;
  diffused: boolean;
  office: Office;
  contact: Contact;
  bien: Bien;
} & (
    | {
      transaction: TypeTransaction.location,
      loyer: number;
      loyer_periodicite: AnnoncePeriodicite;
      charges_incluses: boolean;
      montant_charges: number;
      montant_etat_lieux: number;
      meuble: boolean;
      montant_depot_garantie: number;
    } | {
      transaction: TypeTransaction.vente_immo_interactif,
      prix: number;
      prix_hni: number;
      prix_nv: number;
      type_honoraires: string;
      honoraires: number;
      honoraires_pourcentage: number;
      charges_copropriete: number;
    } | {
      transaction: TypeTransaction.vente_traditionnelle,
      prix: number;
      prix_hni: number;
      prix_nv: number;
      type_honoraires: string;
      honoraires: number;
      honoraires_pourcentage: number;
      charges_copropriete: number;
      frais_acte?: number;
    } | {
      transaction: TypeTransaction.vente_viager,
      prix: number | null;
      type_honoraires: string;
      honoraires: number;
      honoraires_pourcentage: number;
      charges_copropriete: number;
      bouquet: number;
      bouquet_hni: number;
      bouquet_nv: number;
      rente: Rente;
      frais_acte: number;
    }
  );


export function getAnnoncePeriodicite(periodicite: AnnoncePeriodicite) {
  let periodiciteText = "";

  switch (periodicite) {
    case AnnoncePeriodicite.Annuelle:
      periodiciteText = "an";
      break;
    case AnnoncePeriodicite.Semestrielle:
      periodiciteText = "semestre";
      break;
    case AnnoncePeriodicite.Trimestrielle:
      periodiciteText = "trimestre";
      break;
    case AnnoncePeriodicite.Mensuelle:
      periodiciteText = "mois";
      break;
    case AnnoncePeriodicite.Bimensuelle:
      periodiciteText = "quinzaine";
      break;
  }

  return periodiciteText
}


export function getAnnonceEtat(annonce: Annonce) {
  return `${annonce.bien.etat == BienEtat.A_Rafraichir ? "À rafraichir" :
    annonce.bien.etat == BienEtat.A_Renover ? "À rénover" :
      annonce.bien.etat == BienEtat.Bon ? "Bon état" :
        annonce.bien.etat == BienEtat.Neuf ? "Neuf" : ""}`
}


export function getAnnonceSurface(annonce: Annonce) {
  return annonce.bien.nature == BienNature.Appartement ? annonce.bien.surface_plancher || annonce.bien.surface_habitable :
    annonce.bien.nature == BienNature.Maison ? annonce.bien.surface_habitable :
      annonce.bien.nature == BienNature.Terrain ? annonce.bien.surface :
        annonce.bien.nature == BienNature.Immeuble ? annonce.bien.surface_plancher :
          annonce.bien.nature == BienNature.Garage ? annonce.bien.surface :
            annonce.bien.nature == BienNature.Autre ? annonce.bien.surface : 0
}

export function getAnnonceType(annonce: Annonce) {
  return translateAnnonceType(annonce.transaction)
}

export function translateAnnonceType(type: TypeTransaction) {
  return `${type == TypeTransaction.location ? "Location"
    : type == TypeTransaction.vente_traditionnelle ? "Vente"
      : type == TypeTransaction.vente_viager ? "Viager"
        : type == TypeTransaction.vente_immo_interactif ? "Vente enchères"
          : ""
    } `
}

export function currency(number: Number) {
  return number.toLocaleString("fr-FR", { style: "currency", currency: "EUR" })
}

// Definitions for other types used
export interface Office {
  uuid: string;
  crpcen: string;
  raison_sociale: string;
}

export interface Contact {
  nom: string;
  telephone: string;
  email: string;
}

export enum BienNature {
  Appartement = "appartement",
  Maison = "maison",
  Immeuble = "immeuble",
  Garage = "garage",
  Terrain = "terrain",
  Autre = "autre"
}
export enum Classes {
  A = "A",
  B = "B",
  C = "C",
  D = "D",
  E = "E",
  F = "F",
  G = "G"
}

interface EstimationCouts {
  cout_min: number;
  cout_max: number;
  annee_reference: string;
}
export enum BienEtat {
  Neuf = "neuf",
  Bon = "bon",
  A_Rafraichir = "a_rafraichir",
  A_Renover = "a_renover"
}
export interface Photo {
  href: string;
  uuid: string;
  rank: number;

}

export type Bien = {
  commune: Commune;
  photos: Photo[];
  etat?: BienEtat | null;
  performance_energetique: {
    date_diagnostic: string;  // "2021-07-06 00:00:00" (ISO date string)
    dpe_value: number;
    dpe_classe: Classes;
    ges_value: number;
    ges_classe: Classes;
    estimation_couts: EstimationCouts;
  },
  nb_pieces?: number | null; // >= 1
  nb_chambres?: number | null; // >= 0
  nb_sdb?: number | null; // >= 0
  nb_salles_eau?: number | null; // >= 0
  nb_niveaux?: number | null; // >= 1
  balcon?: boolean | null;
  terrasse?: boolean | null;
  cave?: boolean | null;
  cuisine?: boolean | null;
  piscine?: boolean | null;
  surface_habitable: number; // required
  surface_carrez?: number | null;
  ascenseur?: boolean | null;

} & (
    | { nature: BienNature.Appartement; surface_plancher: number }
    | { nature: BienNature.Maison; surface_habitable: number }
    | { nature: BienNature.Immeuble; surface_plancher: number }
    | { nature: BienNature.Garage; surface: number }
    | { nature: BienNature.Terrain; surface: number }
    | { nature: BienNature.Autre; surface: number }
  );




export interface Commune {
  code_insee: string;
  code_postal: string;
  libelle: string;
}

export interface Rente {
  montant: number;
  periodicite: AnnoncePeriodicite;
}

export enum AnnoncePeriodicite {
  Annuelle = "annuelle",
  Semestrielle = "semestrielle",
  Trimestrielle = "trimestrielle",
  Mensuelle = "mensuelle",
  Bimensuelle = "bimensuelle"
}