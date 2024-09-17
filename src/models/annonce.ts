// Enum pour le type de transaction
export enum TypeTransaction {
  VenteTraditionnelle = "vente_traditionnelle",
  VenteImmoInteractif = "vente_immo_interactif",
  VenteViager = "vente_viager",
  Location = "location"
}

// Classe de base pour les transactions communes
export class AnnonceBase {
  uuid: string;
  reference: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
  diffused: boolean;
  office: Office;
  contact: Contact;
  bien: Bien;
  transaction: TypeTransaction;  // Utilisation de l'énumération pour le type de transaction

  constructor(
    uuid: string,
    reference: string,
    description: string,
    createdAt: string,
    updatedAt: string,
    diffused: boolean,
    office: Office,
    contact: Contact,
    bien: Bien,
    transaction: TypeTransaction
  ) {
    this.uuid = uuid;
    this.reference = reference;
    this.description = description;
    this.createdAt = new Date(createdAt);
    this.updatedAt = new Date(updatedAt);
    this.diffused = diffused;
    this.office = office;
    this.contact = contact;
    this.bien = bien;
    this.transaction = transaction;
  }
}

// Classe pour "vente_viager"
export class VenteViager extends AnnonceBase {
  prix: number | null;
  typeHonoraires: string;
  honoraires: number;
  honorairesPourcentage: number;
  chargesCopropriete: number;
  bouquet: number;
  bouquetHni: number;
  bouquetNv: number;
  rente: Rente;
  fraisActe: number;

  constructor(
    uuid: string,
    reference: string,
    description: string,
    createdAt: string,
    updatedAt: string,
    diffused: boolean,
    office: Office,
    contact: Contact,
    bien: Bien,
    transaction: TypeTransaction,
    prix: number | null,
    typeHonoraires: string,
    honoraires: number,
    honorairesPourcentage: number,
    chargesCopropriete: number,
    bouquet: number,
    bouquetHni: number,
    bouquetNv: number,
    rente: Rente,
    fraisActe: number
  ) {
    super(uuid, reference, description, createdAt, updatedAt, diffused, office, contact, bien, transaction);
    this.prix = prix;
    this.typeHonoraires = typeHonoraires;
    this.honoraires = honoraires;
    this.honorairesPourcentage = honorairesPourcentage;
    this.chargesCopropriete = chargesCopropriete;
    this.bouquet = bouquet;
    this.bouquetHni = bouquetHni;
    this.bouquetNv = bouquetNv;
    this.rente = rente;
    this.fraisActe = fraisActe;
  }
}

// Classe pour "location"
export class Location extends AnnonceBase {
  loyer: number;
  loyerPeriodicite: string;
  chargesIncluses: boolean;
  montantCharges: number;
  montantEtatLieux: number;
  meuble: boolean;
  montantDepotGarantie: number;

  constructor(
    uuid: string,
    reference: string,
    description: string,
    createdAt: string,
    updatedAt: string,
    diffused: boolean,
    office: Office,
    contact: Contact,
    bien: Bien,
    transaction: TypeTransaction,
    loyer: number,
    loyerPeriodicite: string,
    chargesIncluses: boolean,
    montantCharges: number,
    montantEtatLieux: number,
    meuble: boolean,
    montantDepotGarantie: number
  ) {
    super(uuid, reference, description, createdAt, updatedAt, diffused, office, contact, bien, transaction);
    this.loyer = loyer;
    this.loyerPeriodicite = loyerPeriodicite;
    this.chargesIncluses = chargesIncluses;
    this.montantCharges = montantCharges;
    this.montantEtatLieux = montantEtatLieux;
    this.meuble = meuble;
    this.montantDepotGarantie = montantDepotGarantie;
  }
}

// Classe pour "vente_traditionnelle"
export class VenteTraditionnelle extends AnnonceBase {
  prix: number;
  prixHni: number;
  prixNv: number;
  typeHonoraires: string;
  honoraires: number;
  honorairesPourcentage: number;
  chargesCopropriete: number;
  fraisActe?: number;  // Optionnel si non présent dans l'objet

  constructor(
    uuid: string,
    reference: string,
    description: string,
    createdAt: string,
    updatedAt: string,
    diffused: boolean,
    office: Office,
    contact: Contact,
    bien: Bien,
    transaction: TypeTransaction,
    prix: number,
    prixHni: number,
    prixNv: number,
    typeHonoraires: string,
    honoraires: number,
    honorairesPourcentage: number,
    chargesCopropriete: number,
    fraisActe?: number
  ) {
    super(uuid, reference, description, createdAt, updatedAt, diffused, office, contact, bien, transaction);
    this.prix = prix;
    this.prixHni = prixHni;
    this.prixNv = prixNv;
    this.typeHonoraires = typeHonoraires;
    this.honoraires = honoraires;
    this.honorairesPourcentage = honorairesPourcentage;
    this.chargesCopropriete = chargesCopropriete;
    this.fraisActe = fraisActe;
  }
}

// Sous-classes pour les objets imbriqués

// Classe pour l'office notarial
export class Office {
  uuid: string;
  crpcen: string;
  raisonSociale: string;

  constructor(uuid: string, crpcen: string, raisonSociale: string) {
    this.uuid = uuid;
    this.crpcen = crpcen;
    this.raisonSociale = raisonSociale;
  }
}

// Classe pour le contact
export class Contact {
  nom: string;

  constructor(nom: string) {
    this.nom = nom;
  }
}

// Classe pour les informations du bien
export class Bien {
  commune: Commune;
  nature: string;
  photos: { href: string }[];
  surface: number;

  constructor(commune: Commune, nature: string, photos: { href: string }[], surface: number) {
    this.commune = commune;
    this.nature = nature;
    this.photos = photos;
    this.surface = surface;
  }
}

// Classe pour la commune du bien
export class Commune {
  codeInsee: string;
  codePostal: string;
  libelle: string;

  constructor(codeInsee: string, codePostal: string, libelle: string) {
    this.codeInsee = codeInsee;
    this.codePostal = codePostal;
    this.libelle = libelle;
  }
}

// Classe pour les informations de la rente (dans le cas du viager)
export class Rente {
  montant: number;
  periodicite: string;

  constructor(montant: number, periodicite: string) {
    this.montant = montant;
    this.periodicite = periodicite;
  }
}