

"use client"
import { useContext, useState } from 'react'
import { ArrowRightIcon, Bars3Icon, ChevronDownIcon, ChevronRightIcon, ChevronUpIcon } from '@heroicons/react/24/outline'
import { Container } from '@/components/Container'
import { Button } from '@/components/Button'
import { Annonce, AnnonceObject, TypeTransaction } from '@/models/annonce'
import { formatLocalisation } from '@/models/localisation'
import Link from 'next/link'
import { AppContext } from '../providers'
import { Member } from '@/models/members'
import { EtudePosition } from '@/models/etudes'
import { capitalizeFirstLetter } from '@/scripts/capitalize'
import { Carousel } from 'react-responsive-carousel'
import { CarouselComponent } from '@/models/carousel'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { ElementAnnonce } from './annonces/content'




export default function HomeContent({ members, carousel, annonces }: { members: Member[], carousel: CarouselComponent, annonces: AnnonceObject[] }) {

    const { etude, colors, scope } = useContext(AppContext)

    let position = etude.attributes.position


    let memberIndex = 0

    return (
        <>

            <style>{`
          
                .mainBeam {
                display:none;
                }
            `}</style>




            <div className="relative overflow-hidden ">



                <div className="mx-auto relative max-w-7xl w-full lg:h-screen ">
                    <svg
                        viewBox="0 0 100 100"
                        preserveAspectRatio="none"
                        aria-hidden="true"
                        className={`absolute top-0 inset-y-0   z-10  ${position == EtudePosition.right ? " lg:!-scale-x-100 lg:right-[45%]" : " lg:!scale-x-100 lg:left-[45%]"}  hidden h-screen w-80   lg:block`}
                        style={{ fill: colors.attributes.background }}
                    >
                        <polygon points="0,0 90,0 50,100 0,100" />
                    </svg>

                    <div className={`relative z-40 pt-16 lg:pt-40 lg:w-full duration-300 transition-transform lg:max-w-[50%] ${position == EtudePosition.right ? " lg:ml-[50%]" : " lg:ml-0"}  `}>

                        <div className="relative py-20   sm:py-30  lg:pr-0">
                            <div className={`mx-auto max-w-2xl px-6 xl:px-0 lg:mx-0 lg:max-w-xl ${position == EtudePosition.right ? "lg:text-right" : "lg:text-left"}`}>

                                <h1 style={{ color: colors.attributes.accent }} className={`titleFont text-4xl font-bold tracking-tight sm:text-6xl ${position == EtudePosition.right ? 'lg:pr-[1.5vw]' : 'lg:pl-[1.5vw]'} ${position == EtudePosition.right ? 'lg:translate-x-[1.5vw]' : 'lg:-translate-x-[1.5vw]'} !transition-[transform] !duration-[500ms]`}>
                                    {etude.attributes.name}
                                </h1>
                                <p style={{ color: colors.attributes.indicator }} className={`mt-6 text-lg leading-8 ${position == EtudePosition.right ? 'lg:pr-[2vw]' : 'lg:pl-[2vw]'} ${position == EtudePosition.right ? 'lg:translate-x-[2vw]' : 'lg:-translate-x-[2vw]'} !transition-[transform] !duration-[500ms]`}>
                                    {etude.attributes.description}
                                </p>
                                <div className={`mt-10 flex items-center gap-x-6 ${position == EtudePosition.right ? "lg:flex-row-reverse" : ""}  ${position == EtudePosition.right ? 'lg:pr-[2.5vw]' : 'lg:pl-[2.5vw]'} ${position == EtudePosition.right ? 'lg:translate-x-[2.5vw]' : 'lg:-translate-x-[2.5vw]'} !transition-[transform] !duration-[500ms]`}>
                                    <Link
                                        href={`/${scope}/rendezvous`}
                                        style={{ background: colors.attributes.primary }}
                                        className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm drop-shadow-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                    >
                                        Prendre rendez-vous
                                    </Link>
                                    <Link
                                        style={{ color: colors.attributes.accent }} href={`/${scope}/contact`} className="text-sm font-semibold leading-6 text-gray-900">
                                        Contact <span aria-hidden="true">→</span>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


                <div className={`hidden lg:block bg-gray-50 opacity-1 -ml-[3vw] -z-0 absolute top-0 left-0  w-screen h-screen   lg:left-[1vw] lg:-translate-x-[1vw]  ${position == EtudePosition.right ? "" : "lg:!left-[49vw] lg:!translate-x-[1vw] lg:!ml-[1vw]"} lg:absolute lg:inset-y-0  !transition-[transform] !duration-[500ms]  lg:w-[calc(50%+3vw)]`}>


                    {
                        position == EtudePosition.right ?
                            <img
                                alt=""
                                key={EtudePosition.right}
                                src={process.env.NEXT_PUBLIC_BACKEND_URL + etude.attributes.image.data.attributes.url}
                                className="  aspect-[3/2] object-cover lg:aspect-auto lg:h-full lg:w-full"
                            /> :
                            <img
                                alt=""
                                key={EtudePosition.left}
                                src={process.env.NEXT_PUBLIC_BACKEND_URL + etude.attributes.image.data.attributes.url}
                                className=" aspect-[3/2] object-cover lg:aspect-auto lg:h-full lg:w-full"
                            />
                    }

                </div>
                <div style={{ background: colors.attributes.background }} className={`hidden  lg:block pointer-events-none absolute w-full h-full inset-0 z-50  ${position == EtudePosition.right ? "lg:opacity-0 lg:translate-x-[0]" : "lg:opacity-100 lg:translate-x-[100vw]"}  transition-opacity duration-300`} />
                <div style={{ background: colors.attributes.background }} className={`hidden lg:block pointer-events-none absolute w-full h-full inset-0 z-50  ${position != EtudePosition.right ? "lg:opacity-0 lg:translate-x-[0]" : "lg:opacity-100 lg:translate-x-[100vw]"}  transition-opacity duration-300 `} />

                <div className="absolute !z-50 mix-blend-multiply opacity-50 pointer-events-none -top-[1rem] left-1/2 -ml-[40rem] w-[163.125rem] max-w-none sm:-ml-[67.5rem]">
                    <img src="/beams-home@95.jpg" alt="" className={`!z-50 !-scale-x-100 ${position == 'right' ? '!-scale-x-100' : '!scale-x-100'}`} />
                </div>


            </div>
            <div className="
            border-t
                    "
                style={{ borderColor: colors.attributes.divider }}
            />

            <Container>





                <div className="absolute -top-px right-16 h-8 overflow-hidden w-full">
                    <div className="flex -mt-px h-[2px] leftw-[20vw] -scale-x-100">
                        <div className="w-full flex-none blur-sm [background-image:linear-gradient(90deg,rgba(56,189,248,0)_0%,#0EA5E9_32.29%,rgba(236,72,153,0.3)_67.19%,rgba(236,72,153,0)_100%)]">
                        </div>
                        <div className="-ml-[100%] w-full flex-none blur-[1px] [background-image:linear-gradient(90deg,rgba(56,189,248,0)_0%,#0EA5E9_32.29%,rgba(236,72,153,0.3)_67.19%,rgba(236,72,153,0)_100%)]">
                        </div>
                    </div>
                </div>


                <div className=' full pt-24  w-full'>
                    <div className='flex gap-8 w-full  flex-col lg:flex-row   max-w-7xl justify-between'>
                        <div>
                            <h2 className=" text-3xl font-bold tracking-tight   text-4xl"
                                style={{ color: colors.attributes.accent }}
                            >
                                L'office
                            </h2>
                            <p className="mt-6 dark:text-gray-200 text-base"
                                style={{ color: colors.attributes.indicator }}
                            >
                                Découvrez {etude.attributes.name}
                            </p>



                            <div className='text-base mt-6'
                                style={{ color: colors.attributes.indicator }}>
                                {etude.attributes.description}
                            </div>

                            <Button className='mt-4' href={scope + "/office"}
                                style={{ background: colors.attributes.primary }}
                            >Découvrir l'office</Button>


                        </div>
                        <Carousel className='mb-16 max-w-2xl block static'
                            showThumbs={false}
                            autoPlay={true}
                            interval={2000}
                            infiniteLoop={true}
                            showStatus={false}>
                            {carousel.attributes.images.data.map((image, index) => (
                                <img key={index} src={`${process.env.NEXT_PUBLIC_BACKEND_URL}${image.attributes.url}`} className="h-full w-full object-cover object-center rounded-md" />
                            ))}
                        </Carousel>
                    </div>
                </div>




                <div className="isolate w-full">




                    {/* Content section */}
                    <div className="mx-auto max-w-7xl  sm:mt-0 pt-20">
                        <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-none">
                            <h2 className=" text-3xl font-bold tracking-tight   text-4xl" style={{ color: colors.attributes.accent }}>Nous trouver</h2>
                            <div className="mt-6 flex flex-col gap-x-8 gap-y-20 lg:flex-row">
                                <div className="lg:w-full lg:max-w-2xl lg:flex-auto">




                                    <div className={`overflow-hidden mb-8`} >

                                        <div className=" sm:px-0 relative flex flex-col justify-center  cursor-pointer" >
                                            <h3 className=" text-base font-semibold  truncate " style={{ color: colors.attributes.accent }} >{etude.attributes.name}</h3>
                                            <p className=" max-w-2xl  text-sm leading-6  " style={{ color: colors.attributes.indicator }} >{etude.attributes.addressDescription}</p>


                                        </div>
                                        <div className="mt-6 border-t border-gray-100"
                                            style={{ borderColor: colors.attributes.divider }}>
                                            <dl className="divide-y divide-gray-100"

                                            >
                                                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0"
                                                    style={{ borderColor: colors.attributes.divider }}
                                                >
                                                    <dt className=" text-sm font-medium leading-6 " style={{ color: colors.attributes.accent }}>Adresse complète</dt>
                                                    <dd className="mt-1  text-sm leading-6   sm:col-span-2 sm:mt-0" style={{ color: colors.attributes.indicator }}>
                                                        {etude.attributes.address}</dd>
                                                </div>
                                                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0"
                                                    style={{ borderColor: colors.attributes.divider }}
                                                >
                                                    <dt className=" text-sm font-medium leading-6  text-gray-900" style={{ color: colors.attributes.accent }}>Adresse e-mail</dt>
                                                    <a className="mt-1  text-sm leading-6  text-gray-700 sm:col-span-2 sm:mt-0 underline" style={{ color: colors.attributes.indicator }}
                                                        href={'mailto:' + etude.attributes.email}
                                                    >{etude.attributes.email}</a>
                                                </div>
                                                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0"
                                                    style={{ borderColor: colors.attributes.divider }}
                                                >
                                                    <dt className=" text-sm font-medium leading-6  text-gray-900" style={{ color: colors.attributes.accent }}>Numéro de téléphone</dt>
                                                    <a className="mt-1  text-sm leading-6  text-gray-700 sm:col-span-2 sm:mt-0 underline" style={{ color: colors.attributes.indicator }}
                                                        href={'tel:' + etude.attributes.phone}
                                                    >{etude.attributes.phone}</a>
                                                </div>
                                                {etude.attributes.ouvertures &&
                                                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0"
                                                        style={{ borderColor: colors.attributes.divider }}
                                                    >
                                                        <dt className=" text-sm font-medium leading-6  text-gray-900 " style={{ color: colors.attributes.accent }}>Horaires</dt>
                                                        <table className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0 whitespace-pre-line gap-2 flex flex-col" style={{ color: colors.attributes.indicator }}>
                                                            <tbody>
                                                                {Object.keys(etude.attributes.ouvertures).map((day) => {
                                                                    if (day === "id") return null;

                                                                    return (
                                                                        <tr key={day}>
                                                                            <td className='pr-4 max-sm:block'>{day} </td>
                                                                            <td className="flex items-center">
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
                                                    </div>
                                                }


                                            </dl>
                                        </div>
                                    </div>





                                </div>
                                <div className="lg:flex w-full lg:flex-auto lg:justify-center">
                                    <dl className="w-full  space-y-8 xl:w-80">
                                        <iframe src={etude.attributes.mapUrl} width="500" height="450" className={"w-full h-[300px] lg:h-[450px] lg:w-[500px]  rounded-md"} style={{ "border": 0 }} allowFullScreen loading="lazy"></iframe>
                                    </dl>
                                </div>
                            </div>
                        </div>
                    </div>



                    {/* Team section */}
                    <div className="mx-auto mt-32 max-w-7xl  sm:mt-30 ">
                        <div className="mx-auto max-w-2xl lg:mx-0">
                            <h2 className=" text-3xl font-bold tracking-tight   text-4xl" style={{ color: colors.attributes.accent }}>Rencontrez l'équipe</h2>
                            <p className="mt-6  text-lg leading-8 " style={{ color: colors.attributes.indicator }}>
                                Notre équipe multidisciplinaire est composée de professionnels expérimentés et passionnés.
                            </p>
                            <Link href={`/${scope}/equipe`} className='border-b border-indigo-400 w-fit mt-2  text-indigo-400 flex items-center' style={{ color: colors.attributes.primary, borderColor: colors.attributes.primary }}>Voir toute l'équipe <ChevronRightIcon className='h-4 w-4 ml-2'></ChevronRightIcon></Link>
                        </div>
                        <ul
                            role="list"
                            className="mx-auto mt-12 grid max-w-2xl grid-cols-2 gap-x-8 gap-y-16  text-center sm:grid-cols-3 md:grid-cols-4 lg:mx-0 lg:max-w-none lg:grid-cols-5 xl:grid-cols-6"
                        >
                            {members.map((member, index: number) => {
                                let allowed = false
                                member.attributes.etudes.data.forEach(element => {
                                    if (element.attributes.slug == etude.attributes.slug) allowed = true
                                });


                                if (!allowed || memberIndex > 5) return
                                memberIndex++
                                return (
                                    <li key={member.attributes.name}>
                                        <img className="mx-auto h-24 w-24 rounded-full object-cover object-top" src={process.env.NEXT_PUBLIC_BACKEND_URL + (member.attributes.image.data ? member.attributes.image.data[0].attributes.url : "")} alt="" />
                                        <h3 className="mt-6  text-base font-semibold leading-7 tracking-tight  text-gray-900" style={{ color: colors.attributes.indicator }}>{member.attributes.name}</h3>
                                        <p className=" text-sm leading-6  text-gray-600" style={{ color: colors.attributes.hint }}>{member.attributes.role}</p>
                                    </li>
                                )
                            })}
                        </ul>
                    </div>

                    {/* Blog section */}
                    <div className="mx-auto mt-32 max-w-7xl sm:mt-40 ">
                        <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-none">
                            <h2 className=" text-3xl font-bold tracking-tight  text-gray-900  text-4xl" style={{ color: colors.attributes.accent }}>Annonces immobilières</h2>
                            <p className="mt-2  text-lg leading-8  text-gray-600" style={{ color: colors.attributes.indicator }}>
                                Parcourez toutes nos annonces immobilières et trouvez la maison de vos rêves.
                            </p>
                            <Link href={`/${scope}/annonces`} className='border-b border-indigo-400 w-fit mt-2  text-indigo-400 flex items-center' style={{ color: colors.attributes.primary, borderColor: colors.attributes.primary }}>Voir toutes les annonces <ChevronRightIcon className='h-4 w-4 ml-2'></ChevronRightIcon></Link>

                        </div>
                        <div className="mx-auto mt-16 grid max-w-2xl auto-rows-fr grid-cols-1 gap-8 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
                            {annonces.map((annonce, index) => {
                                if (index > 2) return


                                return (
                                    <ElementAnnonce annonceObject={annonce} shrinked={true}></ElementAnnonce>
                                )
                            })}

                        </div>
                    </div>
                </div>
            </Container >
        </>
    )
}
