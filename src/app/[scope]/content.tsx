

"use client"
import { useContext, useState } from 'react'
import { ArrowRightIcon, Bars3Icon, ChevronDownIcon, ChevronRightIcon, ChevronUpIcon } from '@heroicons/react/24/outline'
import { Container } from '@/components/Container'
import { Button } from '@/components/Button'
import { Annonce, ClasseEnergie, ClasseGaz, EtatPropriete, FinancesImmobilieres, OrientationPropriete, TypeChauffage, TypePropriete, TypeTransaction } from '@/models/annonce'
import { formatLocalisation } from '@/models/localisation'
import Link from 'next/link'
import avatarImage from '@/images/avatar.jpg'
import Image from 'next/image'
import { AppContext } from '../providers'
import { Etude } from '@/models/etudes'
import { Place } from '@/models/places'
import { Member } from '@/models/members'




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

    const { etude, colors } = useContext(AppContext)
    console.log(members)


    return (
        <>

            <Container>

                <div className="isolate w-full">
                    {/* Hero section */}


                    <div
                        className="absolute inset-x-0 -top-40 left-0 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
                        aria-hidden="true"
                    >
                        <div
                            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
                            style={{
                                clipPath:
                                    'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                            }}
                        />
                    </div>
                    <div className="relative isolate -z-10">
                        <svg
                            className="absolute brightness-[0.4] inset-x-0 top-0 -z-10 h-[64rem] w-full stroke-gray-200 [mask-image:radial-gradient(32rem_32rem_at_center,white,transparent)]"
                            aria-hidden="true"
                        >
                            <defs>
                                <pattern
                                    id="1f932ae7-37de-4c0a-a8b0-a6e3b4d44b84"
                                    width={200}
                                    height={200}
                                    x="50%"
                                    y={-1}
                                    patternUnits="userSpaceOnUse"
                                >
                                    <path d="M.5 200V.5H200" fill="none" />
                                </pattern>
                            </defs>
                            <svg x="50%" y={-1} className="overflow-visible fill-gray-50">
                                <path
                                    d="M-200 0h201v201h-201Z M600 0h201v201h-201Z M-400 600h201v201h-201Z M200 800h201v201h-201Z"
                                    strokeWidth={0}
                                />
                            </svg>
                            <rect width="100%" height="100%" strokeWidth={0} fill="url(#1f932ae7-37de-4c0a-a8b0-a6e3b4d44b84)" />
                        </svg>
                        <div
                            className="absolute left-1/2 right-0 top-0 -z-10 -ml-24 transform-gpu overflow-hidden blur-3xl lg:ml-24 xl:ml-48"
                            aria-hidden="true"
                        >
                            <div
                                className="aspect-[801/1036] w-[50.0625rem] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30"
                                style={{
                                    clipPath:
                                        'polygon(63.1% 29.5%, 100% 17.1%, 76.6% 3%, 48.4% 0%, 44.6% 4.7%, 54.5% 25.3%, 59.8% 49%, 55.2% 57.8%, 44.4% 57.2%, 27.8% 47.9%, 35.1% 81.5%, 0% 97.7%, 39.2% 100%, 35.2% 81.4%, 97.2% 52.8%, 63.1% 29.5%)',
                                }}
                            />
                        </div>
                        <div >
                            <div className="mx-auto ">
                                <div className="mx-auto max-w-2xl gap-x-14 lg:mx-0 lg:flex lg:max-w-none lg:items-center">
                                    <div className="w-full max-w-xl lg:shrink-0 xl:max-w-2xl">

                                        <Image alt='logo notaire' src={avatarImage} className='h-36 w-36 mb-10 mt-10 mb-6 lg:mt-0 mb-0'></Image>
                                        <h1 className={`text-4xl font-bold tracking-tight text-6xl text-${colors.attributes.accent}`}>
                                            {etude.attributes.name}
                                        </h1>
                                        <p className={`relative mt-6  text-lg leading-8 sm:max-w-md lg:max-w-none text-${colors.attributes.indicator}`}>
                                            {etude.attributes.description}
                                        </p>

                                        <div className='mt-8'>
                                            <Button href={"/contact"}>Nous contacter <ArrowRightIcon className='h-4 w-4'></ArrowRightIcon></Button>
                                        </div>
                                    </div>
                                    <div className="mt-14 flex justify-end gap-8 sm:-mt-44 sm:justify-start sm:pl-20 lg:mt-0 lg:pl-0">
                                        <div className="ml-auto w-44 flex-none space-y-8 pt-32 sm:ml-0 sm:pt-80 lg:order-last lg:pt-36 xl:order-none xl:pt-80">
                                            <div className="relative">
                                                <img
                                                    src="/image-1.jpg"
                                                    className="aspect-[2/3] w-full rounded-xl bg-gray-900/5 object-cover shadow-lg"
                                                />
                                                <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-gray-900/10" />
                                            </div>
                                        </div>
                                        <div className="mr-auto w-44 flex-none space-y-8 sm:mr-0 sm:pt-52 lg:pt-36">
                                            <div className="relative">
                                                <img
                                                    src="/image-2.jpg"
                                                    alt=""
                                                    className="aspect-[2/3] w-full rounded-xl bg-gray-900/5 object-cover shadow-lg"
                                                />
                                                <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-gray-900/10" />
                                            </div>
                                            <div className="relative">
                                                <img
                                                    src="/image-3.jpg"
                                                    alt=""
                                                    className="aspect-[2/3] w-full rounded-xl bg-gray-900/5 object-cover shadow-lg"
                                                />
                                                <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-gray-900/10" />
                                            </div>
                                        </div>
                                        <div className="w-44 flex-none space-y-8 pt-32 sm:pt-0">
                                            <div className="relative">
                                                <img
                                                    src="/image-4.jpg"
                                                    alt=""
                                                    className="aspect-[2/3] w-full rounded-xl bg-gray-900/5 object-cover shadow-lg"
                                                />
                                                <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-gray-900/10" />
                                            </div>
                                            <div className="relative">
                                                <img
                                                    src="/image-2.jpg"
                                                    alt=""
                                                    className="aspect-[2/3] w-full rounded-xl bg-gray-900/5 object-cover shadow-lg"
                                                />
                                                <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-gray-900/10" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Content section */}
                    <div className="mx-auto max-w-7xl px-6 sm:mt-0 lg:px-8 pt-20">
                        <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-none">
                            <h2 className="dark:text-gray-200 text-3xl font-bold tracking-tight dark:text-gray-200 text-gray-900 sm:dark:text-gray-200 text-4xl">Nous trouver</h2>
                            <div className="mt-6 flex flex-col gap-x-8 gap-y-20 lg:flex-row">
                                <div className="lg:w-full lg:max-w-2xl lg:flex-auto">




                                    <div className={`overflow-hidden mb-8`} >

                                        <div className=" sm:px-0 h-12 relative flex flex-col justify-center  cursor-pointer" >
                                            <h3 className="dark:text-gray-200 text-base font-semibold dark:text-gray-200 text-gray-900 truncate ">{etude.attributes.name}</h3>
                                            <p className=" max-w-2xl dark:text-gray-200 text-sm leading-6 dark:text-gray-200 text-gray-500">{etude.attributes.description}</p>


                                        </div>
                                        <div className="mt-6 border-t border-gray-100">
                                            <dl className="divide-y divide-gray-100">
                                                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                                    <dt className="dark:text-gray-200 text-sm font-medium leading-6 dark:text-gray-200 text-gray-900">Adresse complète</dt>
                                                    <dd className="mt-1 dark:text-gray-200 text-sm leading-6 dark:text-gray-200 text-gray-700 sm:col-span-2 sm:mt-0">
                                                        {etude.attributes.address}</dd>
                                                </div>
                                                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                                    <dt className="dark:text-gray-200 text-sm font-medium leading-6 dark:text-gray-200 text-gray-900">Adresse e-mail</dt>
                                                    <a className="mt-1 dark:text-gray-200 text-sm leading-6 dark:text-gray-200 text-gray-700 sm:col-span-2 sm:mt-0 underline"
                                                        href={'mailto:' + etude.attributes.email}
                                                    >{etude.attributes.email}</a>
                                                </div>
                                                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                                    <dt className="dark:text-gray-200 text-sm font-medium leading-6 dark:text-gray-200 text-gray-900">Numéro de téléphone</dt>
                                                    <a className="mt-1 dark:text-gray-200 text-sm leading-6 dark:text-gray-200 text-gray-700 sm:col-span-2 sm:mt-0 underline"
                                                        href={'tel:' + etude.attributes.phone}
                                                    >{etude.attributes.phone}</a>
                                                </div>
                                                {etude.attributes.schedules &&
                                                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                                        <dt className="dark:text-gray-200 text-sm font-medium leading-6 dark:text-gray-200 text-gray-900 ">Horaires</dt>
                                                        <dd className="mt-1 dark:text-gray-200 text-sm leading-6 dark:text-gray-200 text-gray-700 sm:col-span-2 sm:mt-0 whitespace-pre-line">
                                                            {etude.attributes.schedules}
                                                        </dd>
                                                    </div>
                                                }


                                            </dl>
                                        </div>
                                    </div>





                                </div>
                                <div className="lg:flex w-full  lg:flex-auto lg:justify-center">
                                    <dl className="w-full  space-y-8 xl:w-80">
                                        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5308.934796728097!2d-2.1573247015913006!3d48.29386147306423!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x480e5bfab620fbb3%3A0x5d59b9992fc0846a!2sAnne%20LAUBE%2C%20Pierre%20LHOMME%20%26%20Marc%20DELMAS!5e0!3m2!1sfr!2sfr!4v1719485081146!5m2!1sfr!2sfr" width="500" height="450" className={"w-full h-[300px] lg:h-[450px] lg:w-[500px]"} style={{ "border": 0 }} allowFullScreen loading="lazy"></iframe>
                                    </dl>
                                </div>
                            </div>
                        </div>
                    </div>



                    {/* Team section */}
                    <div className="mx-auto mt-32 max-w-7xl px-6 sm:mt-30 lg:px-8">
                        <div className="mx-auto max-w-2xl lg:mx-0">
                            <h2 className="dark:text-gray-200 text-3xl font-bold tracking-tight dark:text-gray-200 text-gray-900 sm:dark:text-gray-200 text-4xl">Rencontrez l'équipe</h2>
                            <p className="mt-6 dark:text-gray-200 text-lg leading-8 dark:text-gray-200 text-gray-600">
                                Notre équipe multidisciplinaire est composée de professionnels expérimentés et passionnés.
                            </p>
                            <Link href={"/equipe"} className='border-b border-indigo-400 w-fit mt-2 dark:text-gray-200 text-indigo-400 flex items-center'>Voir toute l'équipe <ChevronRightIcon className='h-4 w-4 ml-2'></ChevronRightIcon></Link>
                        </div>
                        <ul
                            role="list"
                            className="mx-auto mt-12 grid max-w-2xl grid-cols-2 gap-x-8 gap-y-16 dark:text-gray-200 text-center sm:grid-cols-3 md:grid-cols-4 lg:mx-0 lg:max-w-none lg:grid-cols-5 xl:grid-cols-6"
                        >
                            {members.map((member) => (
                                <li key={member.attributes.name}>
                                    <img className="mx-auto h-24 w-24 rounded-full object-cover object-top" src={"https://adminpreview.hicards.fr" + (member.attributes.image.data ? member.attributes.image.data[0].attributes.url : "")} alt="" />
                                    <h3 className="mt-6 dark:text-gray-200 text-base font-semibold leading-7 tracking-tight dark:text-gray-200 text-gray-900">{member.attributes.name}</h3>
                                    <p className="dark:text-gray-200 text-sm leading-6 dark:text-gray-200 text-gray-600">{member.attributes.role}</p>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Blog section */}
                    <div className="mx-auto mt-32 max-w-7xl px-6 sm:mt-40 lg:px-8">
                        <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-none">
                            <h2 className="dark:text-gray-200 text-3xl font-bold tracking-tight dark:text-gray-200 text-gray-900 sm:dark:text-gray-200 text-4xl">Annonces immobilières</h2>
                            <p className="mt-2 dark:text-gray-200 text-lg leading-8 dark:text-gray-200 text-gray-600">
                                Parcourez toutes nos annonces immobilières et trouvez la maison de vos rêves.
                            </p>
                            <Link href="/annonces" className='border-b border-indigo-400 w-fit mt-2 dark:text-gray-200 text-indigo-400 flex items-center'>Voir toutes les annonces <ChevronRightIcon className='h-4 w-4 ml-2'></ChevronRightIcon></Link>

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

                                    <div className="flex flex-col items-start gap-y-1 overflow-hidden dark:text-gray-200 text-sm leading-6 dark:text-gray-200 text-gray-300">


                                        <span className="relative z-20 mb-[8px] inline-flex items-center rounded-full bg-gray-600/40 px-2 py-1 dark:text-gray-200 text-xs font-medium dark:text-gray-200 text-gray-600 ring-1 ring-inset ring-gray-500/10">
                                            {annonce.type}
                                        </span>


                                        <div className="flex gap-x-2.5">
                                            {annonce.prixTotal.toLocaleString("fr-FR", { style: "currency", currency: "EUR" })}
                                        </div>

                                        <div className="flex gap-x-2.5">
                                            frais d'agence: {(annonce.prixTotal * annonce.pourcentageFraisAgence).toLocaleString("fr-FR", { style: "currency", currency: "EUR" })} ({annonce.pourcentageFraisAgence * 100}%)
                                        </div>
                                    </div>
                                    <h3 className="mt-3 dark:text-gray-200 text-lg font-semibold leading-6 dark:text-gray-200 text-white">
                                        <a href={annonce.id}>
                                            <span className="absolute inset-0" />
                                            {formatLocalisation(annonce.localisation)}
                                        </a>
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
