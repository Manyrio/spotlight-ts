

"use client"
import { useContext, useState } from 'react'
import { ChevronRightIcon, EnvelopeIcon, PhoneIcon, UserIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { Container } from '@/components/Container'
import { AnnonceObject } from '@/models/annonce'
import Link from 'next/link'
import { AppContext } from '../providers'
import { Member } from '@/models/members'
import TextSection from '@/components/TextSection'
import { ElementAnnonce } from './annonces/content'
import { Carousel } from 'react-responsive-carousel'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import TypingEffect from '@/components/Typing_effect'
import TeamMember from './equipe/components/member'

export default function HomeContent({ members, annonces }: { members: Member[], annonces: AnnonceObject[] }) {

    const { etude, colors, scope, contenusAffiches } = useContext(AppContext)
    let position = etude.attributes.position
    const [selectedMember, setSelectedMember] = useState<Member>()


    let memberIndex = 0

    return (
        <>

            <style>{`
          
                .mainBeam {
                display:none;
                }
                .carousel .slider-wrapper {
                    border-radius: 0px!important;
                }
            `}</style>



            <div className='w-full mt-40 lg:mt-56 relative flex items-center justify-center max-lg:mb-32'>
                <div className='absolute p-6 z-10 w-full max-w-[500px] text-center rounded-lg '>
                    {/* <h1 className={`titleFont text-4xl font-bold tracking-tight text-white sm:text-6xl ${position == EtudePosition.right ? 'lg:pr-[1.5vw]' : 'lg:pl-[1.5vw]'} ${position == EtudePosition.right ? 'lg:translate-x-[1.5vw]' : 'lg:-translate-x-[1.5vw]'} !transition-[transform] !duration-[500ms]`}>
                        {etude.attributes.name}
                    </h1> */}
                    <h1 className='font-medium text-white text-2xl titleFont mt-4'
                        style={{ textShadow: '0px 2px 16px rgba(0, 0, 0, 0.7)' }}
                    >
                        &nbsp;
                        <TypingEffect
                            phrases={[
                                'Sous le sceau de l’État.\nConseiller avec rigueur et impartialité.\nAccompagner avec humanité et discrétion.\nExprimer l’équilibre des volontés dans le cadre fixé par la loi.\nConserver les actes pour toujours.\nEt agir ainsi pour la paix au cœur de la société.',
                            ]}
                        />
                        &nbsp;
                    </h1>
                    {/* <div className='w-full h-[1px] bg-gray-400 my-4' ></div>
                    <div className=' flex flex-col items-center gap-2'
                    >
                        <a className="flex items-center gap-2 z-20 hover:brightness-[80%] cursor-pointer font-medium text-white"
                            href={`tel:${etude.attributes.phone}`}
                        >
                            <PhoneIcon className="h-5 w-5 text-white" aria-hidden="true"

                            />
                            {etude.attributes.phone}
                        </a>

                        <a className="flex items-center gap-2 z-20 hover:brightness-[80%] cursor-pointer font-medium text-white"
                            href={`mailto:${etude.attributes.email}`}
                        >
                            <EnvelopeIcon className="h-5 w-5 text-white" aria-hidden="true"

                            />
                            {etude.attributes.email}
                        </a>
                    </div> */}


                </div>









                <Carousel className=' w-full block static select-none'
                    showThumbs={false}
                    autoPlay={true}
                    interval={4000}
                    infiniteLoop={true}
                    swipeable={false}
                    showStatus={false}>
                    {etude.attributes.carousel?.data?.map((image, index) => (
                        <img key={index} src={`${process.env.NEXT_PUBLIC_BACKEND_URL}${image.attributes.url}`} className="h-[450px] w-full object-cover object-center brightness-50" />
                    ))}
                </Carousel>


                <div className='absolute bottom-0 left-0 p-4 rounded-tr-2xl max-lg:w-full max-lg:rounded-none max-lg:top-[100%] max-lg:inline-table'
                    style={{
                        background: colors.attributes.primary,
                    }}
                >
                    <dl className="px-4 lg:px-8 py-4  flex flex-col items-start gap-3"
                        style={{ borderColor: colors.attributes.divider }}
                    >
                        <dt className='flex items-center justify-center gap-2'>
                            <PhoneIcon className='h-5 w-5 text-white' />
                            <a className="mt-1   text-sm md:text-base  leading-6  text-gray-700  underline  text-white"
                                href={'mailto:' + etude.attributes.email}
                            >{etude.attributes.email}</a>
                        </dt>
                        <dt className='flex items-center justify-center gap-2'>
                            <EnvelopeIcon className='h-5 w-5 text-white' />
                            <a className="mt-1  text-sm md:text-base  leading-6  text-gray-700  underline  text-white"
                                href={'tel:' + etude.attributes.phone}
                            >{etude.attributes.phone}</a>
                        </dt>
                    </dl>

                </div>

            </div >


            < Container >


                <div className='pt-16 md:pt-20'></div>


                <div className='flex flex-col gap-16'>

                    {/* Team section */}
                    <div className="mx-auto max-w-7xl">
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
                            {members.filter(member => member.attributes.estNotaire == true).map((member, index: number) => {
                                let allowed = false
                                member.attributes.etudes.data.forEach(element => {
                                    if (element.attributes.slug == etude.attributes.slug) allowed = true
                                });


                                if (!allowed || memberIndex > 4) return
                                memberIndex++
                                return (
                                    <li key={member.attributes.name} className='cursor-pointer' onClick={() => setSelectedMember(member)}>
                                        {member.attributes.image.data ?
                                            <img className="mx-auto h-24 w-24 rounded-full object-cover object-top transition-[filter] duration-500 !grayscale-[100%] hover:!grayscale-[0%]" src={process.env.NEXT_PUBLIC_BACKEND_URL + (member.attributes.image.data ? member.attributes.image.data[0].attributes.url : "")} alt="" />
                                            :
                                            <div className='flex items-center h-24 w-24 rounded-full justify-center bg-gray-100 mx-auto'>
                                                <UserIcon className='h-10 w-10 text-gray-500'></UserIcon>
                                            </div>
                                        }

                                        <h3 className="mt-6  text-base font-semibold leading-7 tracking-tight  text-gray-900" style={{ color: colors.attributes.indicator }}>{member.attributes.name}</h3>
                                        <p className=" text-sm leading-6  text-gray-600" style={{ color: colors.attributes.hint }}>{member.attributes.role}</p>
                                    </li>
                                )
                            })}
                        </ul>

                        {selectedMember && <div className='w-full relative mx-auto max-w-2xl lg:max-w-none'> <TeamMember member={selectedMember} ></TeamMember>
                            <div className='cursor-pointer hover:brightness-[80%] absolute w-6 h-6 top-12 rounded-full right-0 flex items-center justify-center bg-gray-200' onClick={() => setSelectedMember(undefined)}>
                                <XMarkIcon className='w-4 h-4 text-gray-600'></XMarkIcon>
                            </div>
                        </div>}
                    </div>


                    {etude.attributes.sections_textes_accueil.data.map((section, index) => {

                        return (
                            <TextSection section={section} etude={etude} key={index} />
                        )
                    }
                    )}



                    {/* Content section */}
                    {!contenusAffiches.attributes.maskMap && <div className="max-w-7xl w-full sm:mt-0">
                        <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-none">
                            <div className="mt-6 flex flex-col gap-x-8  gap-y-20 max-lg:gap-y-4 lg:flex-row">
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
                                                                {Object.keys(etude.attributes.ouvertures).map((day, index) => {
                                                                    if (day === "id") return null;

                                                                    return (
                                                                        <tr key={index}>
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
                                    <dl className="w-full  space-y-8 ">
                                        <iframe src={etude.attributes.mapUrl} width="500" height="450" className={"w-full h-[300px] lg:h-[450px]   rounded-md"} style={{ "border": 0 }} allowFullScreen loading="lazy"></iframe>
                                    </dl>
                                </div>
                            </div>
                        </div>
                    </div>}



                    {/* Annonces section */}
                    {!contenusAffiches.attributes.maskAnnonces && <div className="mx-auto max-w-7xl">
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
                                    <ElementAnnonce key={index} annonceObject={annonce} shrinked={true}></ElementAnnonce>
                                )
                            })}

                        </div>
                    </div>}

                </div>

            </Container >
        </>
    )
}
