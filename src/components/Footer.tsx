"use client"
import { useContext } from 'react'
import { AppContext } from '@/app/providers'

import { RiFacebookCircleFill, RiInstagramFill, RiTwitterXFill, RiYoutubeFill } from '@remixicon/react'
import Link from 'next/link'

export function Footer() {
  let { colors, lienEtSocial, etude, contenusAffiches } = useContext(AppContext)
  const navigation = {
    links: [
      { name: "L'équipe", href: `/${etude.attributes.slug}/equipe` },
      { name: "Annonces", href: `/${etude.attributes.slug}/annonces` },
      { name: "Services", href: `/${etude.attributes.slug}/services` },
      { name: "Articles", href: `/${etude.attributes.slug}/articles` },
      { name: "Contact", href: `/${etude.attributes.slug}/contact` },
    ],
    legals: [
      { name: "Mentions légales", href: `/${etude.attributes.slug}/legals` },
      { name: "Politique de confidentialité", href: `/${etude.attributes.slug}/privacy` },
      { name: "Conditions générales d'utilisation", href: `/${etude.attributes.slug}/usage` },
    ],
    social: [
      {
        name: 'Facebook',
        href: lienEtSocial.attributes.facebook,
        Icon: RiFacebookCircleFill,
      },
      {
        name: 'Instagram',
        href: lienEtSocial.attributes.instagram,
        Icon: RiInstagramFill,
      },
      {
        name: 'X',
        href: lienEtSocial.attributes.twitter,
        Icon: RiTwitterXFill,
      },
      {
        name: 'YouTube',
        href: lienEtSocial.attributes.youtube,
        Icon: RiYoutubeFill,
      },
    ],
  }

  return (
    <>
      <div className='h-16 -mt-1 shrink-0' style={{ backgroundColor: colors.attributes.background }} ></div>
      <div style={{ backgroundColor: colors.attributes.tintedBackground }}>

        <div className="absolute right-16 pt-16 h-16 overflow-hidden w-full !-translate-y-16">
          <div className="flex -mt-px h-[2px] leftw-[20vw] -scale-x-100 opacity-50">
            <div
              style={{
                backgroundImage: `linear-gradient(90deg, rgba(56,189,248,0) 0%, ${colors.attributes.primary} 32.29%, rgba(236,72,153,0.3) 67.19%, rgba(236,72,153,0) 100%)`
              }}
              className={`w-full flex-none blur-sm `}>
            </div>
            <div
              style={{
                backgroundImage: `linear-gradient(90deg, rgba(56,189,248,0) 0%, ${colors.attributes.primary} 32.29%, rgba(236,72,153,0.3) 67.19%, rgba(236,72,153,0) 100%)`
              }}
              className={`-ml-[100%] w-full flex-none blur-[1px]`}>
            </div>
          </div>
        </div>
        <footer aria-labelledby="footer-heading" >
          <h2 id="footer-heading" className="sr-only">
            Footer
          </h2>
          <div className="mx-auto max-w-7xl px-6 pb-8 pt-16 sm:pt-24 lg:px-8">
            <div className="xl:grid xl:grid-cols-3 xl:gap-8">
              <div className="space-y-8">
                <h2 className="text-sm font-semibold leading-6" style={{ color: colors.attributes.accent }}>
                  {lienEtSocial.attributes.titre}
                </h2>
                <p className="text-sm leading-6"

                  style={{ color: colors.attributes.indicator }}
                >
                  {lienEtSocial.attributes.description}
                </p>


                <div className="flex space-x-6">

                  {navigation.social.map((item) => {
                    if (item.name != 'Facebook') return

                    return (
                      <a key={item.name} href={item.href}
                        className='flex items-center gap-2'
                        target='_blank'
                        style={{ color: colors.attributes.accent }}
                      // className="text-gray-400 hover:text-gray-500"
                      >
                        <item.Icon aria-hidden="true" className="h-10 w-10" />
                        <span className='text-xl font-bold'>{item.name}</span>

                      </a>
                    )
                  })}
                </div>
                <div className="flex space-x-6">
                  {navigation.social.map((item) => {

                    if (item.name == 'Facebook') return

                    return (
                      <a key={item.name} href={item.href}
                        target='_blank'
                        style={{ color: colors.attributes.indicator }}
                      // className="text-gray-400 hover:text-gray-500"
                      >
                        <span className="sr-only">{item.name}</span>
                        <item.Icon aria-hidden="true" className="h-6 w-6" />
                      </a>
                    )
                  })}
                </div>
              </div>
              <div className="mt-16 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
                <div className="md:grid md:grid-cols-2 md:gap-8">
                  <div>
                    <h3 className="text-sm font-semibold leading-6"
                      style={{ color: colors.attributes.accent }}>Navigation</h3>
                    <ul role="list" className="mt-6 space-y-4">
                      {navigation.links.map((item) => (
                        <li key={item.name}>
                          <a href={item.href} className="text-sm leading-6"
                            style={{ color: colors.attributes.indicator }}>
                            {item.name}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-10 md:mt-0">
                    <h3 className="text-sm font-semibold leading-6"
                      style={{ color: colors.attributes.accent }}>Legal</h3>
                    <ul role="list" className="mt-6 space-y-4">
                      {navigation.legals.map((item) => (
                        <li key={item.name}>
                          <a href={item.href} className="text-sm leading-6"
                            style={{ color: colors.attributes.indicator }}>
                            {item.name}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="mt-10 md:mt-0">
                  <h3 className="text-sm font-semibold leading-6 mb-6" style={{ color: colors.attributes.accent }}>Horaires d'ouverture</h3>

                  <table className=" text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0 whitespace-pre-line gap-2 flex flex-col" style={{ color: colors.attributes.indicator }}>
                    <tbody>
                      {Object.keys(etude.attributes.ouvertures).map((day) => {
                        if (day === "id") return null;

                        return (
                          <tr key={day}>
                            <td className='pr-4 max-sm:block max-sm:mt-2'>{day} </td>
                            <td className="flex items-center flex-wrap">
                              {etude.attributes.ouvertures[day].map((ouverture, index) => (
                                <span key={index} className="block whitespace-nowrap">
                                  {index > 0 && <>&nbsp;et </>}
                                  {`${ouverture.start.split(".")[0].split(":").slice(0, -1).join(":")}-${ouverture.end.split(".")[0].split(":").slice(0, -1).join(":")}`}
                                </span>
                              ))}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>

                  {contenusAffiches.attributes.maskMeetings != true &&
                    <Link href={`/${etude.attributes.slug}/rendezvous`} className="block mt-6 text-sm leading-6"
                      style={{ color: colors.attributes.accent }}>
                      Prendre rendez-vous →
                    </Link>
                  }
                </div>
              </div>
            </div>
            <div className="mt-16 border-t pt-8 sm:mt-20 lg:mt-24"
              style={{ color: colors.attributes.divider }}>
              <p className="text-xs leading-5"
                style={{ color: colors.attributes.indicator }}>&copy;
                {new Date().getFullYear()} {lienEtSocial.attributes.copyright} - Tous droits réservés.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </>
  )
}
