'use client'

import { useContext, useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  Popover,
  PopoverButton,
  PopoverOverlay,
  PopoverPanel,
  Transition,
  TransitionChild,
} from '@headlessui/react'
import clsx from 'clsx'

import { Container } from '@/components/Container'
import avatarImage from '@/images/avatar.jpg'
import { AppContext } from '@/app/providers'
import { ArrowDownTrayIcon, BanknotesIcon, BuildingOfficeIcon, ChevronDownIcon, ChevronRightIcon, SquaresPlusIcon, UserGroupIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { ApiListResponse, Scope } from '@/models/other'
import { Method, call } from '@/scripts/api'
import { DocumentFile } from '@/models/documents'
import { capitalizeFirstLetter } from '@/scripts/capitalize'




function Navigation({ documents }: { documents?: DocumentFile[] }) {

  let { scope, etude } = useContext(AppContext)

  let documentsAsResource = documents?.map((document) => ({
    name: document.attributes.name,
    href: `https://adminpreview.hicards.fr${document.attributes.file.data.attributes.url}`,
    description: document.attributes.description,
  }))

  return (<>
    <NavItem href={`/${scope}`}>Accueil</NavItem>
    <NavItem>
      <DropDown name="L'office" resources={[
        {
          name: "Présentation de l'office",
          href: `/${scope}/office`,
          description: "Découvrez l'office",
          Icon: BuildingOfficeIcon,
        },

        {
          name: "L'équipe",
          href: `/${scope}/equipe`,
          description: "Rencontrez l'équipe",
          Icon: UserGroupIcon,
        }
      ]}

        downloads={
          [
            {
              name: "Nos Tarifs",
              href: `https://adminpreview.hicards.fr${etude.attributes.pricing?.data?.attributes?.file?.data?.attributes?.url}`,
              description: `Consultez nos tarifs (${etude.attributes.name})`,
            },
            ...documentsAsResource as any
          ]
        }></DropDown>
    </NavItem>
    <NavItem href={`/${scope}/annonces`}>Annonces Immobilières</NavItem>

    <NavItem href={`/${scope}/conseils`}>  Conseils </NavItem >
    <NavItem href={`/${scope}/articles`}>Actualités</NavItem>
    <NavItem href={`/${scope}/contact`}>Contact</NavItem>
  </>)

}



interface Resource {
  href: string
  name: string
  description: string
  Icon?: any
}

function DropDown({ name, resources, downloads }: { name: string, resources: Resource[], downloads?: Resource[] }) {
  let { colors } = useContext(AppContext)
  console.log(colors)
  const buttonRef: any = useRef();

  return (
    <Popover className="relative">

      <PopoverButton ref={buttonRef} className="inline-flex items-center gap-x-1  leading-6 text-gray-900 outline-none">
        <span>{name}</span>
        <ChevronDownIcon aria-hidden="true" className="ml-1 h-3 w-3" style={{ color: colors.attributes.accent }} />
      </PopoverButton>

      <PopoverPanel
        className="absolute left-1/2 z-10 mt-5 flex w-screen  max-w-max -translate-x-1/2 px-6  md:px-4 transition data-[closed]:translate-y-1 data-[closed]:opacity-0 data-[enter]:duration-200 data-[leave]:duration-150 data-[enter]:ease-out data-[leave]:ease-in"
      >
        <div className="w-screen max-w-md flex-auto overflow-hidden rounded-3xl bg-white text-sm leading-6 shadow-lg ring-1 ring-gray-900/5"

          style={{ background: colors.attributes.background }}

        >
          <div className="p-4">
            {resources.map((item) => (
              <div key={item.name} className="group relative flex gap-x-6 rounded-lg p-4 "
              >
                <div className="mt-1 flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 "
                  style={{ background: colors.attributes.tintedBackground }}
                >
                  <item.Icon aria-hidden="true" className="h-6 w-6 text-gray-600 group-hover:text-indigo-600"
                    style={{ color: colors.attributes.hint }}
                  />
                </div>
                <div>
                  <Link href={item.href} className="font-semibold text-gray-900"
                    onClick={() => buttonRef.current?.click()}
                    style={{ color: colors.attributes.accent }}
                  >
                    {item.name}
                    <span className="absolute inset-0" />
                  </Link>
                  <p className="mt-1 text-gray-600"
                    style={{ color: colors.attributes.indicator }}
                  >{item.description}</p>
                </div>
              </div>
            ))}
          </div>
          {downloads?.length ?
            <div className="bg-gray-50 p-6 py-4"
              style={{ background: colors.attributes.tintedBackground }}>

              <ul role="list" className=" space-y-6">
                {downloads.map((resource, index) => (
                  <li key={index} className="relative flex items-center w-full">
                    <div className='w-11/12'>
                      <div className="block text-xs leading-6 text-gray-600  w-full">
                        {resource.description}
                      </div>
                      <Link
                        onClick={() => buttonRef.current?.click()}
                        href={resource.href} className="block truncate w-full text-sm font-semibold leading-6 text-gray-900">
                        {resource.name}
                        <span className="absolute inset-0" />
                      </Link>
                    </div>
                    <ArrowDownTrayIcon className='h-4 w-4 ml-auto shrink-0'></ArrowDownTrayIcon>
                  </li>
                ))}
              </ul>
            </div> : <></>
          }
        </div>
      </PopoverPanel>
    </Popover>

  )
}




function MobileNavigation(
  { props, documents }: { props: React.ComponentPropsWithoutRef<typeof Popover>, documents: DocumentFile[] }
) {
  let { scope, etude, colors } = useContext(AppContext)

  return (
    <Popover {...props}>
      <PopoverButton className="group flex items-center rounded-full bg-white/90 px-4 py-2 dark:text-gray-200 text-sm font-medium dark:text-gray-200 text-zinc-800 shadow-lg shadow-zinc-800/5 ring-1 ring-zinc-900/5 backdrop-blur dark:bg-zinc-800/90 dark:dark:text-gray-200 text-zinc-200 dark:ring-white/10 dark:hover:ring-white/20"
        style={{ background: colors.attributes.tintedBackground, color: colors.attributes.accent }}

      >
        Menu
        <ChevronDownIcon className="ml-3 h-auto w-5 stroke-zinc-500 group-hover:stroke-zinc-700 dark:group-hover:stroke-zinc-400" />
      </PopoverButton>
      <Transition>
        <TransitionChild
          enter="duration-150 ease-out"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="duration-150 ease-in"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <PopoverOverlay className="fixed inset-0 z-50 bg-zinc-800/40 backdrop-blur-sm"
            style={{ background: colors.attributes.tintedBackground }}
          />
        </TransitionChild>
        <TransitionChild
          enter="duration-150 ease-out"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="duration-150 ease-in"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <PopoverPanel
            focus
            className="fixed top-8  inset-x-4 z-50 origin-top  "

          >
            <div className='w-full  h-full p-8 rounded-3xl ring-1 ring-zinc-900/5'
              style={{ background: colors.attributes.background }}
            >
              <div className="flex flex-row-reverse items-center justify-between">
                <PopoverButton aria-label="Close menu" className="-m-1 p-1">
                  <XMarkIcon className="h-6 w-6 dark:text-gray-200 text-zinc-500 dark:dark:text-gray-200 text-zinc-400"
                    style={{ color: colors.attributes.accent }}
                  />
                </PopoverButton>
                <h2 className="dark:text-gray-200 text-sm font-medium dark:text-gray-200 text-zinc-600 dark:dark:text-gray-200 text-zinc-400"
                  style={{ color: colors.attributes.accent }}
                >
                  Navigation
                </h2>
              </div>
              <nav className="mt-6">
                <ul className="-my-2 divide-y divide-zinc-100 dark:text-gray-200 text-base dark:text-gray-200 text-zinc-800 dark:divide-zinc-100/5 dark:dark:text-gray-200 text-zinc-300">
                  <Navigation documents={documents}></Navigation>
                </ul>
              </nav>
            </div>
          </PopoverPanel>
        </TransitionChild>
      </Transition>
    </Popover>
  )
}

function NavItem({
  href,
  children,
}: {
  href?: string
  children: React.ReactNode
}) {
  console.log()
  let isActive = usePathname() == href

  let { colors } = useContext(AppContext)


  return (
    <li
      style={{ borderColor: colors.attributes.border }}
    >
      <Link
        href={href || "#"}
        className={clsx(
          'relative block md:px-3 py-2 transition whitespace-nowrap',
          isActive
            ? 'dark:text-gray-200  dark:dark:text-gray-200'
            : 'hover:dark:text-gray-200  dark:hover:dark:text-gray-200',
        )}
        style={{ color: isActive ? colors.attributes.primary : colors.attributes.accent }}
      >
        {children}
        {isActive && (
          <span className="absolute inset-x-1 -bottom-px h-px bg-gradient-to-r from-teal-500/0 via-teal-500/40 to-teal-500/0 "
            style={{ backgroundImage: `linear-gradient(to right, ${colors.attributes.primary}10, ${colors.attributes.primary}AA, ${colors.attributes.primary}10)` }}
          />
        )}
      </Link>
    </li>
  )
}

function DesktopNavigation({ props, documents }: { props: React.ComponentPropsWithoutRef<'nav'>, documents: DocumentFile[] }) {
  let { colors, scope, etude } = useContext(AppContext)

  return (
    <nav {...props}>
      <ul className="flex rounded-full px-3 text-sm font-medium text-zinc-800 shadow-lg shadow-zinc-800/5 ring-1 ring-zinc-900/5 backdrop-blur  " style={{ background: colors.attributes.tintedBackground }}>
        <Navigation documents={documents}></Navigation>
      </ul>
    </nav>
  )
}




function AvatarContainer({
  className,
  ...props
}: React.ComponentPropsWithoutRef<'div'>) {
  return (
    <div
      className={clsx(
        className,
        'h-10 w-10 rounded-md p-0.5',
      )}
      {...props}
    />
  )
}

function Avatar({
  large = false,
  className,
  ...props
}: Omit<React.ComponentPropsWithoutRef<typeof Link>, 'href'> & {
  large?: boolean
}) {
  let { scope } = useContext(AppContext);

  return (
    <Link
      href={`/${scope}`}
      aria-label="Home"
      className={clsx(className, 'pointer-events-auto')}
      {...props}
    >
      <Image
        src={avatarImage}
        alt=""
        sizes={large ? '4rem' : '2.25rem'}
        className={clsx(
          'rounded-md  object-cover',
          large ? 'h-32 w-32' : 'h-9 w-9',
        )}
        priority
      />
    </Link>
  )
}



export function Header() {

  let headerRef = useRef<React.ElementRef<'div'>>(null)

  let [documents, setDocuments] = useState<DocumentFile[]>([])

  useEffect(() => {

    async function fetchDocuments() {
      let documentsCall: ApiListResponse<DocumentFile> = await call('documents?populate=*', Method.get)
      setDocuments(documentsCall.data)
    }

    fetchDocuments()



  }, [])

  const [isScrolled, setIsScrolled] = useState(false);
  let pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      // Set isScrolled to true if the page is scrolled more than 50 pixels, otherwise false
      const position = window.scrollY > 50;
      setIsScrolled(position);
    };

    handleScroll()
    // Attach the event listener
    window.addEventListener('scroll', handleScroll);
    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };

  }, [pathname]);
  let { colors, scope } = useContext(AppContext)

  return (
    <>
      <header
        className="pointer-events-none  w-full z-50 flex flex-none flex-col fixed top-0"
        style={{
          height: 'var(--header-height)',
          marginBottom: 'var(--header-mb)',
        }}
      >

        <div
          ref={headerRef}
          className={`top-0 z-10  ${isScrolled ? 'h-18 pt-4 pb-4' : 'h-22 pt-6 pb-6'} transition-all duration-200 ease-in-out ${isScrolled ? 'shadow-lg' : ''} backdrop-blur-lg pointer-events-auto w-full`}
          style={{
            backgroundColor: isScrolled ? colors.attributes.background : "transparent",
            position:
              'var(--header-position)' as React.CSSProperties['position'],
          }}
        >
          <Container
            className="top-[var(--header-top,theme(spacing.6))] w-full"
            style={{
              position:
                'var(--header-inner-position)' as React.CSSProperties['position'],
            }}
          >
            <div className="relative flex gap-4">
              <div className="flex ">
                <AvatarContainer>
                  <Avatar />
                </AvatarContainer>
                <Link className='flex items-center text-xs cursor-pointer rounded-full px-4 py-2 ml-2 font-medium'
                  href={`/${scope == Scope.Cast ? Scope.Caulnes : Scope.Cast}/${pathname.split("/").slice(2).join("/")} `}
                  style={{ color: colors.attributes.accent, background: colors.attributes.tintedBackground }}
                > <div className='max-lg:hidden'>Accéder à l'étude de&nbsp;</div> {capitalizeFirstLetter(scope == Scope.Cast ? Scope.Caulnes : Scope.Cast)} <ChevronRightIcon className='h-4 w-4 ml-2'></ChevronRightIcon>
                </Link>
              </div>
              <div className="flex ml-auto justify-end md:justify-center">
                <MobileNavigation props={{ className: "pointer-events-auto md:hidden" }} documents={documents} />
                <DesktopNavigation props={{ className: "pointer-events-auto hidden md:block" }} documents={documents} />
              </div>
            </div>
          </Container>
        </div >
      </header >




    </>
  )
}
