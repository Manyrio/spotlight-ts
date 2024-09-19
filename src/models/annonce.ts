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

// Interface for the common fields
export interface AnnonceBase {
  uuid: string;
  reference: string;
  description: string;
  created_at: Date;
  updated_at: Date;
  diffused: boolean;
  office: Office;
  contact: Contact;
  bien: Bien;
  transaction: TypeTransaction;  // Discriminant field
}

// Specific types based on transaction type
export interface VenteTraditionnelle extends AnnonceBase {
  transaction: TypeTransaction.vente_traditionnelle;
  prix: number;
  prix_hni: number;
  prix_nv: number;
  type_honoraires: string;
  honoraires: number;
  honoraires_pourcentage: number;
  charges_copropriete: number;
  frais_acte?: number;
}

export interface VenteImmoInteractif extends AnnonceBase {
  transaction: TypeTransaction.vente_immo_interactif;
  prix: number;
  prix_hni: number;
  prix_nv: number;
  type_honoraires: string;
  honoraires: number;
  honoraires_pourcentage: number;
  charges_copropriete: number;
}

export interface VenteViager extends AnnonceBase {
  transaction: TypeTransaction.vente_viager;
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

export interface Location extends AnnonceBase {
  transaction: TypeTransaction.location;
  loyer: number;
  loyer_periodicite: string;
  charges_incluses: boolean;
  montant_charges: number;
  montant_etat_lieux: number;
  meuble: boolean;
  montant_depot_garantie: number;
}

// Union of all possible types of Annonce
export type Annonce = VenteTraditionnelle | VenteImmoInteractif | VenteViager | Location;

export function getAnnonceSurface(annonce: Annonce) {
  return `${annonce.bien.nature == BienNature.Appartement ? annonce.bien.surface_plancher :
    annonce.bien.nature == BienNature.Maison ? annonce.bien.surface_habitable :
      annonce.bien.nature == BienNature.Terrain ? annonce.bien.surface :
        annonce.bien.nature == BienNature.Immeuble ? annonce.bien.surface_plancher :
          annonce.bien.nature == BienNature.Garage ? annonce.bien.surface :
            annonce.bien.nature == BienNature.Autre ? annonce.bien.surface : ""
    } m²`
}

export function getAnnonceType(annonce: Annonce) {
  return `${annonce.transaction == TypeTransaction.location ? "Location"
    : annonce.transaction == TypeTransaction.vente_traditionnelle ? "Vente Traditionnelle"
      : annonce.transaction == TypeTransaction.vente_viager ? "Vente Viager"
        : annonce.transaction == TypeTransaction.vente_immo_interactif ? "Vente Immo Interactif"
          : ""}`
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
}

export enum BienNature {
  Appartement = "appartement",
  Maison = "maison",
  Immeuble = "immeuble",
  Garage = "garage",
  Terrain = "terrain",
  Autre = "autre"
}


export type Bien = {
  commune: Commune;
  photos: { href: string }[];
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
  periodicite: string;
}
