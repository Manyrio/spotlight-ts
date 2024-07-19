

"use client"
import { useContext, useState } from 'react'
import { ArrowRightIcon, Bars3Icon, ChevronDownIcon, ChevronRightIcon, ChevronUpIcon } from '@heroicons/react/24/outline'
import { Container } from '@/components/Container'
import { Button } from '@/components/Button'
import { Annonce, ClasseEnergie, ClasseGaz, EtatPropriete, FinancesImmobilieres, OrientationPropriete, TypeChauffage, TypePropriete, TypeTransaction } from '@/models/annonce'
import { formatLocalisation } from '@/models/localisation'
import Link from 'next/link'
import { AppContext } from '../providers'
import { Member } from '@/models/members'
import { Scope } from '@/models/other'
import { EtudePosition } from '@/models/etudes'
import { capitalizeFirstLetter } from '@/scripts/capitalize'




let annonces: Annonce[] = [
    new Annonce('12345', // Identifiant de l'annonce
        TypeTransaction.Vente, // Type de transaction (Vente)
        new FinancesImmobilieres(250000, 5), // Finances avec prix total de 250000 et pourcentage des frais d'agence de 5%
        250000, // Prix total (frais d'agence inclus)
        0.05, // Pourcentage des frais d'agence
        {
            latitude: 48.8566,
            longitude: 2.3522,
            addresse: {
                rue: '1 rue de Paris',
                codePostal: '75001',
                ville: 'Paris',
                pays: 'France'
            }
        }, // Localisation
        {
            type: TypePropriete.Appartement, // Type de propriété (Appartement)
            surface: 75, // Surface totale en m²
            surfaceHabitable: 70, // Surface habitable en m²
            pieces: 3, // Nombre de pièces
            chambres: 2, // Nombre de chambres
            sallesDeBain: 1, // Nombre de salles de bain
            classeEnergie: ClasseEnergie.B, // Classe énergie (B)
            classeGaz: ClasseGaz.C, // Classe gaz (C)
            typeChauffage: TypeChauffage.Electrique, // Type de chauffage (Electrique)
            etatPropriete: EtatPropriete.Ancien, // Etat de la propriété (Ancien)
            orientationPropriete: OrientationPropriete.Sud // Orientation de la propriété (Sud)
        }, // Propriété
        `Maison / villa à vendre - BROONS (22250)

Une maison de 139m² comprenant :
- Au rez-de-chaussée : entrée, dégagement, cuisine aménagée et équipée, salle à manger - salon, bureau, chambre, salle d’eau, wc
- A l’étage : dégagement, trois chambres avec placards, deux greniers, lingerie, wc avec lave main.
- Au sous-sol : atelier, buanderie avec cheminée, cave, garage, water-closet.
Dépendances : garage, préau, chenil, serre
Jardin de 1988m²

Visites : Sur rendez-vous.

Immobilier.notaires® : Evaluer, acheter & vendre avec les notaires partout en France. 12 000 notaires, experts et négociateurs vous accompagnent dans vos projets immobiliers en toute confiance.`, // Description du bien
        'https://www.exemple.com/annonce/12345', // Lien pour plus d'informations
        new Date(), // Date de la dernière mise à jour
        [
            'https://media.immobilier.notaires.fr/inotr/media/29/22044/1604370/781b34f5_VGA.jpg'
        ] // Liste des images
    ),

    new Annonce('12345', // Identifiant de l'annonce
        TypeTransaction.Vente, // Type de transaction (Vente)
        new FinancesImmobilieres(250000, 5), // Finances avec prix total de 250000 et pourcentage des frais d'agence de 5%
        294390, // Prix total (frais d'agence inclus)
        0.051, // Pourcentage des frais d'agence
        {
            latitude: 48.8566,
            longitude: 2.3522,
            addresse: {
                rue: '1 rue de Paris',
                codePostal: '75001',
                ville: 'Paris',
                pays: 'France'
            }
        }, // Localisation
        {
            type: TypePropriete.Appartement, // Type de propriété (Appartement)
            surface: 75, // Surface totale en m²
            surfaceHabitable: 70, // Surface habitable en m²
            pieces: 3, // Nombre de pièces
            chambres: 2, // Nombre de chambres
            sallesDeBain: 1, // Nombre de salles de bain
            classeEnergie: ClasseEnergie.B, // Classe énergie (B)
            classeGaz: ClasseGaz.C, // Classe gaz (C)
            typeChauffage: TypeChauffage.Electrique, // Type de chauffage (Electrique)
            etatPropriete: EtatPropriete.Ancien, // Etat de la propriété (Ancien)
            orientationPropriete: OrientationPropriete.Sud // Orientation de la propriété (Sud)
        }, // Propriété
        `  Maison / villa à vendre - DINARD (35800)

A 1,6 km de la Plage du Prieuré, 2km de la zone commerciale Cap Emeraude
1,4 Km de l'école maternelle publique Jules Verne, et 1,5km de l'école maternelle privée, 650 m du Collège Le Bocage, 1,3km du Lycée Hôtelier Yvon Bourges
Maison 4 pièces de 69,15 m² composée de :
- Au RDC : garage, séjour -cuisine, dégagement, wc
- A l'étage mansardé : trois chambres, salle de bains, wc
Jardin de 381m²
Pas de vis à vis, au calme d'une impasse.

Visites : Sur rendez-vous.

Immobilier.notaires® : Evaluer, acheter & vendre avec les notaires partout en France. 12 000 notaires, experts et négociateurs vous accompagnent dans vos projets immobiliers en toute confiance.Maison / villa à vendre - DINARD (35800)

A 1,6 km de la Plage du Prieuré, 2km de la zone commerciale Cap Emeraude
1,4 Km de l'école maternelle publique Jules Verne, et 1,5km de l'école maternelle privée, 650 m du Collège Le Bocage, 1,3km du Lycée Hôtelier Yvon Bourges
Maison 4 pièces de 69,15 m² composée de :
- Au RDC : garage, séjour -cuisine, dégagement, wc
- A l'étage mansardé : trois chambres, salle de bains, wc
Jardin de 381m²
Pas de vis à vis, au calme d'une impasse.

Visites : Sur rendez-vous.

Immobilier.notaires® : Evaluer, acheter & vendre avec les notaires partout en France. 12 000 notaires, experts et négociateurs vous accompagnent dans vos projets immobiliers en toute confiance.`,
        'https://www.exemple.com/annonce/12345', // Lien pour plus d'informations
        new Date(), // Date de la dernière mise à jour
        [
            'https://media.immobilier.notaires.fr/inotr/media/29/22044/1620881/ad6c678a_VGA.jpg'
        ] // Liste des images
    )
];


export default function HomeContent({ members }: { members: Member[] }) {

    const { etude, colors, scope } = useContext(AppContext)

    let position = etude.attributes.position


    let memberIndex = 0

    return (
        <>
            <div className="relative overflow-hidden ">



                <div className="mx-auto max-w-7xl w-full lg:h-screen ">
                    <div className={`relative z-40 pt-14 lg:w-full duration-300 transition-transform lg:max-w-[50%] ${position == EtudePosition.right ? "lg:!translate-x-[2vw] lg:ml-[50%]" : "lg:!-translate-x-[2vw] lg:ml-0"}  `}>
                        <svg
                            viewBox="0 0 100 100"
                            preserveAspectRatio="none"
                            aria-hidden="true"
                            className={`absolute inset-y-0 -right-[35%] -z-10  ${position == EtudePosition.right ? "lg:-translate-x-[235%] lg:!-scale-x-100" : "lg:translate-x-0 lg:!scale-x-100"}  hidden h-screen w-80   lg:block`}
                            style={{ fill: colors.attributes.background }}
                        >
                            <polygon points="0,0 90,0 50,100 0,100" />
                        </svg>
                        <div className="relative px-6 py-20   lg:px-8 sm:py-30  lg:pr-0">
                            <div className={`mx-auto max-w-2xl lg:mx-0 lg:max-w-xl ${position == EtudePosition.right ? "lg:text-right" : "lg:text-left"}`}>
                                <div className={` mb-8 flex  ${position == EtudePosition.right ? 'pr-[1vw]' : 'pl-[1vw]'} ${position == EtudePosition.right ? 'lg:translate-x-[1vw]' : 'lg:-translate-x-[1vw]'} !transition-[transform] !duration-[500ms]`}>
                                    <div className={`relative rounded-full px-0 py-1 text-sm leading-6 textring-1 flex items-center ${position == EtudePosition.right ? "lg:ml-auto flex-row-reverse" : "lg:text-left"}`}

                                        style={{ borderColor: colors.attributes.divider, color: colors.attributes.indicator }}
                                    >

                                        Accédez à l'étude de {capitalizeFirstLetter(scope == Scope.Cast ? "Caulnes" : "Cast")}
                                        <span>&nbsp;-&nbsp;</span>
                                        <Link href={`/${scope == Scope.Cast ? Scope.Caulnes : Scope.Cast}`} style={{ color: colors.attributes.indicator }} className="font-semibold text-black flex">
                                            <span aria-hidden="true" className="absolute inset-0" />
                                            {scope != Scope.Cast && <>←&nbsp;</>}Visiter {scope == Scope.Cast && <>&nbsp;→</>}
                                        </Link>
                                    </div>
                                </div>
                                <h1 style={{ color: colors.attributes.accent }} className={`text-4xl font-bold tracking-tight sm:text-6xl ${position == EtudePosition.right ? 'lg:pr-[1.5vw]' : 'lg:pl-[1.5vw]'} ${position == EtudePosition.right ? 'lg:translate-x-[1.5vw]' : 'lg:-translate-x-[1.5vw]'} !transition-[transform] !duration-[500ms]`}>
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

                {position != EtudePosition.right ? <div className="hidden lg:block absolute inset-0 left-[50vw] w-[50vw] z-30 bg-gradient-to-r from-black/30 via-black/0 mix-blend-overlay" />
                    : <div className="hidden lg:block absolute inset-0 left-[0vw] w-[50vw] z-30 bg-gradient-to-l from-black/30 via-black/0 mix-blend-overlay" />}
                <div className={`hidden lg:block bg-gray-50 opacity-1 -ml-[3vw] -z-0 absolute top-0 left-0  w-screen h-screen   lg:left-[1vw] lg:-translate-x-[1vw]  ${position == EtudePosition.right ? "" : "lg:!left-[49vw] lg:!translate-x-[1vw] lg:!ml-[1vw]"} lg:absolute lg:inset-y-0  !transition-[transform] !duration-[500ms]  lg:w-[calc(50%+3vw)]`}>


                    {
                        position == EtudePosition.right ?
                            <img
                                alt=""
                                key={EtudePosition.right}
                                src={"https://adminpreview.hicards.fr" + etude.attributes.image.data.attributes.url}
                                className="  aspect-[3/2] object-cover lg:aspect-auto lg:h-full lg:w-full"
                            /> :
                            <img
                                alt=""
                                key={EtudePosition.left}
                                src={"https://adminpreview.hicards.fr" + etude.attributes.image.data.attributes.url}
                                className=" aspect-[3/2] object-cover lg:aspect-auto lg:h-full lg:w-full"
                            />
                    }

                </div>
                <div style={{ background: colors.attributes.background }} className={`hidden  lg:block pointer-events-none absolute w-full h-full inset-0 z-50  ${position == EtudePosition.right ? "lg:opacity-0 lg:translate-x-[0]" : "lg:opacity-100 lg:translate-x-[100vw]"}  transition-opacity duration-300`} />
                <div style={{ background: colors.attributes.background }} className={`hidden lg:block pointer-events-none absolute w-full h-full inset-0 z-50  ${position != EtudePosition.right ? "lg:opacity-0 lg:translate-x-[0]" : "lg:opacity-100 lg:translate-x-[100vw]"}  transition-opacity duration-300 `} />

                <div className="absolute !z-50 mix-blend-multiply opacity-50 pointer-events-none -top-[1rem] left-1/2 -ml-[40rem] w-[163.125rem] max-w-none sm:-ml-[67.5rem]">
                    <img src="https://tailwindui.com/img/beams-home@95.jpg" alt="" className={`lg:!z-50 lg:!-scale-x-100 ${position == EtudePosition.right ? 'lg:!-scale-x-100' : 'lg:!scale-x-100'}`} />
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
                <div className="isolate w-full">

                    {/* Content section */}
                    <div className="mx-auto max-w-7xl px-6 sm:mt-0 lg:px-8 pt-20">
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
                                                                            <td className='pr-4'>{day} </td>
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
                    <div className="mx-auto mt-32 max-w-7xl px-6 sm:mt-30 lg:px-8">
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
                            {members.map((member, index) => {
                                let allowed = false
                                member.attributes.etudes.data.forEach(element => {
                                    console.log(element.attributes.slug)

                                    if (element.attributes.slug == etude.attributes.slug) allowed = true
                                });


                                if (!allowed || memberIndex > 6) return
                                memberIndex++
                                return (
                                    <li key={member.attributes.name}>
                                        <img className="mx-auto h-24 w-24 rounded-full object-cover object-top" src={"https://adminpreview.hicards.fr" + (member.attributes.image.data ? member.attributes.image.data[0].attributes.url : "")} alt="" />
                                        <h3 className="mt-6  text-base font-semibold leading-7 tracking-tight  text-gray-900" style={{ color: colors.attributes.indicator }}>{member.attributes.name}</h3>
                                        <p className=" text-sm leading-6  text-gray-600" style={{ color: colors.attributes.hint }}>{member.attributes.role}</p>
                                    </li>
                                )
                            })}
                        </ul>
                    </div>

                    {/* Blog section */}
                    <div className="mx-auto mt-32 max-w-7xl px-6 sm:mt-40 lg:px-8">
                        <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-none">
                            <h2 className=" text-3xl font-bold tracking-tight  text-gray-900  text-4xl" style={{ color: colors.attributes.accent }}>Annonces immobilières</h2>
                            <p className="mt-2  text-lg leading-8  text-gray-600" style={{ color: colors.attributes.indicator }}>
                                Parcourez toutes nos annonces immobilières et trouvez la maison de vos rêves.
                            </p>
                            <Link href={`/${scope}/annonces`} className='border-b border-indigo-400 w-fit mt-2  text-indigo-400 flex items-center' style={{ color: colors.attributes.primary, borderColor: colors.attributes.primary }}>Voir toutes les annonces <ChevronRightIcon className='h-4 w-4 ml-2'></ChevronRightIcon></Link>

                        </div>
                        <div className="mx-auto mt-16 grid max-w-2xl auto-rows-fr grid-cols-1 gap-8 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
                            {annonces.map((annonce) => (
                                <article
                                    key={annonce.id}
                                    className="relative isolate flex flex-col justify-end overflow-hidden rounded-2xl bg-gray-900 px-8 pb-8 pt-80 sm:pt-48 lg:pt-80"
                                >
                                    <img src={annonce.images[0]} alt="" className="absolute inset-0 -z-10 h-full w-full object-cover" />
                                    <div className="absolute inset-0 -z-10 bg-gradient-to-t from-gray-900 via-gray-900/40" />
                                    <div className="absolute inset-0 -z-10 rounded-2xl ring-1 ring-inset ring-gray-900/10" />

                                    <div className="flex flex-col items-start gap-y-1 overflow-hidden  text-sm leading-6  text-gray-300">


                                        <span className="relative z-20 mb-[8px] inline-flex items-center rounded-full bg-white-600 px-2 py-1  text-xs font-medium  text-white-600 ring-1 ring-inset ring-white-500/10">
                                            {annonce.type}
                                        </span>


                                        <div className="flex gap-x-2.5">
                                            {annonce.prixTotal.toLocaleString("fr-FR", { style: "currency", currency: "EUR" })}
                                        </div>

                                        <div className="flex gap-x-2.5">
                                            Honoraires de négociation: {(annonce.prixTotal * annonce.pourcentageFraisAgence).toLocaleString("fr-FR", { style: "currency", currency: "EUR" })} ({annonce.pourcentageFraisAgence * 100}%)
                                        </div>
                                    </div>
                                    <h3 className="mt-3  text-lg font-semibold leading-6  text-white">
                                        <Link href={`/${scope}/${annonce.id}`}>
                                            <span className="absolute inset-0" />
                                            {formatLocalisation(annonce.localisation)}
                                        </Link>
                                    </h3>
                                </article>
                            ))}

                        </div>
                    </div>
                </div>
            </Container >
        </>
    )
}
