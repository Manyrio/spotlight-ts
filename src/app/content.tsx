"use client"

import { useContext } from "react"
import { AppContext } from "./providers"
import { EtudePosition } from "@/models/etudes"
import Link from "next/link"

export default function HomePageContent() {

    let { etudes } = useContext(AppContext)


    return <>

        <div className="relative overflow-hidden z-20 -mb-16 ">

            <div className={`w-full lg:min-h-screen flex flex-col lg:flex-row  items-center  lg:mx-0 `}>



                {
                    etudes.map((etude, index) => {
                        if (index > 1) return null

                        let etudeColors = etude.attributes.colors.data
                        let position = etude.attributes.position
                        return (<div className={`h-full  z-10 lg:[&_img]:hover:scale-[1.7] w-full lg:min-h-screen  relative flex flex-col justify-center ${position == EtudePosition.right ? "lg:text-right  p-6 py-12 lg:pr-32 lg:pt-32" : "lg:text-left p-6 pt-32 pb-12 lg:pl-32 lg:pt-32"}`}>

                            <div className={`absolute left-0 top-0 w-full lg:w-[135%] h-full pointer-events-none  ${position == EtudePosition.right ? " z-0 lg:-left-[26%] lg:[mask-image:linear-gradient(110deg,transparent_25%,black_25%)]" : ""}`}>
                                <img className=" transition-all scale-[1.05] lg:scale-[1.5] absolute left-0 top-0 h-full w-full brightness-50 blur-sm object-cover" src={`${process.env.NEXT_PUBLIC_BACKEND_URL}${etude.attributes.image.data.attributes.url}`}></img>
                            </div>
                            <h1 style={{ color: "white" }} className={`z-20  titleFont text-4xl font-bold tracking-tight sm:text-6xl ${position == EtudePosition.right ? 'lg:pr-[1.5vw]' : 'lg:pl-[1.5vw]'} ${position == EtudePosition.right ? 'lg:translate-x-[1.5vw]' : 'lg:-translate-x-[1.5vw]'} !transition-[transform] !duration-[500ms]`}>
                                {etude.attributes.name}
                            </h1>
                            <p style={{ color: "#dddddd" }} className={`z-20  mt-6 text-lg leading-8 ${position == EtudePosition.right ? 'lg:pr-[2vw]' : 'lg:pl-[2vw]'} ${position == EtudePosition.right ? 'lg:translate-x-[2vw]' : 'lg:-translate-x-[2vw]'} !transition-[transform] !duration-[500ms]`}>
                                {etude.attributes.description}
                            </p>
                            <div className={`mt-10 z-20  flex items-center gap-x-6 ${position == EtudePosition.right ? "lg:flex-row-reverse" : ""}  ${position == EtudePosition.right ? 'lg:pr-[2.5vw]' : 'lg:pl-[2.5vw]'} ${position == EtudePosition.right ? 'lg:translate-x-[2.5vw]' : 'lg:-translate-x-[2.5vw]'} !transition-[transform] !duration-[500ms]`}>
                                <Link
                                    href={`/${etude.attributes.slug}/`}
                                    style={{ background: etudeColors.attributes.primary }}
                                    className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm drop-shadow-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                >
                                    Accéder
                                </Link>
                                <Link
                                    style={{ color: "#dddddd" }} href={`/${etude.attributes.slug}/contact`} className="text-sm font-semibold leading-6 text-gray-900">
                                    Contact <span aria-hidden="true">→</span>
                                </Link>
                            </div>


                            <table className={`z-10 mt-8 text-sm leading-6 text-gray-700 sm:col-span-2 whitespace-pre-line gap-2 flex flex-col flex ${position == EtudePosition.left ? "" : "lg:items-end"}`} style={{ color: "#dddddd" }}>
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



                        </div>)
                    })
                }

            </div>

            <div className="absolute !z-[100] mix-blend-multiply opacity-50 pointer-events-none -top-[1rem] left-1/2 -ml-[40rem] w-[163.125rem] max-w-none sm:-ml-[67.5rem]">
                <img src="/beams-home@95.jpg" alt="" className={`lg:!z-50 lg:!-scale-x-100 `} />
            </div>





        </div >


    </>

}