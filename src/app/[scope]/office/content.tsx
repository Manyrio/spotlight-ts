'use client'

import Link from 'next/link'
import {
  type MotionValue,
  motion,
  useMotionTemplate,
  useMotionValue,
} from 'framer-motion'

import { GridPattern } from '@/components/GridPattern'
import { Container } from '@/components/Container'
import { use, useContext } from 'react'
import { AppContext } from '@/app/providers'

import { SimpleLayout } from '@/components/SimpleLayout'
import { BookOpenIcon, CheckBadgeIcon } from '@heroicons/react/24/outline'
import { Label } from '@/models/labels'


export function OfficeContent({ labels }: { labels: Label[] }) {

  let { colors, etude } = useContext(AppContext)



  return (
    <SimpleLayout

      title="L'office"
      intro={"Découvrez " + etude.attributes.name}
    >
      <div className='font-medium text-base'>
        {etude.attributes.description}
      </div>


      <div className='mt-6'>
        L’office se positionne autour de valeurs fortes :
      </div>

      <ul className='mt-6 list-disc'>
        <li>L’exigence d’une grande sécurité juridique,</li>
        <li>La créativité pour faire aboutir les projets les plus complexes,</li>
        <li>L’impartialité dans le respect de la déontologie notariale et de l’ordre public,</li>
        <li>L’innovation  en suivant de près l’actualité juridique et en intégrant les nouvelles technologies.</li>

      </ul>


      <div className='mt-6'>

        Les notaires de l'office et leurs collaborateurs accompagnent les particuliers et les professionnels, dans leurs projets immobiliers, familiaux et patrimoniaux.

        Ils conseillent également les entreprises et leurs dirigeants, les collectivités locales et les professionnels de l’immobilier.

      </div>

      <div className='text-base font-semibold mt-12'>Labels & certifications</div>

      <ul role="list" className="divide-y divide-gray-100 mt-6">
        {labels.map((label) => (
          <li key={label.attributes.name} className="flex justify-between gap-x-6 py-5"
            style={{ borderColor: colors.attributes.border }}
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
                <p className="text-sm font-semibold leading-6 text-gray-900">{label.attributes.name}</p>
                <p className="mt-1  text-xs leading-5 text-gray-500 whitespace-pre-line w-full">{label.attributes.description}</p>
              </div>
            </div>
          </li>
        ))}
      </ul>

    </ SimpleLayout >
  )
}
