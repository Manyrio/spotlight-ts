'use client';

import { Component, use, useContext, useState } from 'react'
import { Card } from '@/components/Card'
import { SimpleLayout, SimpleLayoutWithTitleFooter } from '@/components/SimpleLayout'
import { Annonce, TypeTransaction, FinancesImmobilieres, TypePropriete, ClasseEnergie, ClasseGaz, TypeChauffage, EtatPropriete, OrientationPropriete } from '@/models/annonce'
import { formatDate } from '@/models/formatDate'
import { formatLocalisation } from '@/models/localisation'
import { Description, Dialog, DialogPanel, DialogTitle, Menu, MenuButton, MenuItem, MenuItems, Popover, PopoverButton, PopoverGroup, PopoverPanel, Transition } from '@headlessui/react'
import { ChevronDownIcon, ChevronRightIcon } from '@heroicons/react/20/solid'
import { AppContext } from '@/app/providers';
import Link from 'next/link';
import { Button } from '@/components/Button';
import { Method, call } from '@/scripts/api';




function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

function DropDown({ title, enumObject, selected, setSelected }: { title: string, enumObject: any, selected: string, setSelected: (value: string) => void }) {
  const { colors } = useContext(AppContext)



  return (

    <Menu as="div" className="relative inline-block dark:text-gray-200 text-left">
      <div>
        <MenuButton className="group inline-flex justify-center dark:text-gray-200 text-sm font-medium dark:text-gray-200 text-gray-700 text-gray-900"

          style={{ color: colors.attributes.indicator }}
        >
          {title}
          <ChevronDownIcon
            className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 dark:text-gray-200 text-gray-400  text-gray-500"
            style={{ color: colors.attributes.indicator }}
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
                      style={{ color: colors.attributes.indicator }}
                      className={classNames(
                        active ? 'bg-gray-100' : '',
                        'block px-4 py-2 dark:text-gray-200 text-sm font-medium dark:text-gray-200 text-gray-900 ',
                      )}
                    >
                      {enumObject[key]}
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
  const { colors } = useContext(AppContext)


  return (
    <Link className="md:grid w-full md:grid-cols-3 md:items-center gap-8" href={`/annonces/${annonce.id} `}>
      <Card className="md:col-span-1" >
        <span className="relative z-20 mb-[12px] inline-flex items-center rounded-full bg-gray-600/40 px-2 py-1 text-xs font-medium  ring-1 ring-inset ring-gray-500/10" style={{ color: colors.attributes.accent, background: colors.attributes.tintedBackground }}>
          {annonce.type}
        </span>
        <p />
        <Card.Title

          style={{ color: colors.attributes.accent }}
        >
          Titre test
        </Card.Title>
        <p className="relative z-20 font-semibold md:block dark:text-gray-200 text-lg dark:text-gray-200 text-zinc-600 dark:dark:text-gray-200 text-zinc-400"
          style={{ color: colors.attributes.hint }}
        >
          {annonce.finances.prixTotal.toLocaleString("fr-FR", { style: "currency", currency: "EUR" })}
        </p>
        <p className="relative z-20 md:block dark:text-gray-200 text-sm dark:text-gray-200 text-zinc-600 dark:dark:text-gray-200 text-zinc-400"
          style={{ color: colors.attributes.hint }}
        >
          Honoraires de négociation: {annonce.finances.calculerFraisAgence().toLocaleString("fr-FR", { style: "currency", currency: "EUR" })} ({annonce.finances.pourcentageFraisAgence}%)
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
        <br />
        <Card.Description>{annonce.details}</Card.Description>
        <br />

        <p className="relative z-20 font-semibold md:block dark:text-gray-200 text-lg dark:text-gray-200 text-zinc-600 dark:dark:text-gray-200 text-zinc-400"
          style={{ color: colors.attributes.hint }}
        >{annonce.localisation.addresse.ville}</p>
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
    </Link>
  )
}

function Contact() {
  const { colors } = useContext(AppContext)
  let [opened, setOpened] = useState(false)
  let [name, setName] = useState("")
  let [lastName, setLastName] = useState("")
  let [tel, setTel] = useState("")
  let [mail, setMail] = useState("")
  let [type, setType] = useState("Appartement")
  let [budget, setBudget] = useState("")
  let [loader, setLoader] = useState(false)
  let [message, setMessage] = useState("")

  async function submit(e: any) {
    e.preventDefault()
    if (loader) return
    setMessage("")
    setLoader(true)
    try {
      await call("/api/contact", Method.post, { message: `Budget: ${budget}€<br/>Type de bien recherché: ${type}<br/>Numéro de téléphone: ${tel}<br/>`, email: mail, name: name, lastName: lastName })

    } catch (error) {
      setMessage("Erreur lors de l'envoi")
    } finally {
      setLoader(false)
    }
    setMessage("Demande envoyée avec succès")

  }

  return (
    <div className="mx-auto mt-6 border-b pb-12 mb-12 grid max-w-2xl grid-cols-1 sm:grid-cols-2 gap-8 dark:text-gray-200 text-base leading-7  sm:gap-y-16 lg:mx-0 lg:max-w-none "
      style={{ borderColor: colors.attributes.border }}>

      <div>
        <h3 className="border-l border-indigo-600 pl-6 font-semibold dark:text-gray-200 text-gray-900" style={{ color: colors.attributes.indicator, borderColor: colors.attributes.primary }}>Marie-Sophie LEGASTELOIS</h3>
        <address className="border-l border-gray-200 pl-6 pt-2 not-italic dark:text-gray-200 text-gray-600" style={{ color: colors.attributes.hint, borderColor: colors.attributes.border }}>
          <a href={`tel:+33 2 96 83 96 84`} >+33 2 96 83 96 84</a>
          <br />
          <a href={`mailto:nego@notaires-caulnes.fr`}>nego@notaires-caulnes.fr</a>
        </address>
      </div>


      <div onClick={() => setOpened(true)} className='cursor-pointer'>
        <h3 className="border-l border-indigo-600 pl-6 font-semibold dark:text-gray-200 text-gray-900 flex items-center" style={{ color: colors.attributes.indicator, borderColor: colors.attributes.primary }}>Envoyer ma demande <ChevronRightIcon className='h-6 w-6'></ChevronRightIcon></h3>
        <address className="border-l border-gray-200 pl-6 pt-2 not-italic dark:text-gray-200 text-gray-600" style={{ color: colors.attributes.hint, borderColor: colors.attributes.border }}>
          <div>Demandez directement ce que vous recherchez</div>
        </address>
      </div>


      {opened &&

        <Dialog open={opened} onClose={() => setOpened(false)}
          className="fixed z-50 inset-0 flex w-screen items-center justify-center bg-black/30 p-4   "
        >
          <div className="fixed inset-0 w-screen overflow-y-auto p-4 ">
            <div className="flex min-h-full items-center justify-center">

              <DialogPanel className="max-w-lg space-y-4 border bg-white p-12 rounded-md"
                style={{ color: colors.attributes.accent }}
              >
                <DialogTitle className="font-bold"
                  style={{ color: colors.attributes.accent }}
                >Envoyer ma demande</DialogTitle>
                <Description className={"pb-6"}
                  style={{ color: colors.attributes.indicator }}

                >Faites votre demande en direct, nous reviendrons vers vous rapidement.</Description>

                <form onSubmit={(e) => submit(e)} >

                  <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
                    <div>
                      <label htmlFor="first-name" className="block dark:text-gray-200 text-sm font-semibold leading-6 dark:text-gray-200 text-gray-900"
                        style={{ color: colors.attributes.indicator }}
                      >
                        Prénom
                      </label>
                      <div className="mt-2.5">
                        <input
                          onChange={(e) => setName(e.target.value)}
                          value={name}
                          type="text"
                          name="first-name"
                          id="first-name"
                          autoComplete="given-name"
                          className="bg-gray-600/40   block w-full rounded-md border-0 px-3.5 py-2 dark:text-gray-200 text-gray-900 shadow-sm ring-inset ring-gray-300 placeholder:dark:text-gray-200 text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:dark:text-gray-200 text-sm sm:leading-6"
                          style={{ background: colors.attributes.tintedBackground, color: colors.attributes.indicator }}

                        />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="last-name" className="block dark:text-gray-200 text-sm font-semibold leading-6 dark:text-gray-200 text-gray-900"
                        style={{ color: colors.attributes.indicator }}

                      >
                        Nom
                      </label>
                      <div className="mt-2.5">
                        <input
                          onChange={(e) => setLastName(e.target.value)}
                          value={lastName}
                          type="text"
                          name="last-name"
                          id="last-name"
                          autoComplete="family-name"
                          className="bg-gray-600/40  block w-full rounded-md border-0 px-3.5 py-2 dark:text-gray-200 text-gray-900 shadow-sm ring-inset ring-gray-300 placeholder:dark:text-gray-200 text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:dark:text-gray-200 text-sm sm:leading-6"
                          style={{ background: colors.attributes.tintedBackground, color: colors.attributes.indicator }}

                        />
                      </div>
                    </div>


                    <div className="sm:col-span-2 ">
                      <div className='mb-6'>
                        <label htmlFor="budget" className="block dark:text-gray-200 text-sm font-semibold leading-6 dark:text-gray-200 text-gray-900"
                          style={{ color: colors.attributes.indicator }}

                        >
                          Adresse e-mail
                        </label>
                        <div className="mt-2.5">
                          <input
                            onChange={(e) => setMail(e.target.value)}
                            value={mail}
                            id="email"
                            name="email"
                            type="email"
                            className="bg-gray-600/40   block w-full rounded-md border-0 px-3.5 py-2 dark:text-gray-200 text-gray-900 shadow-sm  ring-inset ring-gray-300 placeholder:dark:text-gray-200 text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:dark:text-gray-200 text-sm sm:leading-6"

                            style={{ background: colors.attributes.tintedBackground, color: colors.attributes.indicator }}

                          />
                        </div>
                      </div>

                      <div className='mb-6'>
                        <label htmlFor="budget" className="block dark:text-gray-200 text-sm font-semibold leading-6 dark:text-gray-200 text-gray-900"
                          style={{ color: colors.attributes.indicator }}

                        >
                          Numéro de téléphone
                        </label>
                        <div className="mt-2.5">
                          <input
                            onChange={(e) => setTel(e.target.value)}
                            value={tel}
                            id="tel"
                            name="tel"
                            type="phone"
                            className="bg-gray-600/40   block w-full rounded-md border-0 px-3.5 py-2 dark:text-gray-200 text-gray-900 shadow-sm  ring-inset ring-gray-300 placeholder:dark:text-gray-200 text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:dark:text-gray-200 text-sm sm:leading-6"

                            style={{ background: colors.attributes.tintedBackground, color: colors.attributes.indicator }}

                          />
                        </div>
                      </div>



                      <div className='mb-6'>
                        <label htmlFor="budget" className="block dark:text-gray-200 text-sm font-semibold leading-6 dark:text-gray-200 text-gray-900"
                          style={{ color: colors.attributes.indicator }}

                        >
                          Type de bien recherché
                        </label>
                        <div className="mt-2.5">

                          <select
                            onChange={(e) => setType(e.target.value)}
                            value={type}
                            id="type"
                            name="type"
                            className="bg-gray-600/40   block w-full rounded-md border-0 px-3.5 py-2 dark:text-gray-200 text-gray-900 shadow-sm  ring-inset ring-gray-300 placeholder:dark:text-gray-200 text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:dark:text-gray-200 text-sm sm:leading-6"

                            style={{ background: colors.attributes.tintedBackground, color: colors.attributes.indicator }}>

                            <option value="Appartement">Appartement</option>
                            <option value="Maison">Maison</option>
                            <option value="Terrain">Terrain</option>
                            <option value="Commerce">Commerce</option>
                            <option value="Immeuble">Immeuble</option>
                            <option value="Parking">Parking</option>
                            <option value="Autre">Autre</option>

                          </select>

                        </div>
                      </div>



                      <div className='mb-6'>
                        <label htmlFor="budget" className="block dark:text-gray-200 text-sm font-semibold leading-6 dark:text-gray-200 text-gray-900"
                          style={{ color: colors.attributes.indicator }}

                        >
                          Budget maximum (€)
                        </label>
                        <div className="mt-2.5">
                          <input
                            onChange={(e) => setBudget(e.target.value)}
                            value={budget}
                            id="budget"
                            name="budget"
                            type="number"
                            className="bg-gray-600/40   block w-full rounded-md border-0 px-3.5 py-2 dark:text-gray-200 text-gray-900 shadow-sm  ring-inset ring-gray-300 placeholder:dark:text-gray-200 text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:dark:text-gray-200 text-sm sm:leading-6"

                            style={{ background: colors.attributes.tintedBackground, color: colors.attributes.indicator }}

                          />
                        </div>
                      </div>


                    </div>
                  </div>
                  <div className="mt-6">
                    <Button
                      disabled={loader}
                      type="submit"
                      className="w-full "
                      style={{ background: colors.attributes.primary }}
                    >
                      Envoyer la demande
                    </Button>
                    {message ? <div style={{ color: colors.attributes.indicator }}>{message}</div> : ""}
                  </div>
                  <p className="mt-4 dark:text-gray-200 text-sm leading-6 dark:text-gray-200 text-gray-500"
                    style={{ color: colors.attributes.hint }}
                  >
                    En formulant votre demande, vous acceptez la{' '}
                    <a href="#" className="font-semibold dark:text-gray-200 text-indigo-600"
                      style={{ color: colors.attributes.primary }}

                    >
                      politique de confidentialité
                    </a>
                    .
                  </p>

                </form>

              </DialogPanel>
            </div>
          </div>
        </Dialog>


      }

    </div>
  )
}

enum Localisation {
  Paris = "Paris",
  Biarritz = "Biarritz"
}

enum Prix {
  zeroToHundred = "de 0 à 100 000€",
  hundredToUndredFifty = "de 100 000 à 150 000€",
  hundredFiftyToTwoHundreds = "de 150 000 à 200 000€",
  moreThanTwoHundreds = "+ de 200 000€",
}

function FiltresAnnonces() {
  const [open, setOpen] = useState(false)
  const { colors } = useContext(AppContext)

  return (
    <section aria-labelledby="filter-heading" className=" pt-6">
      <Contact />

      {/* <h2 id="filter-heading" className="sr-only">
        Filtres
      </h2> */}

      {/* <div className="flex items-center gap-8 flex-wrap">
        {wn({ tiDropDotle: "Catégorie", enumObject: TypeTransaction, selected: TypeTransaction.Vente, setSelected: (value) => { console.log(value) } })}
        {DropDown({ title: "Prix", enumObject: Prix, selected: Prix.zeroToHundred, setSelected: (value) => { console.log(value) } })}

        {DropDown({ title: "Localisation", enumObject: Localisation, selected: Localisation.Paris, setSelected: (value) => { console.log(value) } })}
      </div> */}
    </section>
  )
}

export default function AnnoncesContent() {
  const { colors } = useContext(AppContext)
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

    new Annonce('123456', // Identifiant de l'annonce
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
    new Annonce('123457', // Identifiant de l'annonce
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

    new Annonce('123458', // Identifiant de l'annonce
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
      <div className="md:border-l md:pl-6 " style={{ borderColor: colors.attributes.border }}>
        <div className="flex w-full flex-col space-y-16">
          {annonces.map((annonce) => (
            <ElementAnnonce key={annonce.id} annonce={annonce} />
          ))}
        </div>
      </div>
    </SimpleLayoutWithTitleFooter>
  )
}
