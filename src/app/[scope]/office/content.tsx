'use client'

import Link from 'next/link'
import {
  type MotionValue,
  motion,
  useMotionTemplate,
  useMotionValue,
} from 'framer-motion'

import { GridPattern } from '@/components/GridPattern'
import { Container, ContainerInner } from '@/components/Container'
import { use, useContext } from 'react'
import { AppContext } from '@/app/providers'

import { SimpleLayout, SimpleLayoutWithTitleFooter } from '@/components/SimpleLayout'
import { BookOpenIcon, CheckBadgeIcon } from '@heroicons/react/24/outline'
import { Label } from '@/models/labels'
import { CarouselComponent } from '@/models/carousel'

import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';


export function OfficeContent({ labels, carousel }: { labels: Label[], carousel: CarouselComponent }) {

  let { colors, etude } = useContext(AppContext)
  console.log(carousel)


  return (
    <>
      <div className='full flex justify-center items-center  w-full pt-32 lg:pt-72 pb:8 lg:pb-12 px-4'>
        <div className='flex gap-8 w-full  flex-col lg:flex-row   max-w-7xl justify-between'>
          <div>
            <h1 className="dark:text-gray-200 text-4xl font-bold tracking-tight dark:text-gray-200 text-zinc-800 sm:dark:text-gray-200 text-5xl dark:dark:text-gray-200 text-zinc-100"
              style={{ color: colors.attributes.accent }}
            >
              L'office
            </h1>
            <p className="mt-6 dark:text-gray-200 text-base"
              style={{ color: colors.attributes.indicator }}
            >
              Découvrez {etude.attributes.name}
            </p>



            <div className='text-base mt-6'
              style={{ color: colors.attributes.indicator }}>
              {etude.attributes.description}
            </div>


          </div>
          <Carousel className='mb-16 max-w-2xl '
            showThumbs={false}
            showStatus={false}>
            {carousel.attributes.images.data.map((image) => (
              <img src={`https://adminpreview.hicards.fr${image.attributes.url}`} className="h-full w-full object-cover object-center rounded-md" />
            ))}
          </Carousel>
        </div>
      </div>

      <Container >
        <h2 className=" text-3xl font-bold tracking-tight   text-4xl" style={{ color: colors.attributes.accent }}>Des valeurs fortes</h2>


        <div className='mt-6'
          style={{ color: colors.attributes.indicator }}>
          L’office se positionne autour de valeurs fortes :
        </div>

        <ul className='mt-6 list-disc list-inside	'
          style={{ color: colors.attributes.indicator }}>
          <li>L’exigence d’une grande sécurité juridique,</li>
          <li>La créativité pour faire aboutir les projets les plus complexes,</li>
          <li>L’impartialité dans le respect de la déontologie notariale et de l’ordre public,</li>
          <li>L’innovation  en suivant de près l’actualité juridique et en intégrant les nouvelles technologies.</li>

        </ul>


        <div className='mt-6'
          style={{ color: colors.attributes.indicator }}>

          Les notaires de l'office et leurs collaborateurs accompagnent les particuliers et les professionnels, dans leurs projets immobiliers, familiaux et patrimoniaux.

          Ils conseillent également les entreprises et leurs dirigeants, les collectivités locales et les professionnels de l’immobilier.

        </div>

        <h2 className=" text-3xl font-bold tracking-tight mt-16  text-4xl" style={{ color: colors.attributes.accent }}>Labels & certifications</h2>



        <ul role="list" className="divide-y divide-gray-100 mt-6">
          {labels.map((label) => (
            <li key={label.attributes.name} className="flex justify-between gap-x-6 py-5"
              style={{ borderColor: colors.attributes.divider }}
            >
              <div className="flex min-w-0 gap-x-4">

                {label.attributes.image.data ?
                  <img className='h-20 w-20 rounded-full shrink-0' src={"https://adminpreview.hicards.fr" + label.attributes.image.data.attributes.url}></img>
                  :
                  <div className='rounded-full flex h-20 w-20 items-center justify-center shrink-0' style={{ background: colors.attributes.tintedBackground }} >

                    <CheckBadgeIcon className="h-12 w-12 flex-none rounded-full " style={{ color: colors.attributes.hint }} />
                  </div>
                }

                <div className="min-w-0 flex-auto mt-1">
                  <p className="text-base font-semibold leading-6 text-gray-900" style={{ color: colors.attributes.accent }}>{label.attributes.name}</p>
                  <p className="mt-1  text-sm leading-5 text-gray-500 whitespace-pre-line w-full" style={{ color: colors.attributes.indicator }}>{label.attributes.description}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>

      </ Container>
    </>
  )
}
