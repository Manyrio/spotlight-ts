"use client"

import { useContext } from "react"
import { AppContext } from "./providers"
import { EtudePosition } from "@/models/etudes"
import Link from "next/link"

export default function HomePageContent() {

    let { etudes } = useContext(AppContext)


    return <>

        <div className="relative overflow-hidden -mb-16 ">

            <>

                <div className="mx-auto max-w-7xl w-full lg:h-screen ">

                    <div className={`hidden lg:block bg-gray-50 -z-0 absolute top-0 left-0  w-screen h-screen"} lg:absolute lg:inset-y-0 lg:w-[calc(50%+3vw)]`}>
                        <img
                            alt=""
                            key={EtudePosition.right}
                            src={"https://adminpreview.hicards.fr" + etudes[0].attributes.image.data.attributes.url}
                            className="  aspect-[3/2] object-cover opacity-20 lg:aspect-auto lg:h-full lg:w-full"
                        />
                    </div>

                    <div className={`hidden lg:block bg-gray-50 -z-0 absolute top-0 left-[50vw]  w-screen h-screen"} lg:absolute lg:inset-y-0 lg:w-[calc(50%+3vw)]`}>
                        <img
                            alt=""
                            key={EtudePosition.right}
                            src={"https://adminpreview.hicards.fr" + etudes[1].attributes.image.data.attributes.url}
                            className="  aspect-[3/2] object-cover opacity-20 lg:aspect-autp lg:h-full lg:w-full"
                        />
                    </div>

                    <div className="hidden lg:block absolute inset-0 left-[50vw] w-[50vw] z-30 bg-gradient-to-tr from-white/50 via-white/0 mix-blend-overlay" />

                    <div className="hidden lg:block absolute inset-0 left-[0vw] w-[50vw] z-30 bg-gradient-to-tl from-white/50 via-white/0 mix-blend-overlay" />

                    <div className={`relative z-40 pt-14 w-full `}>
                        <div className="relative px-6 py-20 lg:px-8 sm:py-30   w-full">
                            <div className={` w-full flex flex-col lg:flex-row gap-12 lg:mx-0 `}>



                                {
                                    etudes.map(etude => {

                                        let position = etude.attributes.position
                                        let colors = etude.attributes.colors.data
                                        return (
                                            <div className={`${position == EtudePosition.right ? "lg:text-right" : "lg:text-left"}`}>

                                                <h1 style={{ color: colors.attributes.accent }} className={`text-4xl font-bold tracking-tight sm:text-6xl ${position == EtudePosition.right ? 'lg:pr-[1.5vw]' : 'lg:pl-[1.5vw]'} ${position == EtudePosition.right ? 'lg:translate-x-[1.5vw]' : 'lg:-translate-x-[1.5vw]'} !transition-[transform] !duration-[500ms]`}>
                                                    {etude.attributes.name}
                                                </h1>
                                                <p style={{ color: colors.attributes.indicator }} className={`mt-6 text-lg leading-8 ${position == EtudePosition.right ? 'lg:pr-[2vw]' : 'lg:pl-[2vw]'} ${position == EtudePosition.right ? 'lg:translate-x-[2vw]' : 'lg:-translate-x-[2vw]'} !transition-[transform] !duration-[500ms]`}>
                                                    {etude.attributes.description}
                                                </p>
                                                <div className={`mt-10 flex items-center gap-x-6 ${position == EtudePosition.right ? "lg:flex-row-reverse" : ""}  ${position == EtudePosition.right ? 'lg:pr-[2.5vw]' : 'lg:pl-[2.5vw]'} ${position == EtudePosition.right ? 'lg:translate-x-[2.5vw]' : 'lg:-translate-x-[2.5vw]'} !transition-[transform] !duration-[500ms]`}>
                                                    <Link
                                                        href={`/${etude.attributes.slug}/`}
                                                        style={{ background: colors.attributes.primary }}
                                                        className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm drop-shadow-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                                    >
                                                        Accéder
                                                    </Link>
                                                    <Link
                                                        style={{ color: colors.attributes.accent }} href={`/${etude.attributes.slug}/contact`} className="text-sm font-semibold leading-6 text-gray-900">
                                                        Contact <span aria-hidden="true">→</span>
                                                    </Link>
                                                </div>
                                            </div>
                                        )
                                    })
                                }

                            </div>
                        </div>
                    </div>
                </div>


                {/* <div className="absolute !z-50 mix-blend-multiply opacity-50 pointer-events-none -top-[1rem] left-1/2 -ml-[40rem] w-[163.125rem] max-w-none sm:-ml-[67.5rem]">
                    <img src="https://tailwindui.com/img/beams-home@95.jpg" alt="" className={`lg:!z-50 lg:!-scale-x-100 `} />
                </div> */}

            </>




        </div>


    </>

}