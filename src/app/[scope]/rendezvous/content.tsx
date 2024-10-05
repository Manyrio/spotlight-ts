'use client'

import { AppContext, NotificationColor } from '@/app/providers'
import { Button } from '@/components/Button'
import { Container } from '@/components/Container'
import { SimpleLayout } from '@/components/SimpleLayout'
import { Member } from '@/models/members'
import { Steps } from '@/models/steps'
import { Method, call } from '@/scripts/api'
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { ChevronDownIcon, ChevronLeftIcon, ChevronRightIcon, EllipsisHorizontalIcon } from '@heroicons/react/20/solid'
import { EnvelopeIcon, PhoneIcon } from '@heroicons/react/24/outline'
import { RiErrorWarningLine } from '@remixicon/react'
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


function slotToDateTime(slot: { date: string, slot: Slot }): Date {
  const date = slot.date;
  const time = slot.slot.time;

  // Extract the date part (YYYY-MM-DD) from the date string
  const dateOnly = date.split('T')[0];

  // Combine the date with the provided time
  const combinedDateTime = `${dateOnly}T${time}:00+02:00`;

  // Create the Date object
  const dateTime = new Date(combinedDateTime);

  return dateTime

}





export default function RendezvousContent({ members, steps, currentMonthSlots, nextMonthSlots }: { members: Member[], steps: Steps, currentMonthSlots: ReservationMap, nextMonthSlots: ReservationMap }) {


  let [openedCase, setOpenedCase] = useState<boolean>(false)
  let [slot, setSlot] = useState<{ date: string, slot: Slot }>()
  let [hasContact, setHasContact] = useState<boolean>(false)
  let [contact, setContact] = useState<Member>()
  let [loader, setLoader] = useState(false)

  let [stepResponses, setStepReponses] = useState<any>({})

  let [name, setName] = useState('')
  let [lastName, setLastName] = useState('')
  let [email, setEmail] = useState('')
  let [phone, setPhone] = useState('')

  let { colors, etude, addNotification } = useContext(AppContext)


  function getStepIndex(currentStep: Steps["attributes"]["steps"][0]): number {
    const currentStepIndex = formattedSteps.findIndex(step => step.id === currentStep.id);
    return currentStepIndex;
  }


  let firstSteps = [
    {
      id: "openedCase",
      question: "Avez-vous déjà un dossier ouvert ?",
      responses: [
        { response: "Oui" },
        { response: "Non" }
      ]
    },
    {
      id: "alreadyOpenedCase",
      question: "",
      responses: []
    }
  ]

  let standardSteps = steps.attributes.steps

  let lastSteps = [
    {
      id: "contact",
      question: "",
      responses: []
    },
    {
      id: "contactSelection",
      question: "",
      responses: []
    },
    {
      id: "slotSelection",
      question: "",
      responses: []
    },
    {
      id: "form",
      question: "",
      responses: []
    }
  ]


  let formattedSteps = [...firstSteps, ...standardSteps, ...lastSteps]

  let [currentStep, setCurrentStep] = useState<Steps["attributes"]["steps"][0]>(formattedSteps[0])


  useEffect(() => {
    if (currentStep) {
      if (currentStep.id == "contactSelection" && !hasContact) setCurrentStep(formattedSteps.find(step => step.id == "contact")!)
      if (currentStep.id == "alreadyOpenedCase" && !openedCase) setCurrentStep(formattedSteps[0])
    }
  }, [currentStep])

  useEffect(() => {
    if (slot) setCurrentStep(formattedSteps.find(step => step.id == "form")!)
  }, [slot])

  async function submit(e: any) {
    e.preventDefault()
    if (loader) return
    setLoader(true)
    try {
      let data: any = {
        clientFirstName: name,
        clientLastName: lastName,
        message: `
          ${Object.keys(stepResponses).map((key) => {
          return `${stepResponses[key].question}: ${stepResponses[key].response}`
        }).join("\n")}`,
        clientEmail: email,
        clientPhone: phone,
        date: slotToDateTime(slot!),
      }


      if (contact) data.membres_de_l_equipe = { disconnect: [], connect: [{ id: contact?.id, position: { end: true } }] }

      await call(`/api/${etude.attributes.slug}/reservations`, Method.post, data)
    } catch (error) {
      addNotification({ message: "Erreur lors de l'envoi", color: NotificationColor.red, title: "Erreur", Icon: RiErrorWarningLine })
      setLoader(false)
      return
    } finally {
      setLoader(false)
    }

    addNotification({ title: "Message envoyé avec succès ! ", message: "Nous reviendrons vers vous dans les plus brefs délais.", color: NotificationColor.green })

    setEmail("")
    setPhone("")
    setName("")
    setLastName("")

  }

  if (!currentStep) return <></>

  let currentIndex = getStepIndex(currentStep)


  return (

    <Container className="mt-32 sm:mt-64 min-h-screen">
      <header className="mx-auto text-left sm:text-center">
        <h1 className="dark:text-gray-200 text-4xl font-bold tracking-tight dark:text-gray-200 text-zinc-800 sm:dark:text-gray-200 text-5xl dark:dark:text-gray-200 text-zinc-100"
          style={{ color: colors.attributes.accent }}
        >
          Prendre un rendez-vous
        </h1>
        <p className="mt-6 dark:text-gray-200 text-base dark:text-gray-200 text-zinc-600 dark:dark:text-gray-200 text-zinc-400"
          style={{ color: colors.attributes.indicator }}
        >
          Parcourez notre calendrier et prenez rendez-vous pour une consultation ou un entretien.
        </p>
      </header>
      <div className="mt-16 sm:mt-20 mx-auto">


        <div className='flex items-center w-full justify-center'>
          <div className=' p-8 flex justify-center flex-col w-fit rounded-md shadow-md w-full max-w-[100%] lg:max-w-[50%] '
            style={{ backgroundColor: colors.attributes.tintedBackground, color: colors.attributes.accent }}>

            {currentStep.id != formattedSteps[0].id && <span className='border-[1px] text-xs flex items-center cursor-pointer w-fit rounded-md px-2 mb-4'
              style={{ color: colors.attributes.hint, borderColor: colors.attributes.border }}
              onClick={() => { currentIndex != 0 ? setCurrentStep(formattedSteps[currentIndex - 1]) : null }}
            >
              <ChevronLeftIcon style={{ color: colors.attributes.hint }} className='h-4 w-4 mr-1' />
              Étape précédente</span>}


            {currentStep.id == "openedCase" && <>

              <span
              >{currentStep.question}</span>

              <div className='flex w-full flex-col gap-2 items-center mt-6'>

                <Button className='w-full' onClick={() => { setOpenedCase(true); setCurrentStep(formattedSteps[currentIndex + 1]) }} style={{ background: colors.attributes.primary }}>Oui</Button>
                <Button className='w-full' onClick={() => { setOpenedCase(false); setCurrentStep(formattedSteps[currentIndex + 2]) }} style={{ background: colors.attributes.primary }}>Non</Button>

              </div>


            </>

            }

            {(currentStep.id == "alreadyOpenedCase" && openedCase) &&
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
            }

            {standardSteps.map((step, index) => {

              if (currentStep.id != step.id) return <></>

              return <>
                <span>{currentStep.question}</span>

                <div className='flex w-full flex-col gap-2 items-center mt-6'>

                  {currentStep.responses.map((response, index) => {
                    return <Button className='w-full' onClick={() => {
                      var newStepResponses = { ...stepResponses };
                      newStepResponses[currentStep.id] = { question: currentStep.question, response: response.response }
                      setStepReponses(newStepResponses);
                      setCurrentStep(formattedSteps[currentIndex + 1])
                    }}
                      style={{ background: colors.attributes.primary }}>{response.response}</Button>
                  }
                  )}
                </div>
              </>
            })
            }





            {(currentStep.id == "contact") && <>

              <span>Avez-vous déjà un contact au sein de notre office ?</span>

              <div className='flex w-full flex-col gap-2 items-center mt-6'>
                <Button className='w-full' onClick={() => { setHasContact(true); setCurrentStep(formattedSteps[currentIndex + 1]) }} style={{ background: colors.attributes.primary }}>Oui</Button>
                <Button className='w-full' onClick={() => { setHasContact(false); setCurrentStep(formattedSteps[currentIndex + 2]) }} style={{ background: colors.attributes.primary }}>Non</Button>

              </div>
            </>
            }


            {(currentStep.id == "contactSelection") && <>


              <span>Sélection du contact</span>

              <ul role="list" className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-6"
              >




                {members.map((member, index: number) => {
                  let allowed = false
                  member.attributes.etudes.data.forEach(element => {
                    if (element.attributes.slug == etude.attributes.slug) allowed = true
                  });

                  if (!allowed) return


                  return (
                    <li onClick={() => { setContact(member); setCurrentStep(formattedSteps[currentIndex + 1]) }} key={member.attributes.name} className=' hover:brightness-[110%] transition-all border truncate p-4 rounded-md cursor-pointer  flex items-start flex-col  align-top '
                      style={{ borderColor: colors.attributes.border, backgroundColor: colors.attributes.tintedBackground }}
                    >
                      <img className="h-14 w-14 rounded-full object-cover object-top" src={process.env.NEXT_PUBLIC_BACKEND_URL + (member.attributes.image.data ? member.attributes.image.data[0].attributes.url : "")} alt="" />
                      <h3 className="mt-4 w-full truncate  text-sm text-left font-semibold leading-4 tracking-tight  text-gray-900" style={{ color: colors.attributes.indicator }}>{member.attributes.name}</h3>
                      <p className=" text-xs w-full truncate leading-6 text-left  text-gray-600" style={{ color: colors.attributes.hint }}>{member.attributes.role}</p>
                    </li>
                  )
                })}

              </ul>

            </>
            }

            {(currentStep.id == "slotSelection") && <>

              <div className="grid w-full grid-cols-1 md:grid-cols-2  gap-4 mt-4">

                {/* Calendar slots */}
                <Calendar reservationMap={currentMonthSlots} setSlot={setSlot}></Calendar>
              </div>
              <div className='h-[1px] w-full my-8 '
                style={{ background: colors.attributes.divider }}
              ></div>
              <div className="grid w-full  grid-cols-1  md:grid-cols-2 gap-4">

                {/* Calendar slots */}
                <Calendar reservationMap={nextMonthSlots} setSlot={setSlot}></Calendar>
              </div>
            </>
            }


            {(currentStep.id == "form") && <>


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
      </div>


    </Container>


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
                  onClick={() => {
                    slot.available ? setSlot({
                      date: date,
                      slot: slot
                    }) : null
                  }}
                  key={index}
                  className={`p-1 py-2  font-semibold text-sm rounded-lg cursor-pointer  ${slot.available ? 'bg-green-200 text-green-800 hover:brightness-[90%]' : 'bg-red-200 text-red-800'
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
