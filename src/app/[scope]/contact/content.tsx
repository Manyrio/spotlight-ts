"use client"

import { SimpleLayout } from '@/components/SimpleLayout'
import { Button } from '@/components/Button'
import { EnvelopeIcon, PhoneIcon } from '@heroicons/react/24/outline'
import { useContext, useEffect, useState } from 'react'
import { AppContext, NotificationColor } from '@/app/providers'
import { Method, call } from '@/scripts/api'
import { Notification } from '@/components/Notification'
import { RiErrorWarningLine } from '@remixicon/react'


export default function ContactContent() {

  let { etude, colors, addNotification } = useContext(AppContext)

  let [name, setName] = useState('')
  let [lastName, setLastName] = useState('')
  let [message, setMessage] = useState('')
  let [email, setEmail] = useState('')
  let [loader, setLoader] = useState(false)


  async function submit(e: any) {
    e.preventDefault()
    if (loader) return
    setLoader(true)
    try {
      await call("/api/contact", Method.post, { etude: etude, message: message, email: email, name: name, lastName: lastName })

    } catch (error) {
      addNotification({ message: "Erreur lors de l'envoi", color: NotificationColor.red, title: "Erreur", Icon: RiErrorWarningLine })
      setLoader(false)
      return
    } finally {
      setLoader(false)
    }
    addNotification({ title: "Message envoyé avec succès ! ", message: "Nous reviendrons vers vous dans les plus brefs délais.", color: NotificationColor.green })
    setName("")
    setLastName("")
    setMessage("")
    setEmail("")
  }


  return (


    <>

      <SimpleLayout
        title="Contactez-nous"
        intro="Nous sommes à votre disposition pour répondre à vos questions.">



        <div className="-mt-6 flex flex-col gap-8 sm:gap-y-20 lg:flex-row">
          <form action="#" method="POST" className="lg:flex-auto max-w-2xl" onSubmit={(e) => submit(e)}


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
                    onChange={(e) => setName(e.target.value)}
                    value={name}
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
                    className="bg-gray-600/40 border-[1px] block w-full rounded-md border-0 px-3.5 py-2 dark:text-gray-200 text-gray-900 shadow-sm ring-inset ring-gray-300 placeholder:dark:text-gray-200 text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:dark:text-gray-200 text-sm sm:leading-6"
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

                <label htmlFor="message" className="block dark:text-gray-200 text-sm font-semibold leading-6 dark:text-gray-200 text-gray-900"
                  style={{ color: colors.attributes.indicator }}
                >
                  Votre message
                </label>
                <div className="mt-2.5">
                  <textarea
                    onChange={(e) => setMessage(e.target.value)}
                    value={message}
                    id="message"
                    name="message"
                    rows={4}
                    className="bg-gray-600/40  border-[1px] block w-full rounded-md border-0 px-3.5 py-2 dark:text-gray-200 text-gray-900 shadow-sm  ring-inset ring-gray-300 placeholder:dark:text-gray-200 text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:dark:text-gray-200 text-sm sm:leading-6"
                    defaultValue={''}
                    style={{ background: colors.attributes.tintedBackground, color: colors.attributes.indicator, borderColor: colors.attributes.border }}

                  />
                </div>
              </div>
            </div>
            <div className="mt-10">
              <Button
                disabled={loader}
                type="submit"
                className="w-full !text-white"
                style={{ background: colors.attributes.primary }}
              >
                Envoyer le message
              </Button>
            </div>
            <p className="mt-4 dark:text-gray-200 text-sm leading-6 dark:text-gray-200 text-gray-500"
              style={{ color: colors.attributes.hint }}
            >
              En nous contactant, vous acceptez la{' '}
              <a href={`/${etude.attributes.slug}/privacy`} className="font-semibold dark:text-gray-200 text-indigo-600"
                style={{ color: colors.attributes.primary }}

              >
                politique de confidentialité
              </a>
              .
            </p>
          </form>


          <div className="mx-auto mt-9 dark:text-gray-200 text-base leading-7 gap-8 flex flex-col ">



            {etude.attributes.address && (
              <div>
                <h3 className="border-l border-indigo-600 pl-6 font-semibold dark:text-gray-200 text-gray-900"
                  style={{ color: colors.attributes.accent, borderColor: colors.attributes.primary }}

                >{etude.attributes.name}</h3>
                <address className="border-l border-gray-200 pl-6 pt-2 not-italic dark:text-gray-200 text-gray-600"
                  style={{ color: colors.attributes.hint, borderColor: colors.attributes.border }}
                >
                  <a className='flex items-center' href={`mailto: ${etude.attributes.email}`}> <EnvelopeIcon className='h-4 w-4 mr-2'></EnvelopeIcon>{etude.attributes.email}</a>
                  <a className='flex items-center' href={`tel: ${etude.attributes.phone}`}><PhoneIcon className='h-4 w-4 mr-2'></PhoneIcon>{etude.attributes.phone}</a>
                </address>
              </div>
            )}



          </div>
        </div>


      </SimpleLayout>


    </>
  )
}
