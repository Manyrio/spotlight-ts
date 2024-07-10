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
import {
  RiHomeSmileLine,
  RiHeartAddLine,
  RiHomeHeartLine,
  RiUserAddLine,
  RiHeartBrokenLine,
  RiGiftLine,
  RiShieldUserLine,
  RiQuestionnaireLine,
  RiHomeSmile2Line,
  RiEarthLine,
  RiLightbulbFlashLine,
  RiHome4Line,
  RiMoneyEuroBoxLine,
  RiCalculatorLine,
  RiFundsLine,
  RiBarChartLine,
  RemixiconComponentType
} from "@remixicon/react";


interface Resource {
  href: string
  name: string
  Icon: RemixiconComponentType
}

const resources: Resource[] = [
  {
    href: "#",
    name: "Optimiser votre patrimoine",
    Icon: RiHomeSmileLine,
  },
  {
    href: "#",
    name: "Se marier, se pacser",
    Icon: RiHeartAddLine
  },
  {
    href: "#",
    name: "Vendre un bien immobilier",
    Icon: RiHeartFill
  },
  {
    href: "#",
    name: "Adopter un enfant",
    Icon: RiHeartFill
  },
  {
    href: "#",
    name: "Se séparer, divorcer",
    Icon: RiHeartFill
  },
  {
    href: "#",
    name: "Procéder à des donations",
    Icon: RiHeartFill
  },
  {
    href: "#",
    name: "Protéger et prévoir l’avenir de vos proches",
    Icon: RiHeartFill
  },
  {
    href: "#",
    name: "Vous vous posez des questions sur l’héritage",
    Icon: RiHeartFill
  },
  {
    href: "#",
    name: "Louer un bien immobilier",
    Icon: RiHeartFill
  },
  {
    href: "#",
    name: "Vivre à l’étranger",
    Icon: RiHeartFill
  },
  {
    href: "#",
    name: "Entreprendre",
    Icon: RiHeartFill
  },
  {
    href: "#",
    name: "Acheter une maison",
    Icon: RiHeartFill
  },
  {
    href: "#",
    name: "Evaluer vos frais d'achat",
    Icon: RiHeartFill
  },
  {
    href: "#",
    name: "Vérifier vos capacités d'emprunt",
    Icon: RiHeartFill
  },
  {
    href: "#",
    name: "Calculer vos remboursements de prêt",
    Icon: RiHeartFill
  },
  {
    href: "#",
    name: "Calculer vos plus-values immobilières",
    Icon: RiHeartFill
  }
];


function ResourceImage({ Icon }: { Icon: Resource["Icon"] }) {
  return (
    <Icon className="h-10 w-auto fill-current"></Icon>
    // <div className="flex h-7 w-7 items-center justify-center rounded-full bg-zinc-900/5 ring-1 ring-zinc-900/25 backdrop-blur-[2px] transition duration-300 group-hover:bg-white/50 group-hover:ring-zinc-900/25 dark:bg-white/7.5 dark:ring-white/15 dark:group-hover:bg-emerald-300/10 dark:group-hover:ring-emerald-400">
    //   <img src={image} alt="" className="h-10 w-10 fill-current" />
    //   {/* <Icon className="h-5 w-5 fill-zinc-700/10 stroke-zinc-700 transition-colors duration-300 group-hover:stroke-zinc-900 dark:fill-white/10 dark:stroke-zinc-400 dark:group-hover:fill-emerald-300/10 dark:group-hover:stroke-emerald-400" /> */}
    // </div>
  )
}

function ResourcePattern({
  mouseX,
  mouseY,
}: {
  mouseX: MotionValue<number>
  mouseY: MotionValue<number>
}) {
  let { colors } = useContext(AppContext);

  let maskImage = useMotionTemplate`radial-gradient(180px at ${mouseX}px ${mouseY}px, white, transparent)`
  let style = { maskImage, WebkitMaskImage: maskImage, backgroundImage: `linear-gradient(to right, ${colors.attributes.primary}20, ${colors.attributes.primary}40)` }


  return (
    <div className="pointer-events-none">
      <div className="absolute inset-0 rounded-2xl transition duration-300 [mask-image:linear-gradient(white,transparent)] group-hover:opacity-50">
        <GridPattern
          width={72}
          height={56}
          x="50%"
          className="absolute inset-x-0 inset-y-[-30%] h-[160%] w-full skew-y-[-18deg] fill-black/[0.02] stroke-black/5 dark:fill-white/1 dark:stroke-white/2.5"
          {...{
            y: 16,
            squares: [
              [0, 1],
              [1, 3],
            ],
          }}
        />
      </div>
      <motion.div
        className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#D7EDEA] to-[#F4FBDF] opacity-0 transition duration-300 group-hover:opacity-100 "


        style={style}
      />
      <motion.div
        className="absolute inset-0 rounded-2xl opacity-0 mix-blend-overlay transition duration-300 group-hover:opacity-100"
        style={style}
      >
        <GridPattern
          width={72}
          height={56}
          x="50%"
          className="absolute inset-x-0 inset-y-[-30%] h-[160%] w-full skew-y-[-18deg] fill-black/50 stroke-black/70 dark:fill-white/2.5 dark:stroke-white/10"
          {...{
            y: 16,
            squares: [
              [0, 1],
              [1, 3],
            ],
          }}
        />
      </motion.div>
    </div>
  )
}

function Resource({ resource }: { resource: Resource }) {
  let mouseX = useMotionValue(0)
  let mouseY = useMotionValue(0)

  function onMouseMove({
    currentTarget,
    clientX,
    clientY,
  }: React.MouseEvent<HTMLDivElement>) {
    let { left, top } = currentTarget.getBoundingClientRect()
    mouseX.set(clientX - left)
    mouseY.set(clientY - top)
  }
  let { colors } = useContext(AppContext)

  return (


    <div
      key={resource.href}
      onMouseMove={onMouseMove}
      className="group relative flex rounded-2xl bg-zinc-50 transition-shadow hover:shadow-md hover:shadow-zinc-900/5 "


      style={{ background: colors.attributes.tintedBackground }}
    >
      <ResourcePattern mouseX={mouseX} mouseY={mouseY} />
      <div className="absolute inset-0 rounded-2xl border-[1px]"

        style={{ borderColor: colors.attributes.border }}

      />
      <div className="relative rounded-2xl px-4 pb-6 pt-10">
        <ResourceImage Icon={resource.Icon} />
        <h3 className="mt-4 text-md font-semibold text-zinc-900"
          style={{ color: colors.attributes.accent }}
        >
          <Link href={resource.href}>
            <span className="absolute inset-0 rounded-2xl"

            />
            {resource.name}
          </Link>
        </h3>
        <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400"
          style={{ color: colors.attributes.hint }}>
          Voir plus
        </p>
      </div>
    </div>
  )
}

export function ServicesContent() {

  let { colors } = useContext(AppContext)

  return (
    <Container>

      <div className="mt-20 mx-auto grid max-w-2xl grid-cols-1 items-start gap-x-8 gap-y-16 sm:gap-y-24 lg:mx-0 lg:max-w-none lg:grid-cols-1">

        <div>
          <div className="dark:text-gray-200 text-base leading-7 dark:text-gray-200 text-gray-700 w-full">
            <p className="dark:text-gray-200 text-base font-semibold leading-7 dark:text-gray-200 text-indigo-600"
              style={{ color: colors.attributes.primary }}
            >Notaires</p>
            <h1 className="mt-2 dark:text-gray-200 text-3xl font-bold tracking-tight dark:text-gray-200 text-gray-900 sm:dark:text-gray-200 text-4xl"
              style={{ color: colors.attributes.accent }}
            >
              Nos services numériques
            </h1>
          </div>
        </div>
      </div>

      <div className="not-prose mt-4 grid grid-cols-1 gap-8 border-t border-zinc-900/5 pt-10 sm:grid-cols-2 xl:grid-cols-4 dark:border-white/5">
        {resources.map((resource) => (
          <Resource key={resource.href} resource={resource} />
        ))}
      </div>

    </Container >
  )
}
