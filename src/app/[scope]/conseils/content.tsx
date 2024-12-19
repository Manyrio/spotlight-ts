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
  RemixiconComponentType,
  RiDislikeFill,
  RiLineChartLine
} from "@remixicon/react";
import { SimpleLayout } from '@/components/SimpleLayout'


interface Resource {
  href: string
  name: string
  Icon: RemixiconComponentType
}

const resources: Resource[] = [
  {
    href: "https://www.notaires.fr/fr/immobilier",
    name: "Optimiser votre patrimoine",
    Icon: RiLineChartLine,
  },
  {
    href: "https://www.notaires.fr/fr/famille",
    name: "Se marier, se pacser",
    Icon: RiHeartAddLine
  },
  {
    href: "https://www.notaires.fr/fr/immobilier",
    name: "Vendre un bien immobilier",
    Icon: RiHomeHeartLine
  },
  {
    href: "https://www.notaires.fr/fr/famille",
    name: "Adopter un enfant",
    Icon: RiUserAddLine
  },
  {
    href: "https://www.notaires.fr/fr/famille",
    name: "Se séparer, divorcer",
    Icon: RiDislikeFill
  },
  {
    href: "https://www.notaires.fr/fr/donation",
    name: "Procéder à des donations",
    Icon: RiGiftLine
  },
  {
    href: "https://www.notaires.fr/fr/succession",
    name: "Protéger et prévoir l’avenir de vos proches",
    Icon: RiShieldUserLine
  },
  {
    href: "https://www.notaires.fr/fr/succession",
    name: "Vous vous posez des questions sur l’héritage",
    Icon: RiQuestionnaireLine
  },
  {
    href: "https://www.notaires.fr/fr/immobilier",
    name: "Louer un bien immobilier",
    Icon: RiHomeSmile2Line
  },
  {
    href: "https://www.notaires.fr/fr/famille",
    name: "Vivre à l’étranger",
    Icon: RiEarthLine
  },
  {
    href: "https://www.notaires.fr/fr/immobilier",
    name: "Entreprendre",
    Icon: RiLightbulbFlashLine
  },
  {
    href: "https://www.notaires.fr/fr/immobilier",
    name: "Acheter une maison",
    Icon: RiHome4Line
  },
  {
    href: "https://www.immobilier.notaires.fr/fr/frais-de-notaire",
    name: "Evaluer vos frais d'achat",
    Icon: RiMoneyEuroBoxLine
  },
  {
    href: "https://www.anil.org/outils/outils-de-calcul/diagnostic-de-financement/",
    name: "Vérifier vos capacités d'emprunt",
    Icon: RiCalculatorLine
  },
  {
    href: "https://www.anil.org/outils/outils-de-calcul/echeancier-dun-pret",
    name: "Calculer vos remboursements de prêt",
    Icon: RiFundsLine
  },
  {
    href: "http://plus-values.notaires.fr/simulateur/index.xhtml",
    name: "Calculer vos plus-values immobilières",
    Icon: RiBarChartLine
  }
];

function ResourceImage({ Icon }: { Icon: Resource["Icon"] }) {
  let { colors } = useContext(AppContext);
  return (
    <Icon className="h-10 w-auto fill-current " style={{ color: colors.attributes.accent }} ></Icon>
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

    <Link
      href={resource.href} target='_blank'
      className='relative'
    >
      <div
        key={resource.href + resource.name}
        onMouseMove={onMouseMove}
        className="group w-full h-full flex rounded-2xl bg-zinc-50 transition-shadow hover:shadow-md hover:shadow-zinc-900/5 "
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
            <div>
              <span className="absolute inset-0 rounded-2xl"

              />
              {resource.name}
            </div>
          </h3>
          <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400"
            style={{ color: colors.attributes.hint }}>
            Voir plus
          </p>
        </div>
      </div>
    </Link>
  )
}

export function ConseilsContent() {

  let { colors } = useContext(AppContext)

  return (
    <SimpleLayout

      title="Nos conseils"
      intro="Découvrez tous nos conseils numériques."
    >


      <div className="not-prose grid grid-cols-1 gap-8   sm:grid-cols-2 xl:grid-cols-4 ">
        {resources.map((resource) => (
          <Resource key={resource.href} resource={resource} />
        ))}
      </div>

    </SimpleLayout >
  )
}
