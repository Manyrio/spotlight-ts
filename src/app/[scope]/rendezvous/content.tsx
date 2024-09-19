'use client'

import { AppContext } from '@/app/providers'
import { Button } from '@/components/Button'
import { Container } from '@/components/Container'
import { SimpleLayout } from '@/components/SimpleLayout'
import { Member } from '@/models/members'
import { Steps } from '@/models/steps'
import { Method, call } from '@/scripts/api'
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { ChevronDownIcon, ChevronLeftIcon, ChevronRightIcon, EllipsisHorizontalIcon } from '@heroicons/react/20/solid'
import { EnvelopeIcon, PhoneIcon } from '@heroicons/react/24/outline'
import { useContext, useEffect, useRef, useState } from 'react'

function translateDayToFrench(day: string): string {
  const daysInFrench: { [key: string]: string } = {
    Sunday: 'Dimanche',
    Monday: 'Lundi',
    Tuesday: 'Mardi',
    Wednesday: 'Mercredi',
    Thursday: 'Jeudi',
    Friday: 'Vendredi',
    Saturday: 'Samedi'
  };

  return daysInFrench[day] || day; // Fallback to the original day name if it's not found
}



export default function RendezvousContent({ members, steps, currentMonthSlots, nextMonthSlots }: { members: Member[], steps: Steps, currentMonthSlots: ReservationMap, nextMonthSlots: ReservationMap }) {

  let [currentStep, setCurrentStep] = useState<number>(1)

  let [openedCase, setOpenedCase] = useState<boolean>(false)
  let [subject, setSubject] = useState<string>("")
  let [slot, setSlot] = useState<{ date: string, slot: Slot }>()
  let [hasContact, setHasContact] = useState<boolean>(false)
  let [contact, setContact] = useState<Member>()
  let [loader, setLoader] = useState(false)
  let [response, setResponse] = useState("")

  let [stepResponses, setStepReponses] = useState<any>({})

  let [name, setName] = useState('')
  let [lastName, setLastName] = useState('')
  let [email, setEmail] = useState('')
  let [phone, setPhone] = useState('')

  let { colors, etude } = useContext(AppContext)

  //   useEffect(() => {
  //     // Set the container scroll position based on the current time.
  //     const currentMinute = new Date().getHours() * 60
  //     container.current.scrollTop =
  //       ((container.current.scrollHeight - containerNav.current.offsetHeight - containerOffset.current.offsetHeight) *
  //         currentMinute) /
  //       1440
  //   }, [])

  const maxSteps = steps.attributes.steps.length + 4 //one final and three initial step

  useEffect(() => {
    if ((currentStep == maxSteps - 2) && !hasContact) setCurrentStep(currentStep - 1)
  }, [currentStep])

  useEffect(() => {
    if (slot) setCurrentStep(currentStep + 1)
  }, [slot])
  console.log(slot)

  async function submit(e: any) {
    e.preventDefault()
    if (loader) return
    setLoader(true)
    try {
      await call("/api/contact", Method.post, {
        message: `Nouvelle demande de rendez-vous concernant avec ${contact ? contact.attributes.name : "n'importe quel membre de l'équipe."} 
        <br/>
        <br/>
        Date de rendez-vous: <br/><br/>

        Réponses aux questions:<br/><br/>
        ${Object.keys(stepResponses).map((key) => {
          return `${key}:<br/>${stepResponses[key]}`
        }).join("<br/><br/>")}
      <br/><br/><br/>
        Tél: ${phone}<br/>
        Email: ${email}<br/>
        Nom: ${name}<br/>
        Prénom: ${lastName}

        `,
        email: email
      })

    } catch (error) {
      setResponse("Erreur lors de l'envoi")

    } finally {
      setLoader(false)
    }
    setResponse("Demande envoyée avec succès ! Nous vons recontacterons dans les plus brefs délais.")
    setEmail("")
    setPhone("")
    setName("")
    setLastName("")

  }
  console.log("maxSteps", maxSteps)
  console.log("currentStep", currentStep)

  return (

    <SimpleLayout
      title='Prendre un rendez-vous'
      intro='Parcourez notre calendrier et prenez rendez-vous pour une consultation ou un entretien.'
    >

      <div className='flex items-center w-full justify-center md:justify-start'>
        <div className=' p-8 flex justify-center flex-col w-fit rounded-md shadow-md w-full max-w-[100%] lg:max-w-[50%] '
          style={{ backgroundColor: colors.attributes.tintedBackground, color: colors.attributes.accent }}>

          {currentStep != 1 && <span className='border-[1px] text-xs flex items-center cursor-pointer w-fit rounded-md px-2 mb-4'
            style={{ color: colors.attributes.hint, borderColor: colors.attributes.border }}
            onClick={() => { currentStep != 1 ? setCurrentStep(currentStep - 1) : null }}
          >
            <ChevronLeftIcon style={{ color: colors.attributes.hint }} className='h-4 w-4 mr-1' />
            Étape précédente</span>}


          {currentStep == 1 && <>

            <span
            >Avez-vous déjà un dossier ouvert</span>

            <div className='flex w-full flex-col gap-2 items-center mt-6'>

              <Button className='w-full' onClick={() => { setOpenedCase(true); setCurrentStep(currentStep + 1) }} style={{ background: colors.attributes.primary }}>Oui</Button>
              <Button className='w-full' onClick={() => { setOpenedCase(false); setCurrentStep(currentStep + 1) }} style={{ background: colors.attributes.primary }}>Non</Button>

            </div>


          </>

          }

          {(currentStep == 2 && openedCase) ?
            <>
              <span>{steps.attributes.contact.title}</span>
              <span className='text-sm mt-2'
                style={{ color: colors.attributes.indicator }}
              >{steps.attributes.contact.description}</span>

              <div className=" mt-9 dark:text-gray-200 text-base leading-7 gap-8 flex flex-col ">



                {etude.attributes.address && (
                  <div>
                    <h3 className="border-l border-indigo-600 pl-6 font-semibold dark:text-gray-200 text-gray-900"
                      style={{ color: colors.attributes.accent, borderColor: colors.attributes.primary }}

                    >{etude.attributes.name}</h3>
                    <address className="border-l border-gray-200 pl-6 pt-2 not-italic dark:text-gray-200 text-gray-600"
                      style={{ color: colors.attributes.hint, borderColor: colors.attributes.border }}
                    >
                      <p className='flex items-center'> <EnvelopeIcon className='h-4 w-4 mr-2'></EnvelopeIcon>{etude.attributes.email}</p>
                      <p className='flex items-center'> <PhoneIcon className='h-4 w-4 mr-2'></PhoneIcon>{etude.attributes.phone}</p>
                    </address>
                  </div>
                )}



              </div>
            </>
            :
            <>
              {(currentStep != 1 && currentStep < maxSteps - 3) &&
                <>
                  <span>{steps.attributes.steps[currentStep - 2].question}</span>

                  <div className='flex w-full flex-col gap-2 items-center mt-6'>

                    {steps.attributes.steps[currentStep - 2].responses.map((response, index) => {
                      return <Button className='w-full' onClick={() => {
                        var newStepResponses = { ...stepResponses };
                        newStepResponses[steps.attributes.steps[currentStep - 2].question] = response.response
                        setStepReponses(newStepResponses);
                        setCurrentStep(currentStep + 1)
                      }}
                        style={{ background: colors.attributes.primary }}>{response.response}</Button>
                    }
                    )}
                  </div>
                </>
              }
            </>
          }






          {(currentStep == maxSteps - 3 && !openedCase) && <>

            <span>Avez-vous déjà un contact au sein de notre office ?</span>

            <div className='flex w-full flex-col gap-2 items-center mt-6'>
              <Button className='w-full' onClick={() => { setHasContact(true); setCurrentStep(currentStep + 1) }} style={{ background: colors.attributes.primary }}>Oui</Button>
              <Button className='w-full' onClick={() => { setHasContact(false); setCurrentStep(currentStep + 2) }} style={{ background: colors.attributes.primary }}>Non</Button>

            </div>
          </>
          }



          {
            currentStep == maxSteps - 2 && <>

              <span>Sélection du contact</span>

              <ul role="list" className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-6"
              >




                {members.map((member, index: number) => {
                  let allowed = false
                  member.attributes.etudes.data.forEach(element => {
                    console.log(element.attributes.slug)

                    if (element.attributes.slug == etude.attributes.slug) allowed = true
                  });

                  if (!allowed) return


                  return (
                    <li onClick={() => { setContact(member); setCurrentStep(currentStep + 1) }} key={member.attributes.name} className=' hover:brightness-[110%] transition-all border truncate p-4 rounded-md cursor-pointer  flex items-start flex-col  align-top '
                      style={{ borderColor: colors.attributes.border, backgroundColor: colors.attributes.tintedBackground }}
                    >
                      <img className="h-14 w-14 rounded-full object-cover object-top" src={"https://admin.laube-lhomme-caulnes.notaires.fr" + (member.attributes.image.data ? member.attributes.image.data[0].attributes.url : "")} alt="" />
                      <h3 className="mt-4 w-full truncate  text-sm text-left font-semibold leading-4 tracking-tight  text-gray-900" style={{ color: colors.attributes.indicator }}>{member.attributes.name}</h3>
                      <p className=" text-xs w-full truncate leading-6 text-left  text-gray-600" style={{ color: colors.attributes.hint }}>{member.attributes.role}</p>
                    </li>
                  )
                })}

              </ul>

            </>
          }

          {
            currentStep == maxSteps - 1 && (
              <>
                <div className="grid w-full grid-cols-2  gap-4 mt-4">

                  {/* Calendar slots */}
                  <Calendar reservationMap={currentMonthSlots} setSlot={setSlot}></Calendar>
                </div>
                <div className='h-[1px] w-full my-8 '
                  style={{ background: colors.attributes.divider }}
                ></div>
                <div className="grid w-full grid-cols-2 gap-4">

                  {/* Calendar slots */}
                  <Calendar reservationMap={nextMonthSlots} setSlot={setSlot}></Calendar>
                </div>
              </>
            )
          }



          {
            currentStep == maxSteps && <>

              <span>Quelques informations pour terminer...</span>


              <form action="#" method="POST" className="lg:flex-auto mt-6" onSubmit={(e) => submit(e)}
              >
                <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
                  <div>
                    <label htmlFor="first-name" className="block dark:text-gray-200 text-sm font-semibold leading-6 dark:text-gray-200 text-gray-900"
                      style={{ color: colors.attributes.indicator }}
                    >
                      Prénom
                    </label>
                    <div className="mt-2.5">
                      <input
                        required
                        onChange={(e) => setName(e.target.value)}
                        value={name}
                        type="text"
                        name="first-name"
                        id="first-name"
                        autoComplete="given-name"
                        className="bg-gray-600/40 border-[1px]  block w-full rounded-md border-0 px-3.5 py-2 dark:text-gray-200 text-gray-900 shadow-sm ring-inset ring-gray-300 placeholder:dark:text-gray-200 text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:dark:text-gray-200 text-sm sm:leading-6"
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
                        required
                        onChange={(e) => setLastName(e.target.value)}
                        value={lastName}
                        type="text"
                        name="last-name"
                        id="last-name"
                        autoComplete="family-name"
                        className="bg-gray-600/40 border-[1px]  block w-full rounded-md border-0 px-3.5 py-2 dark:text-gray-200 text-gray-900 shadow-sm ring-inset ring-gray-300 placeholder:dark:text-gray-200 text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:dark:text-gray-200 text-sm sm:leading-6"
                        style={{ background: colors.attributes.tintedBackground, color: colors.attributes.indicator, borderColor: colors.attributes.border }}

                      />
                    </div>
                  </div>


                  <div className="sm:col-span-2 ">
                    <div >
                      <label htmlFor="budget" className="block dark:text-gray-200 text-sm font-semibold leading-6 dark:text-gray-200 text-gray-900"
                        style={{ color: colors.attributes.indicator }}

                      >
                        Adresse e-mail
                      </label>
                      <div className="mt-2.5">
                        <input
                          required
                          onChange={(e) => setEmail(e.target.value)}
                          value={email}
                          id="email"
                          name="email"
                          type="email"
                          className="bg-gray-600/40 border-[1px]  block w-full rounded-md border-0 px-3.5 py-2 dark:text-gray-200 text-gray-900 shadow-sm  ring-inset ring-gray-300 placeholder:dark:text-gray-200 text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:dark:text-gray-200 text-sm sm:leading-6"

                          style={{ background: colors.attributes.tintedBackground, color: colors.attributes.indicator, borderColor: colors.attributes.border }}

                        />
                      </div>
                    </div>


                  </div>




                  <div className="sm:col-span-2 ">
                    <div className='mb-6'>
                      <label htmlFor="budget" className="block dark:text-gray-200 text-sm font-semibold leading-6 dark:text-gray-200 text-gray-900"
                        style={{ color: colors.attributes.indicator }}

                      >
                        Numéro de téléphone
                      </label>
                      <div className="mt-2.5">
                        <input
                          required
                          onChange={(e) => setPhone(e.target.value)}
                          value={phone}
                          id="phone"
                          name="phone"
                          type="phone"
                          className="bg-gray-600/40 border-[1px]  block w-full rounded-md border-0 px-3.5 py-2 dark:text-gray-200 text-gray-900 shadow-sm  ring-inset ring-gray-300 placeholder:dark:text-gray-200 text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:dark:text-gray-200 text-sm sm:leading-6"

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
                    Envoyer la demande de rendez-vous
                  </Button>
                  {response ? <div style={{ color: colors.attributes.indicator }} className='mt-2'>{response}</div> : ""}
                </div>
                <p className="mt-4 dark:text-gray-200 text-sm leading-6 dark:text-gray-200 text-gray-500"
                  style={{ color: colors.attributes.hint }}
                >
                  En nous contactant, vous acceptez la{' '}
                  <a href="#" className="font-semibold dark:text-gray-200 text-indigo-600"
                    style={{ color: colors.attributes.primary }}

                  >
                    politique de confidentialité
                  </a>
                  .
                </p>
              </form>




            </>
          }



        </div >

      </div>

      {/* <div className="flex h-full flex-col ">
        <header className="flex flex-none items-center justify-between border-b border-gray-200 px-6 py-4">
          <h1 className="text-base font-semibold leading-6 text-gray-900">
            <time dateTime="2022-01">Juillet 2024</time>
          </h1>
          <div className="flex items-center">
            <div className="relative flex items-center rounded-md bg-white shadow-sm md:items-stretch">
              <button
                type="button"
                className="flex h-9 w-12 items-center justify-center rounded-l-md border-y border-l border-gray-300 pr-1 text-gray-400 hover:text-gray-500 focus:relative md:w-9 md:pr-0 md:hover:bg-gray-50"
              >
                <span className="sr-only">Semaine précédente</span>
                <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
              </button>
              <button
                type="button"
                className="hidden border-y border-gray-300 px-3.5 text-sm font-semibold text-gray-900 hover:bg-gray-50 focus:relative md:block"
              >
                Aujourd'hui
              </button>
              <span className="relative -mx-px h-5 w-px bg-gray-300 md:hidden" />
              <button
                type="button"
                className="flex h-9 w-12 items-center justify-center rounded-r-md border-y border-r border-gray-300 pl-1 text-gray-400 hover:text-gray-500 focus:relative md:w-9 md:pl-0 md:hover:bg-gray-50"
              >
                <span className="sr-only">Semaine suivante</span>
                <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
            <div className="ml-6 h-6 w-px bg-gray-300" />
            <div className="hidden md:flex md:items-center">
              <button
                type="button"
                className="ml-6 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Prendre un rendez-vous
              </button>
            </div>
            <Menu as="div" className="relative ml-6 md:hidden">
              <MenuButton className="-mx-2 flex items-center rounded-full border border-transparent p-2 text-gray-400 hover:text-gray-500">
                <span className="sr-only">Open menu</span>
                <EllipsisHorizontalIcon className="h-5 w-5" aria-hidden="true" />
              </MenuButton>

              <MenuItems
                className="absolute right-0 z-10 mt-3 w-36 origin-top-right divide-y divide-gray-100 overflow-hidden rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
              >
                <div className="py-1">
                  <MenuItem>
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900"
                    >
                      Create event
                    </a>
                  </MenuItem>
                </div>
                <div className="py-1">
                  <MenuItem>
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900"
                    >
                      Go to today
                    </a>
                  </MenuItem>
                </div>
                <div className="py-1">
                  <MenuItem>
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900"
                    >
                      Day view
                    </a>
                  </MenuItem>
                  <MenuItem>
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900"
                    >
                      Week view
                    </a>
                  </MenuItem>
                  <MenuItem>
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900"
                    >
                      Month view
                    </a>
                  </MenuItem>
                  <MenuItem>
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900"
                    >
                      Year view
                    </a>
                  </MenuItem>
                </div>
              </MenuItems>
            </Menu>
          </div>
        </header>
        <div ref={container} className="isolate flex flex-auto flex-col overflow-auto bg-white">
          <div style={{ width: '165%' }} className="flex max-w-full flex-none flex-col sm:max-w-none md:max-w-full">
            <div
              ref={containerNav}
              className="sticky top-0 z-30 flex-none bg-white shadow ring-1 ring-black ring-opacity-5 sm:pr-8"
            >
              <div className="grid grid-cols-7 text-sm leading-6 text-gray-500 sm:hidden">
                <button type="button" className="flex flex-col items-center pb-3 pt-2">
                  M <span className="mt-1 flex h-8 w-8 items-center justify-center font-semibold text-gray-900">10</span>
                </button>
                <button type="button" className="flex flex-col items-center pb-3 pt-2">
                  T <span className="mt-1 flex h-8 w-8 items-center justify-center font-semibold text-gray-900">11</span>
                </button>
                <button type="button" className="flex flex-col items-center pb-3 pt-2">
                  W{' '}
                  <span className="mt-1 flex h-8 w-8 items-center justify-center rounded-full bg-indigo-600 font-semibold text-white">
                    12
                  </span>
                </button>
                <button type="button" className="flex flex-col items-center pb-3 pt-2">
                  T <span className="mt-1 flex h-8 w-8 items-center justify-center font-semibold text-gray-900">13</span>
                </button>
                <button type="button" className="flex flex-col items-center pb-3 pt-2">
                  F <span className="mt-1 flex h-8 w-8 items-center justify-center font-semibold text-gray-900">14</span>
                </button>
                <button type="button" className="flex flex-col items-center pb-3 pt-2">
                  S <span className="mt-1 flex h-8 w-8 items-center justify-center font-semibold text-gray-900">15</span>
                </button>
                <button type="button" className="flex flex-col items-center pb-3 pt-2">
                  S <span className="mt-1 flex h-8 w-8 items-center justify-center font-semibold text-gray-900">16</span>
                </button>
              </div>

              <div className="-mr-px hidden grid-cols-7 divide-x divide-gray-100 border-r border-gray-100 text-sm leading-6 text-gray-500 sm:grid">
                <div className="col-end-1 w-14" />
                <div className="flex items-center justify-center py-3">
                  <span>
                    Lun <span className="items-center justify-center font-semibold text-gray-900">10</span>
                  </span>
                </div>
                <div className="flex items-center justify-center py-3">
                  <span>
                    Mar <span className="items-center justify-center font-semibold text-gray-900">11</span>
                  </span>
                </div>
                <div className="flex items-center justify-center py-3">
                  <span className="flex items-baseline">
                    Mer{' '}
                    <span className="ml-1.5 flex h-8 w-8 items-center justify-center rounded-full bg-indigo-600 font-semibold text-white">
                      12
                    </span>
                  </span>
                </div>
                <div className="flex items-center justify-center py-3">
                  <span>
                    Jeu <span className="items-center justify-center font-semibold text-gray-900">13</span>
                  </span>
                </div>
                <div className="flex items-center justify-center py-3">
                  <span>
                    Ven <span className="items-center justify-center font-semibold text-gray-900">14</span>
                  </span>
                </div>
                <div className="flex items-center justify-center py-3">
                  <span>
                    Sam <span className="items-center justify-center font-semibold text-gray-900">15</span>
                  </span>
                </div>
                <div className="flex items-center justify-center py-3">
                  <span>
                    Dim <span className="items-center justify-center font-semibold text-gray-900">16</span>
                  </span>
                </div>
              </div>
            </div>
            <div className="flex flex-auto">
              <div className="sticky left-0 z-10 w-14 flex-none bg-white ring-1 ring-gray-100" />
              <div className="grid flex-auto grid-cols-1 grid-rows-1">
                <div
                  className="col-start-1 col-end-2 row-start-1 grid divide-y divide-gray-100"
                  style={{ gridTemplateRows: 'repeat(48, minmax(3.5rem, 1fr))' }}
                >
                  <div className="mt-14" />
                  <div>
                    <div className="sticky left-0 z-20 -ml-14 -mt-2.5 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
                      9AM
                    </div>
                  </div>
                  <div />
                  <div>
                    <div className="sticky left-0 z-20 -ml-14 -mt-2.5 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
                      10AM
                    </div>
                  </div>
                  <div />
                  <div>
                    <div className="sticky left-0 z-20 -ml-14 -mt-2.5 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
                      11AM
                    </div>
                  </div>
                  <div />
                  <div>
                    <div className="sticky left-0 z-20 -ml-14 -mt-2.5 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
                      12PM
                    </div>
                  </div>
                  <div />
                  <div>
                    <div className="sticky left-0 z-20 -ml-14 -mt-2.5 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
                      1PM
                    </div>
                  </div>
                  <div />
                  <div>
                    <div className="sticky left-0 z-20 -ml-14 -mt-2.5 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
                      2PM
                    </div>
                  </div>
                  <div />
                  <div>
                    <div className="sticky left-0 z-20 -ml-14 -mt-2.5 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
                      3PM
                    </div>
                  </div>
                  <div />
                  <div>
                    <div className="sticky left-0 z-20 -ml-14 -mt-2.5 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
                      4PM
                    </div>
                  </div>
                  <div />
                  <div>
                    <div className="sticky left-0 z-20 -ml-14 -mt-2.5 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
                      5PM
                    </div>
                  </div>
                  <div />
                  <div>
                    <div className="sticky left-0 z-20 -ml-14 -mt-2.5 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
                      6PM
                    </div>
                  </div>
                  <div />
                </div>

                <div className="col-start-1 col-end-2 row-start-1 hidden grid-cols-7 grid-rows-1 divide-x divide-gray-100 sm:grid sm:grid-cols-7">
                  <div className="col-start-1 row-span-full" />
                  <div className="col-start-2 row-span-full" />
                  <div className="col-start-3 row-span-full" />
                  <div className="col-start-4 row-span-full" />
                  <div className="col-start-5 row-span-full" />
                  <div className="col-start-6 row-span-full" />
                  <div className="col-start-7 row-span-full" />
                  <div className="col-start-8 row-span-full w-8" />
                </div>

                <ol
                  className="col-start-1 col-end-2 row-start-1 grid grid-cols-1 sm:grid-cols-7 sm:pr-8"
                  style={{ gridTemplateRows: '0rem repeat(288, minmax(0, 1fr)) auto' }}
                >
                  <li className="relative flex sm:col-start-1" style={{ gridRow: '74 / span 12' }}>
                    <div
                      className="group absolute inset-0 flex flex-col overflow-y-auto bg-gray-100 p-2"
                    />
                  </li>
                </ol>

                <ol
                  className="col-start-1 col-end-2 row-start-1 grid grid-cols-1 sm:grid-cols-7 sm:pr-8"
                  style={{ gridTemplateRows: '1.75rem repeat(288, minmax(0, 1fr)) auto' }}
                >
                  <li className="relative mt-px flex sm:col-start-3" style={{ gridRow: '92 / span 30' }}>
                    <a
                      href="#"
                      className="group absolute inset-1 flex flex-col overflow-y-auto rounded-lg bg-pink-50 p-2 text-xs leading-5 hover:bg-pink-100"
                    >
                      <p className="order-1 font-semibold text-pink-700">Flight to Paris</p>
                      <p className="text-pink-500 group-hover:text-pink-700">
                        <time dateTime="2022-01-12T07:30">7:30 AM</time>
                      </p>
                    </a>
                  </li>
                  <li className="relative mt-px hidden sm:col-start-6 sm:flex" style={{ gridRow: '122 / span 24' }}>
                    <a
                      href="#"
                      className="group absolute inset-1 flex flex-col overflow-y-auto rounded-lg bg-gray-100 p-2 text-xs leading-5 hover:bg-gray-200"
                    >
                      <p className="order-1 font-semibold text-gray-700">Meeting with design team at Disney</p>
                      <p className="text-gray-500 group-hover:text-gray-700">
                        <time dateTime="2022-01-15T10:00">10:00 AM</time>
                      </p>
                    </a>
                  </li>
                </ol>
              </div>
            </div>
          </div>
        </div>
      </div> */}


    </SimpleLayout >

  )
}



function Calendar({ reservationMap, setSlot }: { reservationMap: ReservationMap, setSlot: (value: { date: string, slot: Slot }) => void }) {

  let { colors } = useContext(AppContext)

  return <>
    {Object.keys(reservationMap).map((key) => {
      const reservationDay = reservationMap[key];
      const { day, date, slots } = reservationDay;
      const currentDate = new Date();
      const reservationDate = new Date(date);
      if (!slots) return null
      // Only show future or current days
      if (reservationDate >= currentDate) {
        return (
          <div key={key} className="border p-3 rounded-lg text-center "
            style={{ borderColor: colors.attributes.border }}
          >
            {/* Display the day and date */}
            <div className="font-semibold">{translateDayToFrench(day)} {reservationDate.toLocaleDateString('fr-FR', { month: 'short', day: 'numeric' })}</div>

            {/* Display time slots */}
            <div className="mt-2 grid grid-cols-3 gap-2">
              {slots.map((slot, index) => (
                <div
                  onClick={() => setSlot({
                    date: date,
                    slot: slot
                  })}
                  key={index}
                  className={`p-1 py-2  font-semibold text-sm rounded-lg cursor-pointer hover:brightness-[90%] ${slot.available ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'
                    }`}
                >
                  {slot.time}
                </div>
              ))}
            </div>
          </div>
        );
      }
      return null; // Do not render past days
    })}
  </>
}