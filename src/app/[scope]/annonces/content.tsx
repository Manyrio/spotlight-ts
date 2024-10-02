'use client';

import { Component, use, useContext, useEffect, useState } from 'react'
import { Card } from '@/components/Card'
import { SimpleLayout, SimpleLayoutWithTitleFooter } from '@/components/SimpleLayout'
import { Annonce, AnnonceObject, BienNature, getAnnoncePeriodicite, getAnnonceSurface, getAnnonceType, translateAnnonceType, TypeHonoraires, TypeTransaction } from '@/models/annonce'
import { formatDate } from '@/models/formatDate'
import { formatLocalisation } from '@/models/localisation'
import { Description, Dialog, DialogPanel, DialogTitle, Input, Menu, MenuButton, MenuItem, MenuItems, Popover, PopoverButton, PopoverGroup, PopoverPanel, Transition } from '@headlessui/react'
import { ChevronDownIcon, ChevronRightIcon } from '@heroicons/react/20/solid'
import { AppContext, NotificationColor } from '@/app/providers';
import Link from 'next/link';
import { Button } from '@/components/Button';
import { Method, call } from '@/scripts/api';
import { ApiListResponse, NotyResponse } from '@/models/other';
import { currency } from '../../../models/annonce';
import { RiBuilding3Line, RiErrorWarningLine, RiHome3Line, RiShakeHandsLine } from '@remixicon/react';




function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

function DropDown({ title, enumObject, setSelected, translate }: { title: string, enumObject: any, setSelected: (value: string) => void, translate?: (value: any) => void }) {
  const { colors } = useContext(AppContext)

  let [selection, setSelection] = useState<string>()

  useEffect(() => {
    if (selection) setSelected(selection)


  }, [selection])

  return (

    <Menu as="div" className="relative inline-block dark:text-gray-200 text-left rounded-md ">
      <div>
        <MenuButton className="group inline-flex justify-center dark:text-gray-200 text-sm font-medium dark:text-gray-200 text-gray-700 text-gray-900"

          style={{ color: colors.attributes.indicator }}
        >
          {selection ? selection : title}
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
        <MenuItems className="absolute left-0 z-30 mt-2 w-fit origin-top-left rounded-md shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none"
        >
          <div className="rounded-md overflow-hidden"
            style={{ background: colors.attributes.tintedBackground }}
          >
            {enumObject &&
              Object.keys(enumObject).map((key) => (
                <MenuItem key={key}>
                  {({ active }) => (
                    <div
                      onClick={() => setSelection(enumObject[key])}
                      style={{ color: colors.attributes.indicator }}
                      className={classNames(
                        active ? 'bg-gray-100' : '',
                        'block px-4 py-2 dark:text-gray-200 text-sm font-medium dark:text-gray-200 text-gray-900 cursor-pointer',
                      )}
                    >
                      {translate ?
                        translate(enumObject[key])
                        :
                        enumObject[key]}
                    </div>
                  )}
                </MenuItem>
              ))
            }


          </div>
        </MenuItems>
      </Transition>
    </Menu>)
}


export function ElementAnnonce({ annonceObject, shrinked = false }: { annonceObject: AnnonceObject, shrinked?: boolean }) {
  const { colors, scope } = useContext(AppContext);
  let annonce = annonceObject.attributes.object
  let photos = annonceObject.attributes.photos || { data: null }

  return (
    <Link className={`md:grid w-full md:grid-cols-4 md:items-center gap-8 ${shrinked ? "sm:!flex sm:!flex-col sm:!gap-2" : ""}`} href={`/${scope}/annonces/${annonce.uuid}`}>
      <Card className="md:col-span-2 w-full">
        <span
          className="relative z-20 mb-[12px] inline-flex items-center rounded-full bg-gray-600/40 px-2 py-1 text-xs font-medium  ring-1 ring-inset ring-gray-500/10"
          style={{
            color: colors.attributes.accent,
            background: colors.attributes.tintedBackground,
          }}
        >

          {getAnnonceType(annonce)}


        </span>

        <p />


        <Card.Title style={{ color: colors.attributes.accent }}>

          {annonce.transaction == TypeTransaction.location ?
            <>{currency(annonce.loyer)} {annonce.charges_incluses ? "cc" : ""} / {getAnnoncePeriodicite(annonce.loyer_periodicite)} </>
            :
            annonce.transaction == TypeTransaction.vente_viager ?
              <>{currency(annonce.rente.montant)} / {getAnnoncePeriodicite(annonce.rente.periodicite)}</>
              :
              <>{currency(annonce.prix_hni)}</>}
        </Card.Title>



        <Card.Eyebrow as="p" className="md:hidden w-full" decorate>
          {photos.data && photos.data.length > 0 ?
            <img
              src={process.env.NEXT_PUBLIC_BACKEND_URL + photos.data[0].attributes.url}
              alt="Bien image"
              className="rounded-lg w-full  aspect-video object-cover shrink-0"
            />
            : <img
              src={""}
              alt="Bien image"
              className="rounded-lg w-full aspect-video  shrink-0 bg-gray-200"
            />
          }
        </Card.Eyebrow>

        <p
          className="relative z-20 font-semibold md:block dark:text-gray-200 text-base text-zinc-600 "
          style={{ color: colors.attributes.indicator }}
        >
          à {annonce.bien.commune.libelle} ({annonce.bien.commune.code_postal})
        </p>

        <p
          className="relative z-20 font-semibold  text-base flex items-center mt-2"
          style={{ color: colors.attributes.hint }}
        >
          <RiBuilding3Line className='h-5 w-5 mr-1'></RiBuilding3Line>
          {annonce.bien.nature}
        </p>

        <Card.Cta>Voir l'annonce</Card.Cta>
      </Card>

      <Card.Eyebrow as="p" className="mt-1 hidden md:block md:col-span-2 w-full">
        <article
          key={annonce.uuid}
          className="relative isolate flex flex-col justify-end overflow-hidden rounded-2xl bg-gray-900 px-8 pb-8 pt-80 sm:pt-48 lg:pt-80"
        >
          {photos.data && photos.data.length > 0 ?
            <img
              src={process.env.NEXT_PUBLIC_BACKEND_URL + photos.data[0].attributes.url}
              alt="Bien image"
              className="absolute inset-0 -z-10 h-full w-full object-cover"
            /> :
            <img
              src={""}
              alt="Bien image"
              className="absolute inset-0 -z-10 h-full w-full object-cover bg-gray-200"
            />
          }
        </article>
      </Card.Eyebrow>
    </Link>
  );
}


function Contact() {
  const { colors, addNotification } = useContext(AppContext)
  let [opened, setOpened] = useState(false)
  let [name, setName] = useState("")
  let [lastName, setLastName] = useState("")
  let [tel, setTel] = useState("")
  let [mail, setMail] = useState("")
  let [type, setType] = useState("Appartement")
  let [budget, setBudget] = useState("")
  let [loader, setLoader] = useState(false)

  async function submit(e: any) {
    e.preventDefault()
    if (loader) return
    setLoader(true)
    try {
      await call("/api/contact", Method.post, { message: `Budget: ${budget}€<br/>Type de bien recherché: ${type}<br/>Numéro de téléphone: ${tel}<br/>`, email: mail, name: name, lastName: lastName })

    } catch (error) {
      addNotification({ message: "Erreur lors de l'envoi", color: NotificationColor.red, title: "Erreur", Icon: RiErrorWarningLine })
      setLoader(false)
      return
    } finally {
      setLoader(false)
    }
    setOpened(false)
    addNotification({ title: "Demande envoyée avec succès ! ", message: "Nous reviendrons vers vous dans les plus brefs délais.", color: NotificationColor.green })

  }

  return (
    <div className="mx-auto mt-6 border-b pb-12 mb-12 grid max-w-2xl grid-cols-1 sm:grid-cols-2 gap-8 dark:text-gray-200 text-base leading-7  sm:gap-y-16 lg:mx-0 lg:max-w-none "
      style={{ borderColor: colors.attributes.border }}>

      <div>
        <h3 className="border-l border-indigo-600 pl-6 font-semibold dark:text-gray-200 text-gray-900" style={{ color: colors.attributes.accent, borderColor: colors.attributes.primary }}>Marie-Sophie LEGASTELOIS</h3>
        <address className="border-l border-gray-200 pl-6 pt-2 not-italic dark:text-gray-200 text-gray-600" style={{ color: colors.attributes.hint, borderColor: colors.attributes.border }}>
          <a href={`tel:+33 2 96 83 96 84`} >+33 2 96 83 96 84</a>
          <br />
          <a href={`mailto:nego@notaires-caulnes.fr`}>nego@notaires-caulnes.fr</a>
        </address>
      </div>


      <div onClick={() => setOpened(true)} className='cursor-pointer'>
        <h3 className="border-l border-indigo-600 pl-6 font-semibold dark:text-gray-200 text-gray-900 flex items-center" style={{ color: colors.attributes.accent, borderColor: colors.attributes.primary }}>Envoyer ma demande <ChevronRightIcon className='h-6 w-6'></ChevronRightIcon></h3>
        <address className="border-l border-gray-200 pl-6 pt-2 not-italic dark:text-gray-200 text-gray-600" style={{ color: colors.attributes.hint, borderColor: colors.attributes.border }}>
          <div>Demandez directement ce que vous recherchez</div>
        </address>
      </div>


      {opened &&

        <Dialog open={opened} onClose={() => setOpened(false)}
          className="fixed z-[100] inset-0 flex w-screen items-center justify-center bg-black/30 p-4   "
        >
          <div className="fixed inset-0 w-screen overflow-y-auto p-4 ">
            <div className="flex min-h-full items-center justify-center">

              <DialogPanel className="max-w-lg space-y-4  bg-white p-12 rounded-md"
                style={{ color: colors.attributes.accent, background: colors.attributes.background }}
              >
                <DialogTitle className="font-bold"
                  style={{ color: colors.attributes.accent }}
                >Envoyer ma demande</DialogTitle>
                <Description className={"pb-6"}
                  style={{ color: colors.attributes.indicator }}

                >Dites-nous ce que vous recherchez. Nous reviendrons vers vous rapidement.</Description>

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
                          className="bg-gray-600/40 border-[1px]   block w-full rounded-md border-0 px-3.5 py-2 dark:text-gray-200 text-gray-900 shadow-sm ring-inset ring-gray-300 placeholder:dark:text-gray-200 text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:dark:text-gray-200 text-sm sm:leading-6"
                          style={{ background: colors.attributes.tintedBackground, color: colors.attributes.indicator, borderColor: colors.attributes.border }}

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
                          className="bg-gray-600/40 border-[1px]   block w-full rounded-md border-0 px-3.5 py-2 dark:text-gray-200 text-gray-900 shadow-sm ring-inset ring-gray-300 placeholder:dark:text-gray-200 text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:dark:text-gray-200 text-sm sm:leading-6"
                          style={{ background: colors.attributes.tintedBackground, color: colors.attributes.indicator, borderColor: colors.attributes.border }}

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
                            className="bg-gray-600/40 border-[1px]    block w-full rounded-md border-0 px-3.5 py-2 dark:text-gray-200 text-gray-900 shadow-sm  ring-inset ring-gray-300 placeholder:dark:text-gray-200 text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:dark:text-gray-200 text-sm sm:leading-6"

                            style={{ background: colors.attributes.tintedBackground, color: colors.attributes.indicator, borderColor: colors.attributes.border }}

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
                            className="bg-gray-600/40 border-[1px]    block w-full rounded-md border-0 px-3.5 py-2 dark:text-gray-200 text-gray-900 shadow-sm  ring-inset ring-gray-300 placeholder:dark:text-gray-200 text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:dark:text-gray-200 text-sm sm:leading-6"

                            style={{ background: colors.attributes.tintedBackground, color: colors.attributes.indicator, borderColor: colors.attributes.border }}

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
                            className="bg-gray-600/40 border-[1px]    block w-full rounded-md border-0 px-3.5 py-2 dark:text-gray-200 text-gray-900 shadow-sm  ring-inset ring-gray-300 placeholder:dark:text-gray-200 text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:dark:text-gray-200 text-sm sm:leading-6"

                            style={{ background: colors.attributes.tintedBackground, color: colors.attributes.indicator, borderColor: colors.attributes.border }}>

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
                            className="bg-gray-600/40  border-[1px]   block w-full rounded-md border-0 px-3.5 py-2 dark:text-gray-200 text-gray-900 shadow-sm  ring-inset ring-gray-300 placeholder:dark:text-gray-200 text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:dark:text-gray-200 text-sm sm:leading-6"

                            style={{ background: colors.attributes.tintedBackground, color: colors.attributes.indicator, borderColor: colors.attributes.border }}

                          />
                        </div>
                      </div>


                    </div>
                  </div>
                  <div className="mt-4">
                    <Button
                      disabled={loader}
                      type="submit"
                      className="w-full "
                      style={{ background: colors.attributes.primary }}
                    >
                      Envoyer la demande
                    </Button>
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

function FiltresAnnonces({ filtres, setFiltres }: { filtres: { [key: string]: { value: string | number, operator: string } }, setFiltres: (value: { [key: string]: { value: string | number, operator: string } }) => void }) {

  const [open, setOpen] = useState(false)
  const { colors } = useContext(AppContext)

  return (
    <section aria-labelledby="filter-heading" className=" pt-6">
      <Contact />

      <h2 id="filter-heading" className="sr-only">
        Filtres
      </h2>

      <div className="flex items-start gap-8 flex-wrap">


        {DropDown({ translate: translateAnnonceType, title: "Transaction", enumObject: TypeTransaction, setSelected: (value) => setFiltres({ ...filtres, transaction: { value: value, operator: "$eq" } }) })}

        {DropDown({ title: "Type de Bien", enumObject: BienNature, setSelected: (value) => setFiltres({ ...filtres, natureBien: { value: value, operator: "$eq" } }) })}


        {/* {DropDown({ title: "Prix", enumObject: Prix, selected: Prix.zeroToHundred, setSelected: (value) => { console.log(value) } })} */}

        {/* {DropDown({ title: "Localisation", enumObject: Localisation, selected: Localisation.Paris, setSelected: (value) => { console.log(value) } })} */}

        <div className='cursor-pointer ml-auto font-semibold flex items-center' onClick={() => setOpen(!open)}
          style={{ color: colors.attributes.accent }}
        >Voir plus de critères
          <ChevronDownIcon className='h-5 w-5'></ChevronDownIcon>
        </div>

      </div>

      <div className='mt-8'>

        {open && <div className="flex items-start justify-end gap-8 flex-wrap">


          <div>

            <label htmlFor="first-name" className="block dark:text-gray-200 text-sm font-semibold leading-6 dark:text-gray-200 text-gray-900"
              style={{ color: colors.attributes.indicator }}
            >
              Localisation (code postal / ville)
            </label>
            <div className="mt-2.5">
              <input
                onChange={(e) => setFiltres({ ...filtres, localisation: { value: e.target.value, operator: "$eq" } })}
                type="text"
                name="first-name"
                id="first-name"
                autoComplete="given-name"
                className="bg-gray-600/40  border-[1px] block w-full rounded-md border-0 px-3.5 py-2 dark:text-gray-200 text-gray-900 shadow-sm ring-inset ring-gray-300 placeholder:dark:text-gray-200 text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:dark:text-gray-200 text-sm sm:leading-6"
                style={{ background: colors.attributes.tintedBackground, color: colors.attributes.indicator, borderColor: colors.attributes.border }}

              />
            </div>
          </div>


          <div>

            <label htmlFor="first-name" className="block dark:text-gray-200 text-sm font-semibold leading-6 dark:text-gray-200 text-gray-900"
              style={{ color: colors.attributes.indicator }}
            >
              Surface min (m²)
            </label>
            <div className="mt-2.5">
              <input
                onChange={(e) => setFiltres({ ...filtres, surface: { value: e.target.value, operator: "$gte" } })}
                type="number"
                placeholder='0'
                min={9}
                max={1000}
                className="bg-gray-600/40  border-[1px] block w-full rounded-md border-0 px-3.5 py-2 dark:text-gray-200 text-gray-900 shadow-sm ring-inset ring-gray-300 placeholder:dark:text-gray-200 text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:dark:text-gray-200 text-sm sm:leading-6"
                style={{ background: colors.attributes.tintedBackground, color: colors.attributes.indicator, borderColor: colors.attributes.border }}

              />
            </div>
          </div>



          <div>

            <label htmlFor="first-name" className="block dark:text-gray-200 text-sm font-semibold leading-6 dark:text-gray-200 text-gray-900"
              style={{ color: colors.attributes.indicator }}
            >
              Surface max (m²)
            </label>
            <div className="mt-2.5">
              <input
                onChange={(e) => setFiltres({ ...filtres, surface: { value: e.target.value, operator: "$lte" } })}
                type="number"
                placeholder='0'
                min={9}
                max={1000}
                className="bg-gray-600/40  border-[1px] block w-full rounded-md border-0 px-3.5 py-2 dark:text-gray-200 text-gray-900 shadow-sm ring-inset ring-gray-300 placeholder:dark:text-gray-200 text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:dark:text-gray-200 text-sm sm:leading-6"
                style={{ background: colors.attributes.tintedBackground, color: colors.attributes.indicator, borderColor: colors.attributes.border }}

              />
            </div>
          </div>






          <div>

            <label htmlFor="first-name" className="block dark:text-gray-200 text-sm font-semibold leading-6 dark:text-gray-200 text-gray-900"
              style={{ color: colors.attributes.indicator }}
            >
              Prix min (€)
            </label>
            <div className="mt-2.5">
              <input
                onChange={(e) => setFiltres({ ...filtres, prix: { value: e.target.value, operator: "$gte" } })}
                type="number"
                placeholder='0'
                min={9}
                max={1000}
                className="bg-gray-600/40  border-[1px] block w-full rounded-md border-0 px-3.5 py-2 dark:text-gray-200 text-gray-900 shadow-sm ring-inset ring-gray-300 placeholder:dark:text-gray-200 text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:dark:text-gray-200 text-sm sm:leading-6"
                style={{ background: colors.attributes.tintedBackground, color: colors.attributes.indicator, borderColor: colors.attributes.border }}

              />
            </div>
          </div>



          <div>

            <label htmlFor="first-name" className="block dark:text-gray-200 text-sm font-semibold leading-6 dark:text-gray-200 text-gray-900"
              style={{ color: colors.attributes.indicator }}
            >
              Prix max (€)
            </label>
            <div className="mt-2.5">
              <input
                onChange={(e) => setFiltres({ ...filtres, prix: { value: e.target.value, operator: "$lte" } })}
                type="number"
                placeholder='0'
                min={9}
                max={1000}
                className="bg-gray-600/40  border-[1px] block w-full rounded-md border-0 px-3.5 py-2 dark:text-gray-200 text-gray-900 shadow-sm ring-inset ring-gray-300 placeholder:dark:text-gray-200 text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:dark:text-gray-200 text-sm sm:leading-6"
                style={{ background: colors.attributes.tintedBackground, color: colors.attributes.indicator, borderColor: colors.attributes.border }}

              />
            </div>
          </div>




          <div>

            <label htmlFor="first-name" className="block dark:text-gray-200 text-sm font-semibold leading-6 dark:text-gray-200 text-gray-900"
              style={{ color: colors.attributes.indicator }}
            >
              Nombre de pièces min
            </label>
            <div className="mt-2.5">
              <input
                onChange={(e) => setFiltres({ ...filtres, nombrePieces: { value: e.target.value, operator: "$gte" } })}
                type="number"
                placeholder='0'
                min={9}
                max={1000}
                className="bg-gray-600/40  border-[1px] block w-full rounded-md border-0 px-3.5 py-2 dark:text-gray-200 text-gray-900 shadow-sm ring-inset ring-gray-300 placeholder:dark:text-gray-200 text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:dark:text-gray-200 text-sm sm:leading-6"
                style={{ background: colors.attributes.tintedBackground, color: colors.attributes.indicator, borderColor: colors.attributes.border }}

              />
            </div>
          </div>



          <div>

            <label htmlFor="first-name" className="block dark:text-gray-200 text-sm font-semibold leading-6 dark:text-gray-200 text-gray-900"
              style={{ color: colors.attributes.indicator }}
            >
              Nombre de pièces max
            </label>
            <div className="mt-2.5">
              <input
                onChange={(e) => setFiltres({ ...filtres, nombrePieces: { value: e.target.value, operator: "$lte" } })}
                type="number"
                placeholder='0'
                min={9}
                max={1000}
                className="bg-gray-600/40  border-[1px] block w-full rounded-md border-0 px-3.5 py-2 dark:text-gray-200 text-gray-900 shadow-sm ring-inset ring-gray-300 placeholder:dark:text-gray-200 text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:dark:text-gray-200 text-sm sm:leading-6"
                style={{ background: colors.attributes.tintedBackground, color: colors.attributes.indicator, borderColor: colors.attributes.border }}

              />
            </div>
          </div>



        </div>
        }
      </div>
    </section>
  )
}

export default function AnnoncesContent({ annonces }: { annonces: AnnonceObject[] }) {
  const { colors } = useContext(AppContext)

  console.log(annonces)
  let [filteredAnnonces, setFilteredAnnonces] = useState<AnnonceObject[]>(annonces)

  let [filtres, setFiltres] = useState<{ [key: string]: { value: string | number, operator: string } }>({})
  console.log(filtres)

  useEffect(() => {

    async function fetchAnnonces() {
      console.log(filtres)
      let filterString = Object.keys(filtres).map((key) => filtres[key].value ? `filters[${key}][${filtres[key].operator}]=${filtres[key].value}` : "").join("&")
      console.log(filterString)
      let filteredAnnonces: ApiListResponse<AnnonceObject> = await call("/api/annonces?" + filterString, Method.get)
      setFilteredAnnonces(filteredAnnonces.data)
    }
    fetchAnnonces()
  }, [filtres])



  return (
    <SimpleLayoutWithTitleFooter
      title="Annonces Immobilières"
      footer={
        <FiltresAnnonces filtres={filtres} setFiltres={setFiltres} />}
    >
      <div className="md:border-l md:pl-6 " style={{ borderColor: colors.attributes.border }}>
        <div className="flex w-full flex-col space-y-16">
          {
            filteredAnnonces && filteredAnnonces.map((annonce) => {
              console.log(annonce)
              return (
                <ElementAnnonce key={annonce.id} annonceObject={annonce} />
              )
            })
          }
        </div>
      </div>
    </SimpleLayoutWithTitleFooter>
  )
}


export function AnnonceLines({ annonce }: { annonce: Annonce }) {
  const { colors } = useContext(AppContext)
  return (
    <>
      {
        annonce.transaction == TypeTransaction.location &&
        <>

          <div className='w-full flex items-center justify-between text-base font-bold'>
            <div>Loyer</div>
            <div className='text-right'>{currency(annonce.loyer)} {annonce.charges_incluses ? "cc" : ""} / {getAnnoncePeriodicite(annonce.loyer_periodicite)}</div>
          </div>

          {annonce.montant_charges != null &&
            <>
              <div className='w-full flex items-center justify-between'>
                <div>Charges</div>
                <div className='text-right'>{currency(annonce.montant_charges)} / an</div>
              </div>
            </>}


          {annonce.montant_etat_lieux != null &&
            <>
              <div className='w-full flex items-center justify-between'>
                <div>État des lieux</div>
                <div className='text-right'>{currency(annonce.montant_etat_lieux)}</div>
              </div>
            </>}

          {annonce.montant_depot_garantie != null &&
            <>
              <div className='w-full flex items-center justify-between'>
                <div >Dépot de garantie</div>
                <div className='text-right'>{currency(annonce.montant_depot_garantie)}</div>
              </div>
            </>}


        </>
      }


      {(annonce.transaction == TypeTransaction.vente_traditionnelle || annonce.transaction == TypeTransaction.vente_immo_interactif) &&
        <>
          <div className='w-full flex items-center justify-between text-base font-bold'>
            <div>Prix</div>
            <div className='text-right'>{currency(annonce.prix_hni)}</div>
          </div>

          {annonce.type_honoraires == TypeHonoraires.charge_acquereur &&
            <>
              <div className='w-full flex items-center justify-between  opacity-80'>
                <div className='pl-2 border-l'>Dont Prix de Vente</div>
                <div className='text-right'>{currency(annonce.prix_nv)}</div>
              </div>

              <div className='w-full flex items-center justify-between  opacity-80'>
                <div className='pl-2 border-l'>Dont HN*</div>
                <div className='text-right'>{currency(annonce.honoraires)} ({annonce.honoraires_pourcentage}%) </div>
              </div>
            </>}
        </>
      }


      {
        annonce.transaction == TypeTransaction.vente_viager &&
        <>
          <div className='w-full flex items-center justify-between text-base font-bold'>
            <div>Rente</div>
            <div className='text-right'>{currency(annonce.rente.montant)} / {getAnnoncePeriodicite(annonce.rente.periodicite)}</div>
          </div>

          {
            annonce.bouquet &&
            <>
              <div className='w-full flex items-center justify-between'>
                <div> Bouquet</div>
                <div className='text-right'>{currency(annonce.bouquet_hni)} </div>
              </div>

              {annonce.type_honoraires == TypeHonoraires.charge_acquereur &&
                <>
                  <div className='w-full flex items-center justify-between  opacity-80'>
                    <div className='pl-2 border-l'>Dont Prix Bouqet</div>
                    <div className='text-right'>{currency(annonce.bouquet_nv)} </div>
                  </div>

                  <div className='w-full flex items-center justify-between  opacity-80'>
                    <div className='pl-2 border-l'>Dont HN sur bouquet*</div>
                    <div className='text-right'>{currency(annonce.honoraires)} ({annonce.honoraires_pourcentage}%) </div>
                  </div>
                </>
              }
            </>
          }
          {
            annonce.charges_copropriete &&
            <>
              <div className='w-full flex items-center justify-between'>
                <div>Charges de copropriété</div>
                <div className='text-right'>{currency(annonce.charges_copropriete)} / an</div>
              </div>
            </>
          }

        </>
      }

    </>
  )
}