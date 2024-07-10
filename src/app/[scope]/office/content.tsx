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


export function OfficeContent() {

  let { colors, etude } = useContext(AppContext)

  return (
    <SimpleLayout

      title="L'office"
      intro={"Découvrez l'office de " + etude.attributes.name}
    >


      <div className="not-prose grid grid-cols-1 gap-8   sm:grid-cols-2 xl:grid-cols-4 ">

      </div>

    </ SimpleLayout >
  )
}
