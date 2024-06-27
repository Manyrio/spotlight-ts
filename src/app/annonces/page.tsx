'use client';

import { type Metadata } from 'next'

import { useState } from 'react'
import { Card } from '@/components/Card'
import { SimpleLayout, SimpleLayoutWithTitleFooter } from '@/components/SimpleLayout'
import { type ArticleWithSlug, getAllArticles } from '@/lib/articles'
import { Annonce, TypeTransaction, FinancesImmobilieres, TypePropriete, ClasseEnergie, ClasseGaz, TypeChauffage, EtatPropriete, OrientationPropriete } from '@/lib/annonce'
import { formatDate } from '@/lib/formatDate'
import { formatLocalisation } from '@/lib/localisation'
import { Menu, MenuButton, MenuItem, MenuItems, Popover, PopoverButton, PopoverGroup, PopoverPanel, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'

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
        <MenuItems className="absolute left-0 z-10 mt-2 w-40 origin-top-left rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
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
    <article className="md:grid md:grid-cols-4 md:items-baseline">
      <Card className="md:col-span-3">
        <Card.Title 
        href={`/annonces/${annonce.id} `}
        >
          {annonce.finances.prixTotal.toLocaleString("fr-FR", { style: "currency", currency: "EUR" })}
        </Card.Title>
        <p className="relative z-20 md:block text-sm text-zinc-600 dark:text-zinc-400">
          Frais d'agence: {annonce.finances.calculerFraisAgence().toLocaleString("fr-FR", { style: "currency", currency: "EUR" })} ({annonce.finances.pourcentageFraisAgence * 100}%)
        </p>
        <Card.Eyebrow
          as="p"
          className="md:hidden"
          decorate
        >
          {formatLocalisation(annonce.localisation)}
        </Card.Eyebrow>
        <Card.Description>{annonce.details}</Card.Description>
        <Card.Cta>En savoir plus</Card.Cta>
      </Card>
      <Card.Eyebrow
        as="p"
        className="mt-1 hidden md:block"
      >
          {formatLocalisation(annonce.localisation)}
      </Card.Eyebrow>
    </article>
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
            {DropDown({ title: "Classe énergie", enumObject: ClasseEnergie, selected: "A", setSelected: (value) => { console.log(value) } })}
            {DropDown({ title: "Classe gaz", enumObject: ClasseGaz, selected: "A", setSelected: (value) => { console.log(value) } })}
            </div>
          </div>
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
          ville: 'Paris',
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
      'Un magnifique appartement situé au cœur de Paris, proche de toutes commodités.', // Description du bien
      'https://www.exemple.com/annonce/12345', // Lien pour plus d'informations
      new Date(), // Date de la dernière mise à jour
      [
        'https://www.exemple.com/images/image1.jpg',
        'https://www.exemple.com/images/image2.jpg'
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
          ville: 'Paris',
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
      'Un magnifique appartement situé au cœur de Paris, proche de toutes commodités.', // Description du bien
      'https://www.exemple.com/annonce/12345', // Lien pour plus d'informations
      new Date(), // Date de la dernière mise à jour
      [
        'https://www.exemple.com/images/image1.jpg',
        'https://www.exemple.com/images/image2.jpg'
      ] // Liste des images
    )
  ];

  return (
    <SimpleLayoutWithTitleFooter
      title="Annonces Immobilières"
      footer={ 
        <FiltresAnnonces />}
    >
      <div className="md:border-l md:border-zinc-100 md:pl-6 md:dark:border-zinc-700/40">
        <div className="flex max-w-3xl flex-col space-y-16">
          {annonces.map((annonce) => (
            <ElementAnnonce key={annonce.id} annonce={annonce} />
          ))}
        </div>
      </div>
    </SimpleLayoutWithTitleFooter>
  )
}
