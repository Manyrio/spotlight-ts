"use client"
import { useContext } from 'react'
import { AppContext } from '@/app/providers'

import { parse, format } from 'date-fns';
import { RiFacebookBoxLine, RiFacebookCircleFill, RiInstagramFill, RiInstagramLine, RiTwitterXFill, RiTwitterXLine, RiYoutubeFill, RiYoutubeLine } from '@remixicon/react'

export function Footer() {
  let { colors, lienEtSocial, etude, scope } = useContext(AppContext)

  const navigation = {
    links: [
      { name: "L'équipe", href: `/${scope}/equipe` },
      { name: "Annonces", href: `/${scope}/annonces` },
      { name: "Services", href: `/${scope}/services` },
      { name: "Articles", href: `/${scope}/articles` },
      { name: "Contact", href: `/${scope}/contact` },
    ],
    legals: [
      { name: "Mentions légales", href: `/${scope}/legals` },
      { name: "Politique de confidentialité", href: `/${scope}/privacy` },
      { name: "Conditions générales d'utilisation", href: `/${scope}/usage` },
    ],
    timeline: [
      {
        name: "Lundi",
        hours: etude.attributes.ouvertures.lundi.map((hour) => `${parse("1970-01-01T" + hour.start, 'yyyy-MM-dd\'T\'HH:mm:ss.SSS', new Date()).getHours()}h - ${parse("1970-01-01T" + hour.end, 'yyyy-MM-dd\'T\'HH:mm:ss.SSS', new Date()).getHours()}h`),
        // ["9h - 12h", "14h - 18h"]
      },
      {
        name: "Mardi",
        hours: etude.attributes.ouvertures.mardi.map((hour) => `${parse("1970-01-01T" + hour.start, 'yyyy-MM-dd\'T\'HH:mm:ss.SSS', new Date()).getHours()}h - ${parse("1970-01-01T" + hour.end, 'yyyy-MM-dd\'T\'HH:mm:ss.SSS', new Date()).getHours()}h`)
      },
      {
        name: "Mercredi",
        hours: etude.attributes.ouvertures.mercredi.map((hour) => `${parse("1970-01-01T" + hour.start, 'yyyy-MM-dd\'T\'HH:mm:ss.SSS', new Date()).getHours()}h - ${parse("1970-01-01T" + hour.end, 'yyyy-MM-dd\'T\'HH:mm:ss.SSS', new Date()).getHours()}h`)
      },
      {
        name: "Jeudi",
        hours: etude.attributes.ouvertures.jeudi.map((hour) => `${parse("1970-01-01T" + hour.start, 'yyyy-MM-dd\'T\'HH:mm:ss.SSS', new Date()).getHours()}h - ${parse("1970-01-01T" + hour.end, 'yyyy-MM-dd\'T\'HH:mm:ss.SSS', new Date()).getHours()}h`)
      },
      {
        name: "Vendredi",
        hours: etude.attributes.ouvertures.vendredi.map((hour) => `${parse("1970-01-01T" + hour.start, 'yyyy-MM-dd\'T\'HH:mm:ss.SSS', new Date()).getHours()}h - ${parse("1970-01-01T" + hour.end, 'yyyy-MM-dd\'T\'HH:mm:ss.SSS', new Date()).getHours()}h`)
      },
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
    <div className='mt-16' >

      <div className="absolute right-16 pt-16 h-16 overflow-hidden w-full !-translate-y-16">
        <div className="flex -mt-px h-[2px] leftw-[20vw] -scale-x-100 opacity-50">
          <div className="w-full flex-none  blur-sm [background-image:linear-gradient(90deg,rgba(56,189,248,0)_0%,#0EA5E9_32.29%,rgba(236,72,153,0.3)_67.19%,rgba(236,72,153,0)_100%)]">
          </div>
          <div className="-ml-[100%] w-full flex-none blur-[1px] [background-image:linear-gradient(90deg,rgba(56,189,248,0)_0%,#0EA5E9_32.29%,rgba(236,72,153,0.3)_67.19%,rgba(236,72,153,0)_100%)]">
          </div>
        </div>
      </div>
      <footer aria-labelledby="footer-heading" style={{ backgroundColor: colors.attributes.tintedBackground }}>
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
                {navigation.social.map((item) => (
                  <a key={item.name} href={item.href}
                    target='_blank'
                    style={{ color: colors.attributes.accent }}
                  // className="text-gray-400 hover:text-gray-500"
                  >
                    <span className="sr-only">{item.name}</span>
                    <item.Icon aria-hidden="true" className="h-6 w-6" />
                  </a>
                ))}
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
                <h3 className="text-sm font-semibold leading-6" style={{ color: colors.attributes.accent }}>Horaires d'ouverture</h3>
                <table className="mt-6 w-full">
                  <thead>
                    <tr>
                      <th className="text-sm font-semibold leading-6 text-left" style={{ color: colors.attributes.accent }}>Jour</th>
                      <th className="text-sm font-semibold leading-6 text-right" style={{ color: colors.attributes.accent }}>Heures</th>
                    </tr>
                  </thead>
                  <tbody>
                    {navigation.timeline.map((item) => (
                      <tr key={item.name}>
                        <td className="text-sm leading-6 text-left" style={{ color: colors.attributes.indicator }}>{item.name}</td>
                        <td className="text-sm leading-6 text-right" style={{ color: colors.attributes.indicator }}>
                          {item.hours.map((hour, index) => (
                            index !== 0 ? <span key={index} style={{ color: colors.attributes.indicator }}> et {hour}</span> :
                              <span key={index} style={{ color: colors.attributes.indicator }}>{hour}</span>
                          ))}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <a href="#" className="block mt-6 text-sm leading-6"
                  style={{ color: colors.attributes.accent }}>
                  Prendre rendez-vous →
                </a>
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
  )
}
