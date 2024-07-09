import glob from 'fast-glob'
import test from 'node:test'
import { Localisation } from './localisation'

export enum TypeTransaction {
  Vente = 'Vente',
  Location = 'Location',
  Encheres = 'Encheres',
  // indefini = 'indefini',
}

export enum TypePropriete {
  Appartement = 'Appartement',
  Maison = 'Maison',
  Terrain = 'Terrain',
  BatimentAgricole = 'Bâtiment Agricole',
  LocauxCommerciaux = 'Locaux Commerciaux',
  Commerce = 'Commerce',
  Garage = 'Garage',
  Divers = 'Divers'
  // indefini = 'indefini',
}

export enum ClasseEnergie {
  A = 'A',
  B = 'B',
  C = 'C',
  D = 'D',
  E = 'E',
  F = 'F',
  G = 'G',
  // indefini = 'indefini',
}

export enum ClasseGaz {
  A = 'A',
  B = 'B',
  C = 'C',
  D = 'D',
  E = 'E',
  F = 'F',
  G = 'G',
  // indefini = 'indefini',
}

export enum TypeChauffage {
  Gaz = 'Gaz',
  Electrique = 'Electrique',
  Fioul = 'Fioul',
  Bois = 'Bois',
  // indefini = 'indefini',
}

export enum EtatPropriete {
  Neuf = 'Neuf',
  Ancien = 'Ancien',
  // indefini = 'indefini',
}

export enum OrientationPropriete {
  Nord = 'Nord',
  Sud = 'Sud',
  Est = 'Est',
  Ouest = 'Ouest',
  // indefini = 'indefini',
}


/// Définition des interfaces pour les finances
interface Finances {
  prixTotal: number;
  pourcentageFraisAgence: number;

  calculerFraisAgence(): number;
}

export class FinancesImmobilieres implements Finances {
  prixTotal: number;
  pourcentageFraisAgence: number;

  constructor(prixTotal: number, pourcentageFraisAgence: number) {
    this.prixTotal = prixTotal;
    this.pourcentageFraisAgence = pourcentageFraisAgence;
  }

  calculerFraisAgence(): number {
    return this.prixTotal * (this.pourcentageFraisAgence / 100);
  }
}


/// Définition des interfaces pour les propriétés
interface ProprieteBase {
  type: TypePropriete;
  surface: number;
  classeEnergie: ClasseEnergie;
  classeGaz: ClasseGaz;
  typeChauffage: TypeChauffage;
  etatPropriete: EtatPropriete;
  orientationPropriete: OrientationPropriete;
}

export interface Appartement extends ProprieteBase {
  type: TypePropriete.Appartement;
  surfaceHabitable: number;
  pieces: number;
  chambres: number;
  sallesDeBain: number;
}

export interface Maison extends ProprieteBase {
  type: TypePropriete.Maison;
  surfaceHabitable: number;
  pieces: number;
  chambres: number;
  sallesDeBain: number;
}

export interface Terrain extends ProprieteBase {
  type: TypePropriete.Terrain;
}

export type Propriete = Appartement | Maison | Terrain;


/// Définition des interfaces pour la localisation
export class Annonce {
  id: string;                 // Identifiant de l'annonce
  type: TypeTransaction;      // Type de transaction (Vente ou Location)
  finances: FinancesImmobilieres;    // Finances
  prixTotal: number;            // Prix total (frais d'agence inclus)
  pourcentageFraisAgence: number;  // Pourcentage des frais d'agence
  localisation: Localisation;   // Lieu de l'annonce
  propriete: Propriete;         // Details du bien
  details: string;              // Description du bien
  lienPlusInfo: string;         // Lien pour plus d'informations
  derniereMiseAJour: Date;      // Date de la derniere mise a jour
  images: string[];             // Liste des images

  constructor(
    id: string,
    type: TypeTransaction,
    finances: FinancesImmobilieres,
    prixTotal: number ,
    pourcentageFraisAgence: number ,
    localisation: Localisation,
    propriete: Propriete,
    details: string,
    lienPlusInfo: string,
    derniereMiseAJour: Date = new Date(),
    images: string[] = []
  ) {
    this.id = id;
    this.type = type;
    this.finances = finances;
    this.prixTotal = prixTotal;
    this.pourcentageFraisAgence = pourcentageFraisAgence;
    this.localisation = localisation;
    this.propriete = propriete;
    this.details = details;
    this.lienPlusInfo = lienPlusInfo;
    this.derniereMiseAJour = derniereMiseAJour;
    this.images = images;
  }
  
}