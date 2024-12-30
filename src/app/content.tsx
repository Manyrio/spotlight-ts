"use client"

import { useContext, useEffect, useState } from "react"
import { AppContext } from "./providers"
import { Etude, EtudePosition } from "@/models/etudes"
import Link from "next/link"
import { EnvelopeIcon, PhoneIcon } from "@heroicons/react/24/outline"

export default function HomePageContent() {

    let { etudes } = useContext(AppContext)

    const [hoveredEtude, setHoveredEtude] = useState<Etude>()


    return <>

        <div className="relative overflow-hidden z-20 -mb-16 ">

            <div className={`w-full lg:h-screen flex flex-col lg:flex-row  items-center  lg:mx-0 `}>
                {
                    etudes.map((etude, index) => {
                        if (index > 1) return null

                        let etudeColors = etude.attributes.colors.data
                        let position = etude.attributes.position
                        return (<><div
                            onTouchMoveCapture={() => setHoveredEtude(etude)}
                            onMouseEnter={() => setHoveredEtude(etude)}
                            onMouseLeave={() => setHoveredEtude(undefined)}

                            key={index} className={` h-full  z-10  w-full lg:w-[50vw]  relative  flex flex-col justify-start p-6 
                             ${position == EtudePosition.right ? "lg:text-right  py-12 lg:pr-32 lg:absolute right-0 lg:items-end " : "lg:text-left pt-48 pb-12 lg:pl-32 lg:absolute left-0 lg:items-start"}
                            transition-all duration-[400ms] 
                             ${hoveredEtude ? hoveredEtude?.id == etude.id ? "lg:!w-[70vw] lg:z-20" : "  lg:z-10 lg:!w-[30vw] " : "overflow-hidden"}

                             lg:pt-72
                             `}>
                            <div className={`
                                        z-20
                                        flex 
                                        flex-col
                                        lg:w-[calc(50vw-152px)]
                                        transition-[opacity]
                                        duration-[500ms] 
                                        ${hoveredEtude ? hoveredEtude?.id == etude.id ? "lg:opacity-1" : "lg:opacity-0 " : ""}
                                `}>



                                <h1 style={{ color: "white" }} className={`z-20 w-full overflow-hidden titleFont text-4xl font-bold tracking-tight sm:text-6xl
                    
                            `}>
                                    {etude.attributes.name}
                                </h1>

                                <div className={`mt-6 lg:mt-10 z-20 w-full   flex items-center gap-x-6 
                            ${position == EtudePosition.right ? "lg:justify-end" : ""}
                            `}>
                                    <Link
                                        href={`/${etude.attributes.slug}/`}
                                        style={{ background: etudeColors.attributes.primary }}
                                        className="rounded-md lg:text-lg bg-indigo-600 px-3.5 py-2.5 text-sm drop-shadow-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                    >
                                        Accéder
                                    </Link>

                                </div>

                                <div className={`flex flex-col gap-4 mt-6 ${position == EtudePosition.right ? "lg:items-end" : ""}

                            `}>

                                    <a className="flex items-center lg:text-xl gap-2 z-20 text-white hover:text-gray-300 cursor-pointer"
                                        href={`tel:${etude.attributes.phone}`}
                                    >
                                        <PhoneIcon className="h-5 w-5 text-white" aria-hidden="true" />
                                        {etude.attributes.phone}
                                    </a>

                                    <a className="flex items-center lg:text-xl gap-2 z-20 text-white hover:text-gray-300 cursor-pointer "
                                        href={`mailto:${etude.attributes.email}`}
                                    >
                                        <EnvelopeIcon className="h-5 w-5 text-white" aria-hidden="true" />
                                        {etude.attributes.email}
                                    </a>
                                </div>


                            </div>

                            <div className={`absolute left-0 top-0 w-full h-full pointer-events-none 
                            
                            `}>
                                <img className={`absolute left-0 top-0 h-full w-full brightness-50  object-cover`}
                                    src={`${process.env.NEXT_PUBLIC_BACKEND_URL}${etude.attributes.image.data.attributes.url}`}></img>
                            </div>



                        </div>

                        </>

                        )
                    })
                }

            </div>

            <div className="absolute !z-[100] mix-blend-multiply opacity-50 pointer-events-none -top-[1rem] left-1/2 -ml-[40rem] w-[163.125rem] max-w-none sm:-ml-[67.5rem]">
                <img src="/beams-home@95.jpg" alt="" className={`lg:!z-50 lg:!-scale-x-100 `} />
            </div>





        </div >


    </>

}