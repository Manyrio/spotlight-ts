'use client'
import { Container, ContainerInner } from '@/components/Container'
import { use, useContext } from 'react'
import { AppContext } from '@/app/providers'

import { BookOpenIcon, CheckBadgeIcon } from '@heroicons/react/24/outline'
import { Label } from '@/models/labels'

import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import TextSection from '@/components/TextSection'


export function OfficeContent({ labels }: { labels: Label[] }) {

  let { colors, etude } = useContext(AppContext)


  return (
    <>
      <div className='full flex justify-center items-center  w-full pt-32 lg:pt-48 pb:8 lg:pb-12 px-6'>

      </div>

      <Container >


        {etude.attributes.sections_textes_office.data.map((section, index) => {

          return (<>

            <TextSection section={section} etude={etude} />

          </>)
        }
        )}


        <h2 className=" text-3xl font-bold tracking-tight mt-16  text-4xl" style={{ color: colors.attributes.accent }}>Labels & certifications</h2>



        <ul role="list" className="divide-y divide-gray-100 mt-6">
          {labels.map((label) => (
            <li key={label.attributes.name} className="flex justify-between gap-x-6 py-5"
              style={{ borderColor: colors.attributes.divider }}
            >
              <div className="flex min-w-0 gap-x-4">

                {label.attributes.image.data ?
                  <img className='h-20 w-20 rounded-full shrink-0' src={process.env.NEXT_PUBLIC_BACKEND_URL + label.attributes.image.data.attributes.url}></img>
                  :
                  <div className='rounded-full flex h-20 w-20 items-center justify-center shrink-0' style={{ background: colors.attributes.tintedBackground }} >

                    <CheckBadgeIcon className="h-12 w-12 flex-none rounded-full " style={{ color: colors.attributes.hint }} />
                  </div>
                }

                <div className="min-w-0 flex-auto mt-1">
                  <p className="text-base font-semibold leading-6 text-gray-900" style={{ color: colors.attributes.accent }}>{label.attributes.name}</p>
                  <p className="mt-1  text-sm leading-5 text-gray-500 whitespace-pre-line w-full" style={{ color: colors.attributes.indicator }}>{label.attributes.description}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>

      </ Container>
    </>
  )
}
