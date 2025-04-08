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
import { AppContext } from '@/app/providers'
import { ArrowDownTrayIcon, BanknotesIcon, BuildingOfficeIcon, ChevronDownIcon, ChevronLeftIcon, ChevronRightIcon, SquaresPlusIcon, UserGroupIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { DocumentFile } from '@/models/documents'
import { Button } from './Button'




function Navigation({ documents }: { documents?: DocumentFile[] }) {

  let { scope, etude, colors, contenusAffiches } = useContext(AppContext)

  let documentsAsResource = documents?.map((document) => ({
    name: document.attributes.name,
    href: `${process.env.NEXT_PUBLIC_BACKEND_URL}${document.attributes.file.data.attributes.url}`,
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
              href: `${process.env.NEXT_PUBLIC_BACKEND_URL}${etude.attributes.pricing?.data?.attributes?.file?.data?.attributes?.url}`,
              description: `Consultez nos tarifs (${etude.attributes.name})`,
            },
            ...documentsAsResource as any
          ]
        }></DropDown>
    </NavItem>
    <NavItem href={`/${scope}/annonces`}><span className='font-bold'>Annonces Immobilières</span></NavItem>
    <NavItem href={`/${scope}/conseils`}>Conseils </NavItem >
    {contenusAffiches.attributes.maskArticles != true &&
      <NavItem href={`/${scope}/articles`}>Actualités</NavItem>
    }
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
  const buttonRef: any = useRef();
  const panelRef: any = useRef();
  let pathname = usePathname()


  useEffect(() => {

    if (panelRef.current) {
      buttonRef.current?.click();
    }
  }, [pathname]);


  return (
    <Popover className="relative">

      <PopoverButton ref={buttonRef} className="inline-flex items-center gap-x-1 leading-6 text-gray-900 outline-none truncate ">
        <span style={{ color: colors.attributes.accent }} >{name}</span>
        <ChevronDownIcon aria-hidden="true" className="ml-1 h-3 w-3" style={{ color: colors.attributes.accent }} />
      </PopoverButton>

      <PopoverPanel
        ref={panelRef}
        className="absolute left-1/2 z-10 mt-5 flex w-screen  max-w-max -translate-x-1/2 px-6  md:px-4 transition data-[closed]:translate-y-1 data-[closed]:opacity-0 data-[enter]:duration-200 data-[leave]:duration-150 data-[enter]:ease-out data-[leave]:ease-in"
      >
        <div className="w-screen max-w-md flex-auto overflow-hidden rounded-3xl bg-white text-sm leading-6 ring-1 ring-gray-900/5 shadow-2xl "

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
                    <div className='w-full'>
                      <div className="block text-xs leading-6 text-gray-600  w-full truncate" style={{ color: colors.attributes.indicator }}>
                        {resource.description}
                      </div>
                      <Link
                        onClick={() => buttonRef.current?.click()}
                        href={resource.href} className="block  w-full truncate text-sm font-semibold leading-6 text-gray-900"
                        style={{ color: colors.attributes.accent }}
                      >
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
  { props, documents, isScrolled }: { props: React.ComponentPropsWithoutRef<typeof Popover>, documents?: DocumentFile[], isScrolled: boolean }
) {
  let { colors, scope, contenusAffiches } = useContext(AppContext)
  const buttonRef: any = useRef();
  const panelRef: any = useRef();
  let pathname = usePathname()


  useEffect(() => {

    if (panelRef.current) {
      buttonRef.current?.click();
    }
  }, [pathname]);



  return (
    <Popover {...props}>
      <PopoverButton className="group flex items-center rounded-full  py-2 text-sm"
        style={{ color: colors.attributes.accent }}

      >
        Menu
        <ChevronDownIcon className="ml-3 h-auto w-5"
          style={{ color: colors.attributes.accent }}
        />
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
          <PopoverOverlay className="fixed h-screen w-screen inset-0 z-50 bg-zinc-800/40 backdrop-blur-sm"
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
            ref={panelRef}
            focus
            className="fixed top-8  inset-x-4 z-50 origin-top  "

          >
            <div className='w-full  h-full p-8 rounded-3xl ring-1 ring-zinc-900/5'
              style={{ background: colors.attributes.background }}
            >
              <div className="flex flex-row-reverse items-center justify-between">
                <PopoverButton ref={buttonRef} aria-label="Close menu" className="-m-1 p-1">
                  <XMarkIcon className="h-6 w-6 dark:text-gray-200 text-zinc-500 dark:dark:text-gray-200 text-zinc-400"
                    style={{ color: colors.attributes.accent }}
                  />
                </PopoverButton>
                <h2 className="dark:text-gray-200 text-sm font-medium dark:text-gray-200 text-zinc-600 dark:dark:text-gray-200 text-zinc-400"
                  style={{ color: colors.attributes.accent }}
                >
                  Menu
                </h2>
              </div>
              <nav className="mt-6">
                <ul className="-my-2 divide-y divide-zinc-100 dark:text-gray-200 text-base dark:text-gray-200 text-zinc-800 dark:divide-zinc-100/5 dark:dark:text-gray-200 text-zinc-300">
                  <Navigation documents={documents}></Navigation>
                </ul>
              </nav>

              {contenusAffiches.attributes.maskMeetings != true &&
                <Button
                  href={`/${scope}/rendezvous`}
                  style={{ background: colors.attributes.primary }}
                  className={`flex !text-white mt-6 lg:absolute lg:right-6 ${isScrolled ? 'lg:bottom-4' : 'lg:bottom-6'}`}
                >
                  Prendre rendez-vous
                  <ChevronRightIcon className="h-4 w-4 ml-auto lg:ml-2"></ChevronRightIcon>
                </Button>
              }
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
  let isActive = usePathname() == href

  let { colors } = useContext(AppContext)

  let Element = href ? Link : 'div'

  return (
    <li
      style={{ borderColor: colors.attributes.border }}
      className="group" // Ajout de la classe "group" pour gérer les états de survol
    >
      <Element
        href={href || "#"}
        className={clsx(
          'relative block md:px-3 py-2 transition whitespace-nowrap',
          isActive ? 'dark:text-gray-200' : ''
        )}
        style={{ color: isActive ? colors.attributes.primary : colors.attributes.accent }}
      >
        {children}
        <span
          className="absolute left-1/2 transform -translate-x-1/2 inset-x-1 w-0 group-hover:w-full -bottom-px h-px bg-gradient-to-r from-teal-500/0 via-teal-500/40 to-teal-500/0 opacity-0 group-hover:opacity-100 transition-all duration-300"
          style={{
            backgroundImage: `linear-gradient(to right, ${isActive ? colors.attributes.primary : colors.attributes.accent}10, ${isActive ? colors.attributes.primary : colors.attributes.accent}AA, ${isActive ? colors.attributes.primary : colors.attributes.accent}10)`,
          }}
        />
      </Element>
    </li>
  )
}

function DesktopNavigation({ props, documents, isScrolled }: { props: React.ComponentPropsWithoutRef<'nav'>, documents?: DocumentFile[], isScrolled: boolean }) {
  let { colors, scope, etude } = useContext(AppContext)

  return (
    <nav {...props}>
      <ul className={`flex rounded-full px-3 text-sm font-medium text-zinc-800 `} >
        <Navigation documents={documents}></Navigation>
      </ul>
    </nav>
  )
}

export function Header() {

  let headerRef = useRef<React.ElementRef<'div'>>(null)
  let { colors, etude, etudes, scope, logo, contenusAffiches } = useContext(AppContext)

  let documents = useContext(AppContext).documents


  const [isScrolled, setIsScrolled] = useState(false);
  let pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      // Set isScrolled to true if the page is scrolled more than 50 pixels, otherwise false
      const position = window.scrollY > 10;
      setIsScrolled(position);
    };

    handleScroll()
    // Attach the event listener
    window.addEventListener('scroll', handleScroll);
    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };

  }, [pathname, etude]);


  return (
    <>

      {scope != "" ?
        <>
          <header
            className="pointer-events-none  w-full z-[60] flex flex-none flex-col fixed top-0"
            style={{
              height: 'var(--header-height)',
              marginBottom: 'var(--header-mb)',
            }}
          >
            <div
              ref={headerRef}
              className={`top-0 z-10  ${isScrolled ? 'h-18 pt-4 pb-4' : 'h-22 pt-6 pb-6'} transition-all duration-200 ease-in-out pointer-events-auto w-full ${isScrolled ? 'shadow-lg backdrop-blur-xl ' : 'backdrop-blur-sm !bg-transparent'}`}
              style={{
                background: colors.attributes.background,
                position:
                  'var(--header-position)' as React.CSSProperties['position'],
              }}
            >
              <Container
                className="top-[var(--header-top,theme(spacing.6))] w-full lg:!px-6"
                style={{
                  position:
                    'var(--header-inner-position)' as React.CSSProperties['position'],
                }}
              >
                <div className={` relative transiton-all w-full flex items-start flex-col items-center gap-4 justify-end relative transition-all ${!isScrolled ? "lg:pt-32" : "pt-0"}`}>



                  <Link
                    href={`/`}
                    aria-label="Home"
                    className={`transition-all shrink-0  rounded-full   absolute flex flex-col items-center justify-center mr-14
                  ${!isScrolled ? `top-0 left-[calc(50%-48px)]` : `left-[calc(50%-24px)] -top-[4px] lg:left-0 lg:-top-[4px]`} `}

                  >
                    <img
                      src={process.env.NEXT_PUBLIC_BACKEND_URL! + logo?.attributes.logo.data.attributes.url!}
                      alt=""
                      className={clsx(
                        'object-contain transition-all shrink-0',
                        !isScrolled ? '!h-24 !w-24 p-3 ' : 'h-12 w-12 p-2',
                      )}
                    />
                    {<span
                      key={etude.id + isScrolled}
                      className={` absolute whitespace-nowrap text-base font-medium titleFont 
                     ${isScrolled ? `max-lg:hidden left-14 text-xs animate-opacity ` : `-bottom-4 animate-opacity`} 
                    `}
                      style={{
                        color: colors.attributes.indicator
                      }}
                    >{etude.attributes.name}</span>}

                  </Link>

                  <div className={`flex lg:ml-0 w-full justify-end md:justify-center transition-all `}>
                    <MobileNavigation props={{ className: `pointer-events-auto lg:hidden ml-auto` }} documents={documents} isScrolled={isScrolled} />
                    <DesktopNavigation props={{ className: "pointer-events-auto hidden lg:block ml-14" }} documents={documents} isScrolled={isScrolled} />
                  </div>

                </div>
              </Container>


              {contenusAffiches.attributes.maskMeetings != true &&
                <Button
                  href={`/${scope}/rendezvous`}
                  style={{ background: colors.attributes.primary }}
                  className={`hidden lg:flex !text-white lg:absolute lg:right-6 ${isScrolled ? 'lg:bottom-4' : 'lg:bottom-6'}`}
                >
                  Prendre rendez-vous
                  <ChevronRightIcon className="h-4 w-4 ml-auto lg:ml-2"></ChevronRightIcon>
                </Button>}
            </div >
          </header >
        </>
        :
        <header
          className='absolute  z-[60] top-0 left-0 w-full py-8 touch-none pointer-events-none'>
          <Link
            href={`/`}
            aria-label="Home"
            className={`transition-all shrink-0  rounded-full `}

          >
            <img

              src={process.env.NEXT_PUBLIC_BACKEND_URL! + logo?.attributes.logo.data.attributes.url!}
              alt=""
              className={clsx(
                'object-contain transition-all mx-auto shrink-0 w-16 h-16 lg:h-32 lg:w-32 '
              )}
            />
          </Link>
          <h1 className=" text-center mt-4 text-white font-bold text-xl lg:text-4xl w-full flex items-center justify-center titleFont">SELARL LAUBE, LHOMME, DELMAS</h1>


        </header >

      }




    </>
  )
}
