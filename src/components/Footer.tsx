import Link from 'next/link'

import { ContainerInner, ContainerOuter } from '@/components/Container'

function NavLink({
  href,
  children,
}: {
  href: string
  children: React.ReactNode
}) {
  return (
    <Link
      href={href}
      className="transition hover:text-teal-500 dark:hover:text-teal-400"
    >
      {children}
    </Link>
  )
}

export function Footer() {
  return (
    <footer className="mt-32 flex-none">
      <ContainerOuter>
        <div className="border-t  pb-16 pt-10 ">
          <ContainerInner>
            <div className="flex flex-col items-start justify-between gap-6 sm:flex-row">
              <div className="flex flex-wrap justify-start gap-x-6 gap-y-1 text-sm font-medium text-zinc-800 dark:text-zinc-200">
                <NavLink href="/mention-legales">Mentions légales</NavLink>
                <NavLink href="/cookies">Gestion des cookies</NavLink>
                <NavLink href="/donnees-personnelles">Données personnelles</NavLink>
              </div>
              <p className="text-sm text-zinc-400 dark:text-zinc-500">
                &copy; {new Date().getFullYear()} 2024 - Anne LAUBE, Pierre LHOMME, Marc DELMAS, Jeanne LERAY & Virginie DUFEIL. Notaires CAULNES (22)
              </p>
            </div>
          </ContainerInner>
        </div>
      </ContainerOuter>
    </footer>
  )
}
