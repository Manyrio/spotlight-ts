"use client"

import { type Metadata } from 'next'
import Image from 'next/image'

import { Card } from '@/components/Card'
import { SimpleLayout } from '@/components/SimpleLayout'
import logoAnimaginary from '@/images/logos/animaginary.svg'
import logoCosmos from '@/images/logos/cosmos.svg'
import logoHelioStream from '@/images/logos/helio-stream.svg'
import logoOpenShuttle from '@/images/logos/open-shuttle.svg'
import logoPlanetaria from '@/images/logos/planetaria.svg'
import { AcademicCapIcon, EnvelopeIcon, LanguageIcon, MapPinIcon, PhoneIcon } from '@heroicons/react/20/solid'
import { membres } from '../page'



export default function Projects() {
    return (
        <SimpleLayout
            title="L'équipe"
            intro="Rencontrez l'équipe et contactez-nous."
        >

            <ul role="list" className="-mt-12 space-y-12 divide-y divide-gray-300/90 dark: divide-gray-700 xl:col-span-3">
                {membres.map((membre) => (
                    <li key={membre.nom} className="flex flex-col gap-10 pt-12 sm:flex-row">
                        <img className="aspect-[4/5] w-52 flex-none rounded-2xl object-cover" src={membre.imageUrl} alt="" />
                        <div className="max-w-xl flex-auto">
                            <h3 className="dark:text-gray-200 text-lg font-semibold leading-8 tracking-tight dark:text-gray-200 text-gray-900 dark:dark:text-gray-200 text-gray-200">{membre.nom}</h3>
                            <p className="dark:text-gray-200 text-base leading-7 dark:text-gray-200 text-gray-600">{membre.poste}</p>

                            {membre.email && <a href={'mailto:'+membre.email} className="underline mt-6 dark:text-gray-200 text-base leading-7 dark:text-gray-200 text-gray-600  dark:dark:text-gray-200 text-gray-500 flex items-center">
                                <EnvelopeIcon className='h-4 w-4 mr-2 shrink-0'></EnvelopeIcon>
                                {membre.email}</a>}


                            {membre.telephone && <p className="mt-6 dark:text-gray-200 text-base leading-7 dark:text-gray-200 text-gray-600 dark:dark:text-gray-200 text-gray-500  flex items-center">
                                <PhoneIcon className='h-4 w-4 mr-2 shrink-0'></PhoneIcon>
                                {membre.telephone}</p>}

                            {membre.diplomes && <p className="mt-6 dark:text-gray-200 text-base leading-7 dark:text-gray-200 text-gray-600 dark:dark:text-gray-200 text-gray-500  flex items-center">
                                <AcademicCapIcon className='h-4 w-4 mr-2 shrink-0'></AcademicCapIcon>
                                {membre.diplomes.map(diplome => (
                                    <p>{diplome}</p>
                                ))}
                            </p>}

                            {membre.langues && <p className="mt-6 dark:text-gray-200 text-base leading-7 dark:text-gray-200 text-gray-600 dark:dark:text-gray-200 text-gray-500  flex items-center">
                                <LanguageIcon className='h-4 w-4 mr-2 shrink-0'></LanguageIcon>
                                {membre.langues.map(langue => (
                                    <p>{langue}</p>
                                ))}
                            </p>}


                            {membre.lieuxActivite && <p className="mt-6 dark:text-gray-200 text-base leading-7 dark:text-gray-200 text-gray-600 dark:dark:text-gray-200 text-gray-500  flex items-center">
                                <MapPinIcon className='h-4 w-4 mr-2 shrink-0'></MapPinIcon>
                                {membre.lieuxActivite.map(lieu => (
                                    <p>{lieu}</p>
                                ))}
                            </p>}



                            {membre.reseauxSociaux &&
                                <ul role="list" className="mt-6 flex gap-x-6">
                                    {membre.reseauxSociaux.map(reseau => {
                                        return <li key={reseau.nom}>
                                            <a href={reseau.lien} className="dark:text-gray-200 text-gray-400 dark:dark:text-gray-200 text-gray-500  hover:dark:text-gray-200 text-gray-500">
                                                <span className="sr-only">LinkedIn</span>
                                                <svg className="h-5 w-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z"
                                                        clipRule="evenodd"
                                                    />
                                                </svg>
                                            </a>
                                        </li>
                                    }
                                    )}

                                </ul>

                            }

                        </div>
                    </li>
                ))}
            </ul>

        </SimpleLayout>
    )
}
