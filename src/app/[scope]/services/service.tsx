'use client'

import Link from 'next/link'
import {
  type MotionValue,
  motion,
  useMotionTemplate,
  useMotionValue,
} from 'framer-motion'

import { GridPattern } from '@/components/GridPattern'

interface Resource {
  href: string
  name: string
  image: string
}

const resources: Resource[] = [
  {
      href: "#",
      name: "Optimiser votre patrimoine",
      image: 'https://prismeoffice.adnov.fr/media/view/0/0/61/61/cb1896623ed226771914358eb24bdf959aced2d4.png'
  },
  {
      href: "#",
      name: "Se marier, se pacser",
      image: "https://prismeoffice.adnov.fr/media/view/0/0/61/61/c50356d0f105f457b8b61866e03470a6a746821f.png"
  },
  {
      href: "#",
      name: "Vendre un bien immobilier",
      image: 'https://prismeoffice.adnov.fr/media/view/0/0/61/61/dd79f5250cc0dea205436c23c8a47617fdfbd1df.png'
  },
  {
      href: "#",
      name: "Adopter un enfant",
      image: 'https://prismeoffice.adnov.fr/media/view/0/0/61/61/2cd3f705a58e35eb794c81cb79eea2640c11f642.png'
  },
  {
      href: "#",
      name: "Se séparer, divorcer",
      image: 'https://prismeoffice.adnov.fr/media/view/0/0/61/61/d0b7c2ce9f2aa70082d95ac64526498f6e74df87.png'
  },
  {
      href: "#",
      name: "Procéder à des donations",
      image: 'https://prismeoffice.adnov.fr/media/view/0/0/61/61/c6a980f38cfb4b2849b339a7deb915faa83118e0.png'
  },
  {
      href: "#",
      name: "Protéger et prévoir l’avenir de vos proches",
      image: 'https://prismeoffice.adnov.fr/media/view/0/0/61/61/cc3580ba8317376e663a184458608ba7b14cdfbd.png'
  },
  {
      href: "#",
      name: "Vous vous posez des questions sur l’héritage",
      image: 'https://prismeoffice.adnov.fr/media/view/0/0/61/61/10f10fc51c52a42de31b955b5e987229af898b69.png'
  },
  {
      href: "#",
      name: "Louer un bien immobilier",
      image: 'https://prismeoffice.adnov.fr/media/view/0/0/61/61/016737cb9a00015c3a071175defa4313ccc5b356.png'
  },
  {
      href: "#",
      name: "Vivre à l’étranger",
      image: 'https://prismeoffice.adnov.fr/media/view/0/0/61/61/bf90253fd6d09d308d146842b0c4dd505aba263b.png'
  },
  {
      href: "#",
      name: "Entreprendre",
      image: 'https://prismeoffice.adnov.fr/media/view/0/0/61/61/2ab5e82c25249765ef124102b88066cd9c0e9148.png'
  },
  {
      href: "#",
      name: "Acheter une maison",
      image: 'https://prismeoffice.adnov.fr/media/view/0/0/61/61/009f091f3d48a695cab4edc5361bf0b410d0f99b.png'
  },
  {
      href: "#",
      name: "Evaluer vos frais d'achat",
      image: 'https://prismeoffice.adnov.fr/media/view/0/0/61/61/7974fd3a1fc4a1021dc9cb5bd59da2bc2dd22feb.png'
  },
  {
      href: "#",
      name: "Vérifier vos capacités d'emprunt",
      image: 'https://prismeoffice.adnov.fr/media/view/0/0/61/61/69e21b79fb10eb514eb171f607cd4710f3774fe5.png'
  },
  {
      href: "#",
      name: "Calculer vos remboursements de prêt",
      image: 'https://prismeoffice.adnov.fr/media/view/0/0/61/61/9f04acc12ca3abe3c18c1ca669fd462edcf2ebe8.png'
  },
  {
      href: "#",
      name: "Calculer vos plus-values immobilières",
      image: 'https://prismeoffice.adnov.fr/media/view/0/0/61/61/9f0e54bc51001acf9951d65204495e07ee02dff7.png'
  }
];


function ResourceImage({ image }: { image: Resource['image'] }) {
  return (
    <img src={image} alt="" className="h-10 w-auto fill-current" />
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
  let maskImage = useMotionTemplate`radial-gradient(180px at ${mouseX}px ${mouseY}px, white, transparent)`
  let style = { maskImage, WebkitMaskImage: maskImage }

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
        className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#D7EDEA] to-[#F4FBDF] opacity-0 transition duration-300 group-hover:opacity-100 dark:from-[#202D2E] dark:to-[#303428]"
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

  return (
    <div
      key={resource.href}
      onMouseMove={onMouseMove}
      className="group relative flex rounded-2xl bg-zinc-50 transition-shadow hover:shadow-md hover:shadow-zinc-900/5 dark:bg-white/2.5 dark:hover:shadow-black/5"
    >
      <ResourcePattern mouseX={mouseX} mouseY={mouseY} />
      <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-zinc-900/7.5 group-hover:ring-zinc-900/10 dark:ring-white/10 dark:group-hover:ring-white/20" />
      <div className="relative rounded-2xl px-4 pb-6 pt-10">
        <ResourceImage image={resource.image} />
        <h3 className="mt-4 text-md font-semibold text-zinc-900">
          <Link href={resource.href}>
            <span className="absolute inset-0 rounded-2xl" />
            {resource.name}
          </Link>
        </h3>
        <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
          Voir plus
        </p>
      </div>
    </div>
  )
}

export function Services() {
  return (
    <div className="not-prose mt-4 grid grid-cols-1 gap-8 border-t border-zinc-900/5 pt-10 sm:grid-cols-2 xl:grid-cols-4 dark:border-white/5">
        {resources.map((resource) => (
          <Resource key={resource.href} resource={resource} />
        ))}
      </div>
  )
}
