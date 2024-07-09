"use client"
import Link from 'next/link'

import { ContainerInner, ContainerOuter } from '@/components/Container'
import { useContext } from 'react'
import { AppContext } from '@/app/providers'

function NavLink({
  href,
  children,
}: {
  href: string
  children: React.ReactNode
}) {
  let { colors } = useContext(AppContext)

  return (
    <Link
      href={href}
      className="transition "
      style={{ color: colors.attributes.primary }}
    >
      {children}
    </Link>
  )
}

export function Footer() {
  let { colors } = useContext(AppContext)

  return (
    <footer className="mt-32 flex-none">
      <ContainerOuter>
        <div className="border-t  pb-16 pt-10 " style={{ borderColor: colors.attributes.divider }}>
          <ContainerInner>
            <div className="flex flex-col items-start justify-between gap-6 sm:flex-row">
              <div className="flex flex-wrap justify-start gap-x-6 gap-y-1 text-sm font-medium  " >
                <NavLink href="/mention-legales">Mentions légales</NavLink>
                <NavLink href="/cookies">Gestion des cookies</NavLink>
                <NavLink href="/donnees-personnelles">Données personnelles</NavLink>
              </div>
              <p className="text-sm" style={{ color: colors.attributes.indicator }}>
                &copy; {new Date().getFullYear()} 2024 - Anne LAUBE, Pierre LHOMME, Marc DELMAS, Jeanne LERAY & Virginie DUFEIL. Notaires CAULNES (22)
              </p>
            </div>
          </ContainerInner>
        </div>
      </ContainerOuter>
    </footer>
  )
}
