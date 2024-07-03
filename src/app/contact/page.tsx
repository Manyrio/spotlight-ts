"use client"
import { type Metadata } from 'next'

import { SimpleLayout } from '@/components/SimpleLayout'
import { Button } from '@/components/Button'
import { EnvelopeIcon, PhoneIcon } from '@heroicons/react/24/outline'
import { adresses } from '../page'


export default function ThankYou() {
  return (


    <>

      <SimpleLayout
        title="Contactez-nous"
        intro="Nous sommes à votre disposition pour répondre à vos questions.">




        <div className="-mt-6 flex flex-col gap-16 sm:gap-y-20 lg:flex-row">
          <form action="#" method="POST" className="lg:flex-auto">
            <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
              <div>
                <label htmlFor="first-name" className="block dark:text-gray-200 text-sm font-semibold leading-6 dark:text-gray-200 text-gray-900">
                  Prénom
                </label>
                <div className="mt-2.5">
                  <input
                    type="text"
                    name="first-name"
                    id="first-name"
                    autoComplete="given-name"
                    className="bg-gray-500/30  block w-full rounded-md border-0 px-3.5 py-2 dark:text-gray-200 text-gray-900 shadow-sm ring-inset ring-gray-300 placeholder:dark:text-gray-200 text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:dark:text-gray-200 text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="last-name" className="block dark:text-gray-200 text-sm font-semibold leading-6 dark:text-gray-200 text-gray-900">
                  Nom
                </label>
                <div className="mt-2.5">
                  <input
                    type="text"
                    name="last-name"
                    id="last-name"
                    autoComplete="family-name"
                    className="bg-gray-500/30 block w-full rounded-md border-0 px-3.5 py-2 dark:text-gray-200 text-gray-900 shadow-sm ring-inset ring-gray-300 placeholder:dark:text-gray-200 text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:dark:text-gray-200 text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="budget" className="block dark:text-gray-200 text-sm font-semibold leading-6 dark:text-gray-200 text-gray-900">
                  Budget
                </label>
                <div className="mt-2.5">
                  <input
                    id="budget"
                    name="budget"
                    type="text"
                    className="bg-gray-500/30  block w-full rounded-md border-0 px-3.5 py-2 dark:text-gray-200 text-gray-900 shadow-sm  ring-inset ring-gray-300 placeholder:dark:text-gray-200 text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:dark:text-gray-200 text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="website" className="block dark:text-gray-200 text-sm font-semibold leading-6 dark:text-gray-200 text-gray-900">
                  Website
                </label>
                <div className="mt-2.5">
                  <input
                    type="url"
                    name="website"
                    id="website"
                    className="bg-gray-500/30  block w-full rounded-md border-0 px-3.5 py-2 dark:text-gray-200 text-gray-900 shadow-sm  ring-inset ring-gray-300 placeholder:dark:text-gray-200 text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:dark:text-gray-200 text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="message" className="block dark:text-gray-200 text-sm font-semibold leading-6 dark:text-gray-200 text-gray-900">
                  Votre message
                </label>
                <div className="mt-2.5">
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    className="bg-gray-500/30  block w-full rounded-md border-0 px-3.5 py-2 dark:text-gray-200 text-gray-900 shadow-sm  ring-inset ring-gray-300 placeholder:dark:text-gray-200 text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:dark:text-gray-200 text-sm sm:leading-6"
                    defaultValue={''}
                  />
                </div>
              </div>
            </div>
            <div className="mt-10">
              <Button
                type="submit"
                className="w-full"
              >
                Envoyer le message
              </Button>
            </div>
            <p className="mt-4 dark:text-gray-200 text-sm leading-6 dark:text-gray-200 text-gray-500">
              En nous contactant, vous acceptez la{' '}
              <a href="#" className="font-semibold dark:text-gray-200 text-indigo-600">
                politique de confidentialité
              </a>
              .
            </p>
          </form>


          <div className="mx-auto mt-9 dark:text-gray-200 text-base leading-7 gap-8 flex flex-col ">

            {adresses.map((adresse) => (
              <div>
                <h3 className="border-l border-indigo-600 pl-6 font-semibold dark:text-gray-200 text-gray-900">{adresse.name}</h3>
                <address className="border-l border-gray-200 pl-6 pt-2 not-italic dark:text-gray-200 text-gray-600">
                  <p className='flex items-center'> <EnvelopeIcon className='h-4 w-4 mr-2'></EnvelopeIcon>{adresse.email}</p>
                  <p className='flex items-center'> <PhoneIcon className='h-4 w-4 mr-2'></PhoneIcon>{adresse.phone}</p>
                </address>
              </div>
            ))}



          </div>
        </div>


      </SimpleLayout>


    </>
  )
}
