import { AppContext } from "@/app/providers"
import { Button } from "@/components/Button"
import { Member } from "@/models/members"
import { AcademicCapIcon, ChevronRightIcon, EnvelopeIcon, PhoneIcon, UserIcon } from "@heroicons/react/24/outline"
import { useContext } from "react"

export default function TeamMember({ member }: { member: Member }) {
    let { colors, etude } = useContext(AppContext)

    return (<li key={member.attributes.name} className="flex flex-col gap-10 pt-12 sm:flex-row"
        style={{ borderColor: colors.attributes.divider }}
    >

        {
            member.attributes.image.data ?
                <div className='flex flex-col gap-1 text-[12px] items-start'
                    style={{ color: colors.attributes.hint }}>
                    <img className="aspect-[4/5] w-52 flex-none rounded-2xl object-cover" src={process.env.NEXT_PUBLIC_BACKEND_URL + (member.attributes.image.data[0].attributes.url)} alt="" />
                    © Lefrancois.Laurianne photographie
                </div>
                : <div className='aspect-[4/5] w-52 flex-none rounded-2xl object-cover flex items-center justify-center' style={{ background: colors.attributes.tintedBackground }}>

                    <UserIcon className='h-12 w-12' style={{ color: colors.attributes.hint }}></UserIcon>

                </div>
        }


        <div className="max-w-xl flex-auto">
            <h3 className="dark:text-gray-200 text-lg font-semibold leading-8 tracking-tight dark:text-gray-200 text-gray-900 dark:dark:text-gray-200 text-gray-200"
                style={{ color: colors.attributes.accent }}
            >{member.attributes.name}</h3>
            <p className="dark:text-gray-200 text-base leading-7 dark:text-gray-200 text-gray-600"
                style={{ color: colors.attributes.indicator }}
            >{member.attributes.role}</p>

            {<div className="mt-2 flex flex-row gap-2 items-center"
                style={{ color: colors.attributes.hint }}>
                {(member.attributes.languages ?? 'FR').split(',').map((language) => (
                    <img key={language} src={`/countries/${language}.png`} alt={language} className="h-4 w-6" />
                ))}
            </div>}

            {member.attributes.email && <a href={'mailto:' + member.attributes.email} className="underline mt-3 dark:text-gray-200 text-base leading-7 dark:text-gray-200 text-gray-600  dark:dark:text-gray-200 text-gray-500 flex items-center"
                style={{ color: colors.attributes.hint }}>
                <EnvelopeIcon className='h-4 w-4 mr-2 shrink-0'></EnvelopeIcon>
                {member.attributes.email}</a>}

            {member.attributes.phone && <a href={'tel:' + member.attributes.phone} className="underline mt-3 dark:text-gray-200 text-base leading-7 dark:text-gray-200 text-gray-600 dark:dark:text-gray-200 text-gray-500  flex items-center"
                style={{ color: colors.attributes.hint }}>
                <PhoneIcon className='h-4 w-4 mr-2 shrink-0'></PhoneIcon>
                {member.attributes.phone}</a>}

            {member.attributes.certifications && <p className="mt-3 dark:text-gray-200 text-base leading-7 dark:text-gray-200 text-gray-600 dark:dark:text-gray-200 text-gray-500  flex items-center"
                style={{ color: colors.attributes.hint }}>
                <AcademicCapIcon className='h-4 w-4 mr-2 shrink-0'></AcademicCapIcon>
                {member.attributes.certifications}</p>}
            {member.attributes.role == "Notaire" && <Button href={`/${etude.attributes.slug}/rendezvous?member=${member.id}`} className="mt-4"
                style={{ background: colors.attributes.primary }}
            >Prendre rendez-vous
                <ChevronRightIcon className="h-4 w-4"></ChevronRightIcon>
            </Button>}

            {/* {member.attributes.languages && <p className="mt-6 dark:text-gray-200 text-base leading-7 dark:text-gray-200 text-gray-600 dark:dark:text-gray-200 text-gray-500  flex items-center"
                                    style={{ color: colors.attributes.hint }}>
                                    <LanguageIcon className='h-4 w-4 mr-2 shrink-0'></LanguageIcon>
                                    {member.attributes.languages}</p>} */}



            {/* {membre.lieuxActivite && <p className="mt-6 dark:text-gray-200 text-base leading-7 dark:text-gray-200 text-gray-600 dark:dark:text-gray-200 text-gray-500  flex items-center">
                                <MapPinIcon className='h-4 w-4 mr-2 shrink-0'></MapPinIcon>
                                {membre.lieuxActivite.map(lieu => (
                                    <p>{lieu}</p>
                                ))}
                            </p>}



                            {membre.reseauxSociaux &&
                                <ul role="list" className="mt-6 flex gap-x-6">
                                    {membre.reseauxSociaux.map(reseau => {
                                        return <li key={reseau.nom}>
                                            <a href={reseau.lien} className="dark:text-gray-200 text-gray-400 dark:dark:text-gray-200 text-gray-500  hover:dark:text-gray-200 text-gray-500">
                                                <span className="sr-only">LinkedIn</span>
                                                <svg className="h-5 w-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z"
                                                        clipRule="evenodd"
                                                    />
                                                </svg>
                                            </a>
                                        </li>
                                    }
                                    )}

                                </ul>

                            } */}

        </div>
    </li>)

}