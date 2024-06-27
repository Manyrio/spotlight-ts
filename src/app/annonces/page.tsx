'use client';

import { type Metadata } from 'next'

import { Component, useState } from 'react'
import { Card } from '@/components/Card'
import { SimpleLayout, SimpleLayoutWithTitleFooter } from '@/components/SimpleLayout'
import { type ArticleWithSlug, getAllArticles } from '@/lib/articles'
import { Annonce, TypeTransaction, FinancesImmobilieres, TypePropriete, ClasseEnergie, ClasseGaz, TypeChauffage, EtatPropriete, OrientationPropriete } from '@/lib/annonce'
import { formatDate } from '@/lib/formatDate'
import { formatLocalisation } from '@/lib/localisation'
import { Menu, MenuButton, MenuItem, MenuItems, Popover, PopoverButton, PopoverGroup, PopoverPanel, Transition } from '@headlessui/react'
import { ChevronDownIcon, ChevronRightIcon } from '@heroicons/react/20/solid'

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

function DropDown({ title, enumObject, selected, setSelected }: { title: string, enumObject: any, selected: string, setSelected: (value: string) => void }) {
  return (

    <Menu as="div" className="relative inline-block text-left">
      <div>
        <MenuButton className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
        {title}
          <ChevronDownIcon
            className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
            aria-hidden="true"
          />
        </MenuButton>
      </div>

      <Transition
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <MenuItems className="absolute left-0 z-30 mt-2 w-40 origin-top-left rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            {
              Object.keys(enumObject).map((key) => (
                <MenuItem key={key}>
                  {({ active }) => (
                    <a
                      href="#"
                      className={classNames(
                        active ? 'bg-gray-100' : '',
                        'block px-4 py-2 text-sm font-medium text-gray-900',
                      )}
                    >
                      {key}
                    </a>
                  )}
                </MenuItem>
              ))
            }

          </div>
        </MenuItems>
      </Transition>
    </Menu>)
}

function ElementAnnonce({ annonce }: { annonce: Annonce }) {

  return (
    <article className="md:grid w-full md:grid-cols-3 md:items-center gap-8">
      <Card className="md:col-span-1">
      <span className="relative z-20 mb-[12px] inline-flex items-center rounded-full bg-gray-50 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10">
        {annonce.type}
      </span>
      <p />
        <Card.Title 
        href={`/annonces/${annonce.id} `}
        >
          Titre test
        </Card.Title>
        <p className="relative z-20 font-semibold md:block text-lg text-zinc-600 dark:text-zinc-400">
        {annonce.finances.prixTotal.toLocaleString("fr-FR", { style: "currency", currency: "EUR" })}
        </p>
        <p className="relative z-20 md:block text-sm text-zinc-600 dark:text-zinc-400">
          Frais d'agence: {annonce.finances.calculerFraisAgence().toLocaleString("fr-FR", { style: "currency", currency: "EUR" })} ({annonce.finances.pourcentageFraisAgence}%)
        </p>
        <Card.Eyebrow
          as="p"
          className="md:hidden"
          decorate
        >
        <img
          src="https://media.immobilier.notaires.fr/inotr/media/29/22044/1600131/34199f92_VGA.jpg"
          alt=""
          // make image rounded and full wi
          className="rounded-lg w-full shrink-0"
          /> 
        </Card.Eyebrow>
        <br/>
        <Card.Description>{annonce.details}</Card.Description>
        <br/>
      
        <p className="relative z-20 font-semibold md:block text-lg text-zinc-600 dark:text-zinc-400">{annonce.localisation.addresse.ville}</p>
        <Card.Cta>En savoir plus</Card.Cta>
      </Card>
      <Card.Eyebrow
        as="p"
        className="mt-1 hidden md:block md:col-span-2"
      >
          <article
                key={annonce.id}
                className="relative isolate flex flex-col justify-end overflow-hidden rounded-2xl bg-gray-900 px-8 pb-8 pt-80 sm:pt-48 lg:pt-80"
              >
                <img src={annonce.images[0]} alt="" className="absolute inset-0 -z-10 h-full w-full object-cover" />
              </article>
      </Card.Eyebrow>
    </article>
  )
}

function Contact() {
  return (
        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 text-base leading-7 sm:grid-cols-2 sm:gap-y-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          <div>
            <h3 className="border-l border-indigo-600 pl-6 font-semibold text-gray-900">SERVICE DE NÉGOCIATION</h3>
            <address className="border-l border-gray-200 pl-6 pt-2 not-italic text-gray-600">
              <p>14, rue de Dinan</p>
              <p>22350 CAULNES</p>
            </address>
          </div>
          <div>
            <h3 className="border-l border-indigo-600 pl-6 font-semibold text-gray-900">Marie-Sophie LEGASTELOIS</h3>
            <address className="border-l border-gray-200 pl-6 pt-2 not-italic text-gray-600">
              <p>+33 2 96 83 96 84</p>
              <p>nego@notaires-caulnes.fr</p>
            </address>
          </div>
          <div>
            <h3 className="border-l border-indigo-600 pl-6 font-semibold text-gray-900">Ouvert du lundi au vendredi</h3>
            <address className="border-l border-gray-200 pl-6 pt-2 not-italic text-gray-600">
              <p>9h00-12h30 et de 14h00-18h00</p>
              <div
                aria-hidden="true"
                className="relative z-10 mt-1 flex items-center text-sm font-medium text-teal-500"
              >
               En savoir plus 
                <ChevronRightIcon className="ml-1 h-4 w-4 stroke-current" />
              </div>
            </address>
          </div>
        </div>
  )
}

function FiltresAnnonces() {
  const [open, setOpen] = useState(false)

  return (
    <section aria-labelledby="filter-heading" className=" py-6">
          <h2 id="filter-heading" className="sr-only">
            Filtres
          </h2>

          <div className="flex items-center justify-between">
            {DropDown({ title: "Type de transaction", enumObject: TypeTransaction, selected: "Vente", setSelected: (value) => { console.log(value) } })}
            
            <div style={{ display: 'flex', flexDirection: 'row', gap: '24px' }}>
            {DropDown({ title: "Type de bien", enumObject: TypePropriete, selected: "Appartement", setSelected: (value) => { console.log(value) } })}
             </div>
          </div>
      <Contact />
        </section>
  )
}

export default function AnnoncesIndex() {
  let annonces: Annonce[] = [
    new Annonce('12345', // Identifiant de l'annonce
      TypeTransaction.Vente, // Type de transaction (Vente)
      new FinancesImmobilieres(250000, 5), // Finances avec prix total de 250000 et pourcentage des frais d'agence de 5%
      250000, // Prix total (frais d'agence inclus)
      0.05, // Pourcentage des frais d'agence
      {
        latitude: 48.8566,
        longitude: 2.3522,
        addresse: {
          rue: '1 rue de Paris',
          codePostal: '75001',
          ville: 'Caulnes',
          pays: 'France'
        }
      }, // Localisation
      {
        type: TypePropriete.Appartement, // Type de propriété (Appartement)
        surface: 75, // Surface totale en m²
        surfaceHabitable: 70, // Surface habitable en m²
        pieces: 3, // Nombre de pièces
        chambres: 2, // Nombre de chambres
        sallesDeBain: 1, // Nombre de salles de bain
        classeEnergie: ClasseEnergie.B, // Classe énergie (B)
        classeGaz: ClasseGaz.C, // Classe gaz (C)
        typeChauffage: TypeChauffage.Electrique, // Type de chauffage (Electrique)
        etatPropriete: EtatPropriete.Ancien, // Etat de la propriété (Ancien)
        orientationPropriete: OrientationPropriete.Sud // Orientation de la propriété (Sud)
      }, // Propriété
      `Maison / villa à vendre - BROONS (22250)

Une maison de 139m² comprenant :
- Au rez-de-chaussée : entrée, dégagement, cuisine aménagée et équipée, salle à manger - salon, bureau, chambre, salle d’eau, wc
- A l’étage : dégagement, trois chambres avec placards, deux greniers, lingerie, wc avec lave main.
- Au sous-sol : atelier, buanderie avec cheminée, cave, garage, water-closet.
Dépendances : garage, préau, chenil, serre
Jardin de 1988m²

Visites : Sur rendez-vous.

Immobilier.notaires® : Evaluer, acheter & vendre avec les notaires partout en France. 12 000 notaires, experts et négociateurs vous accompagnent dans vos projets immobiliers en toute confiance.`, // Description du bien
      'https://www.exemple.com/annonce/12345', // Lien pour plus d'informations
      new Date(), // Date de la dernière mise à jour
      [
        'https://media.immobilier.notaires.fr/inotr/media/29/22044/1604370/781b34f5_VGA.jpg'
      ] // Liste des images
    ),
    
    new Annonce('12345', // Identifiant de l'annonce
      TypeTransaction.Vente, // Type de transaction (Vente)
      new FinancesImmobilieres(250000, 5), // Finances avec prix total de 250000 et pourcentage des frais d'agence de 5%
      294390, // Prix total (frais d'agence inclus)
      0.051, // Pourcentage des frais d'agence
      {
        latitude: 48.8566,
        longitude: 2.3522,
        addresse: {
          rue: '1 rue de Paris',
          codePostal: '75001',
          ville: 'Caulnes',
          pays: 'France'
        }
      }, // Localisation
      {
        type: TypePropriete.Appartement, // Type de propriété (Appartement)
        surface: 75, // Surface totale en m²
        surfaceHabitable: 70, // Surface habitable en m²
        pieces: 3, // Nombre de pièces
        chambres: 2, // Nombre de chambres
        sallesDeBain: 1, // Nombre de salles de bain
        classeEnergie: ClasseEnergie.B, // Classe énergie (B)
        classeGaz: ClasseGaz.C, // Classe gaz (C)
        typeChauffage: TypeChauffage.Electrique, // Type de chauffage (Electrique)
        etatPropriete: EtatPropriete.Ancien, // Etat de la propriété (Ancien)
        orientationPropriete: OrientationPropriete.Sud // Orientation de la propriété (Sud)
      }, // Propriété
    `  Maison / villa à vendre - DINARD (35800)

A 1,6 km de la Plage du Prieuré, 2km de la zone commerciale Cap Emeraude
1,4 Km de l'école maternelle publique Jules Verne, et 1,5km de l'école maternelle privée, 650 m du Collège Le Bocage, 1,3km du Lycée Hôtelier Yvon Bourges
Maison 4 pièces de 69,15 m² composée de :
- Au RDC : garage, séjour -cuisine, dégagement, wc
- A l'étage mansardé : trois chambres, salle de bains, wc
Jardin de 381m²
Pas de vis à vis, au calme d'une impasse.

Visites : Sur rendez-vous.

Immobilier.notaires® : Evaluer, acheter & vendre avec les notaires partout en France. 12 000 notaires, experts et négociateurs vous accompagnent dans vos projets immobiliers en toute confiance.Maison / villa à vendre - DINARD (35800)

A 1,6 km de la Plage du Prieuré, 2km de la zone commerciale Cap Emeraude
1,4 Km de l'école maternelle publique Jules Verne, et 1,5km de l'école maternelle privée, 650 m du Collège Le Bocage, 1,3km du Lycée Hôtelier Yvon Bourges
Maison 4 pièces de 69,15 m² composée de :
- Au RDC : garage, séjour -cuisine, dégagement, wc
- A l'étage mansardé : trois chambres, salle de bains, wc
Jardin de 381m²
Pas de vis à vis, au calme d'une impasse.

Visites : Sur rendez-vous.

Immobilier.notaires® : Evaluer, acheter & vendre avec les notaires partout en France. 12 000 notaires, experts et négociateurs vous accompagnent dans vos projets immobiliers en toute confiance.`,
      'https://www.exemple.com/annonce/12345', // Lien pour plus d'informations
      new Date(), // Date de la dernière mise à jour
      [
        'https://media.immobilier.notaires.fr/inotr/media/29/22044/1620881/ad6c678a_VGA.jpg'
      ] // Liste des images
    ),
    new Annonce('12345', // Identifiant de l'annonce
      TypeTransaction.Vente, // Type de transaction (Vente)
      new FinancesImmobilieres(250000, 5), // Finances avec prix total de 250000 et pourcentage des frais d'agence de 5%
      250000, // Prix total (frais d'agence inclus)
      0.05, // Pourcentage des frais d'agence
      {
        latitude: 48.8566,
        longitude: 2.3522,
        addresse: {
          rue: '1 rue de Paris',
          codePostal: '75001',
          ville: 'Caulnes',
          pays: 'France'
        }
      }, // Localisation
      {
        type: TypePropriete.Appartement, // Type de propriété (Appartement)
        surface: 75, // Surface totale en m²
        surfaceHabitable: 70, // Surface habitable en m²
        pieces: 3, // Nombre de pièces
        chambres: 2, // Nombre de chambres
        sallesDeBain: 1, // Nombre de salles de bain
        classeEnergie: ClasseEnergie.B, // Classe énergie (B)
        classeGaz: ClasseGaz.C, // Classe gaz (C)
        typeChauffage: TypeChauffage.Electrique, // Type de chauffage (Electrique)
        etatPropriete: EtatPropriete.Ancien, // Etat de la propriété (Ancien)
        orientationPropriete: OrientationPropriete.Sud // Orientation de la propriété (Sud)
      }, // Propriété
      `Maison / villa à vendre - BROONS (22250)

Une maison de 139m² comprenant :
- Au rez-de-chaussée : entrée, dégagement, cuisine aménagée et équipée, salle à manger - salon, bureau, chambre, salle d’eau, wc
- A l’étage : dégagement, trois chambres avec placards, deux greniers, lingerie, wc avec lave main.
- Au sous-sol : atelier, buanderie avec cheminée, cave, garage, water-closet.
Dépendances : garage, préau, chenil, serre
Jardin de 1988m²

Visites : Sur rendez-vous.

Immobilier.notaires® : Evaluer, acheter & vendre avec les notaires partout en France. 12 000 notaires, experts et négociateurs vous accompagnent dans vos projets immobiliers en toute confiance.`, // Description du bien
      'https://www.exemple.com/annonce/12345', // Lien pour plus d'informations
      new Date(), // Date de la dernière mise à jour
      [
        'https://media.immobilier.notaires.fr/inotr/media/29/22044/1657276/f56bba0d_VGA.jpg'
      ] // Liste des images
    ),
    
    new Annonce('12345', // Identifiant de l'annonce
      TypeTransaction.Vente, // Type de transaction (Vente)
      new FinancesImmobilieres(250000, 5), // Finances avec prix total de 250000 et pourcentage des frais d'agence de 5%
      294390, // Prix total (frais d'agence inclus)
      0.051, // Pourcentage des frais d'agence
      {
        latitude: 48.8566,
        longitude: 2.3522,
        addresse: {
          rue: '1 rue de Paris',
          codePostal: '75001',
          ville: 'Caulnes',
          pays: 'France'
        }
      }, // Localisation
      {
        type: TypePropriete.Appartement, // Type de propriété (Appartement)
        surface: 75, // Surface totale en m²
        surfaceHabitable: 70, // Surface habitable en m²
        pieces: 3, // Nombre de pièces
        chambres: 2, // Nombre de chambres
        sallesDeBain: 1, // Nombre de salles de bain
        classeEnergie: ClasseEnergie.B, // Classe énergie (B)
        classeGaz: ClasseGaz.C, // Classe gaz (C)
        typeChauffage: TypeChauffage.Electrique, // Type de chauffage (Electrique)
        etatPropriete: EtatPropriete.Ancien, // Etat de la propriété (Ancien)
        orientationPropriete: OrientationPropriete.Sud // Orientation de la propriété (Sud)
      }, // Propriété
    `  Maison / villa à vendre - DINARD (35800)

A 1,6 km de la Plage du Prieuré, 2km de la zone commerciale Cap Emeraude
1,4 Km de l'école maternelle publique Jules Verne, et 1,5km de l'école maternelle privée, 650 m du Collège Le Bocage, 1,3km du Lycée Hôtelier Yvon Bourges
Maison 4 pièces de 69,15 m² composée de :
- Au RDC : garage, séjour -cuisine, dégagement, wc
- A l'étage mansardé : trois chambres, salle de bains, wc
Jardin de 381m²
Pas de vis à vis, au calme d'une impasse.

Visites : Sur rendez-vous.

Immobilier.notaires® : Evaluer, acheter & vendre avec les notaires partout en France. 12 000 notaires, experts et négociateurs vous accompagnent dans vos projets immobiliers en toute confiance.Maison / villa à vendre - DINARD (35800)

A 1,6 km de la Plage du Prieuré, 2km de la zone commerciale Cap Emeraude
1,4 Km de l'école maternelle publique Jules Verne, et 1,5km de l'école maternelle privée, 650 m du Collège Le Bocage, 1,3km du Lycée Hôtelier Yvon Bourges
Maison 4 pièces de 69,15 m² composée de :
- Au RDC : garage, séjour -cuisine, dégagement, wc
- A l'étage mansardé : trois chambres, salle de bains, wc
Jardin de 381m²
Pas de vis à vis, au calme d'une impasse.

Visites : Sur rendez-vous.

Immobilier.notaires® : Evaluer, acheter & vendre avec les notaires partout en France. 12 000 notaires, experts et négociateurs vous accompagnent dans vos projets immobiliers en toute confiance.`,
      'https://www.exemple.com/annonce/12345', // Lien pour plus d'informations
      new Date(), // Date de la dernière mise à jour
      [
        'https://media.immobilier.notaires.fr/inotr/media/29/22044/1668051/9e6eb71e_VGA.jpg'
      ] // Liste des images
    )
  ];

  return (
    <SimpleLayoutWithTitleFooter
      title="Annonces Immobilières"
      footer={ 
                <FiltresAnnonces />}
    >
      <div className="md:border-l md:pl-6 ">
        <div className="flex w-full flex-col space-y-16">
          {annonces.map((annonce) => (
            <ElementAnnonce key={annonce.id} annonce={annonce} />
          ))}
        </div>
      </div>
    </SimpleLayoutWithTitleFooter>
  )
}
