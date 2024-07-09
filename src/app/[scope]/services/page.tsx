"use client"

import { Container } from '@/components/Container';
import { SimpleLayout } from '@/components/SimpleLayout'
import Link from 'next/link';


export default function Service() {

    const stats = [
        {
            title: "Optimiser votre patrimoine",
            description: "Optimiser votre patrimoine",
            image: 'https://prismeoffice.adnov.fr/media/view/0/0/61/61/cb1896623ed226771914358eb24bdf959aced2d4.png'
        },
        {
            title: "Se marier, se pacser",
            description: "Se marier, se pacser",
            image: "https://prismeoffice.adnov.fr/media/view/0/0/61/61/c50356d0f105f457b8b61866e03470a6a746821f.png"
        },
        {
            title: "Vendre un bien immobilier",
            description: "Vendre un bien immobilier",
            image: 'https://prismeoffice.adnov.fr/media/view/0/0/61/61/dd79f5250cc0dea205436c23c8a47617fdfbd1df.png'
        },
        {
            title: "Adopter un enfant",
            description: "Adopter un enfant",
            image: 'https://prismeoffice.adnov.fr/media/view/0/0/61/61/2cd3f705a58e35eb794c81cb79eea2640c11f642.png'
        },
        {
            title: "Se séparer, divorcer",
            description: "Se séparer, divorcer",
            image: 'https://prismeoffice.adnov.fr/media/view/0/0/61/61/d0b7c2ce9f2aa70082d95ac64526498f6e74df87.png'
        },
        {
            title: "Procéder à des donations",
            description: "Procéder à des donations",
            image: 'https://prismeoffice.adnov.fr/media/view/0/0/61/61/c6a980f38cfb4b2849b339a7deb915faa83118e0.png'
        },
        {
            title: "Protéger et prévoir l’avenir de vos proches",
            description: "Protéger et prévoir l’avenir de vos proches",
            image: 'https://prismeoffice.adnov.fr/media/view/0/0/61/61/cc3580ba8317376e663a184458608ba7b14cdfbd.png'
        },
        {
            title: "Vous vous posez des questions sur l’héritage",
            description: "Vous vous posez des questions sur l’héritage",
            image: 'https://prismeoffice.adnov.fr/media/view/0/0/61/61/10f10fc51c52a42de31b955b5e987229af898b69.png'
        },
        {
            title: "Louer un bien immobilier",
            description: "Louer un bien immobilier",
            image: 'https://prismeoffice.adnov.fr/media/view/0/0/61/61/016737cb9a00015c3a071175defa4313ccc5b356.png'
        },
        {
            title: "Vivre à l’étranger",
            description: "Vivre à l’étranger",
            image: 'https://prismeoffice.adnov.fr/media/view/0/0/61/61/bf90253fd6d09d308d146842b0c4dd505aba263b.png'
        },
        {
            title: "Entreprendre",
            description: "Entreprendre",
            image: 'https://prismeoffice.adnov.fr/media/view/0/0/61/61/2ab5e82c25249765ef124102b88066cd9c0e9148.png'
        },
        {
            title: "Acheter une maison",
            description: "Acheter une maison",
            image: 'https://prismeoffice.adnov.fr/media/view/0/0/61/61/009f091f3d48a695cab4edc5361bf0b410d0f99b.png'
        },
        {
            title: "Evaluer vos frais d'achat",
            description: "Evaluer vos frais d'achat",
            image: 'https://prismeoffice.adnov.fr/media/view/0/0/61/61/7974fd3a1fc4a1021dc9cb5bd59da2bc2dd22feb.png'
        },
        {
            title: "Vérifier vos capacités d'emprunt",
            description: "Vérifier vos capacités d'emprunt",
            image: 'https://prismeoffice.adnov.fr/media/view/0/0/61/61/69e21b79fb10eb514eb171f607cd4710f3774fe5.png'
        },
        {
            title: "Calculer vos remboursements de prêt",
            description: "Calculer vos remboursements de prêt",
            image: 'https://prismeoffice.adnov.fr/media/view/0/0/61/61/9f04acc12ca3abe3c18c1ca669fd462edcf2ebe8.png'
        },
        {
            title: "Calculer vos plus-values immobilières",
            description: "Calculer vos plus-values immobilières",
            image: 'https://prismeoffice.adnov.fr/media/view/0/0/61/61/9f0e54bc51001acf9951d65204495e07ee02dff7.png'
        }
    ];


    return (


        <>
            <Container>

                <div className="mt-20 mx-auto grid max-w-2xl grid-cols-1 items-start gap-x-8 gap-y-16 sm:gap-y-24 lg:mx-0 lg:max-w-none lg:grid-cols-1">

                    <div>
                        <div className="dark:text-gray-200 text-base leading-7 dark:text-gray-200 text-gray-700 w-full">
                            <p className="dark:text-gray-200 text-base font-semibold leading-7 dark:text-gray-200 text-indigo-600">Services</p>
                            <h1 className="mt-2 dark:text-gray-200 text-3xl font-bold tracking-tight dark:text-gray-200 text-gray-900 sm:dark:text-gray-200 text-4xl">
                                Nos services numériques
                            </h1>
                            <div className="w-ull">
                                <p className="mt-6">
                                    Les notaires jouent un rôle crucial dans notre système juridique. Ce sont des officiers publics, nommés par le ministre de la Justice, dont la mission principale est d’authentifier les actes et les contrats, leur conférant ainsi une valeur juridique incontestable. En effet, un acte notarié fait foi de son contenu et de sa date, et est difficilement contestable en justice.


                                </p>
                                <p className="mt-8">
                                    Les domaines d’intervention des notaires sont vastes et variés. Ils interviennent principalement dans le droit de la famille (mariage, PACS, divorce, adoption, succession), le droit immobilier (achat, vente, hypothèque), le droit des affaires (création de sociétés, cessions d'entreprises) et le conseil patrimonial (gestion de patrimoine, donations, transmission d’entreprise).
                                </p>

                            </div>
                        </div>

                        <div className="mt-10 flex">
                            <Link href="/contact" className="dark:text-gray-200 text-base font-semibold leading-7 dark:text-gray-200 text-indigo-600">
                                Nous contacter <span aria-hidden="true">&rarr;</span>
                            </Link>
                        </div>
                    </div>
                </div>

                <dl className="mt-10 grid grid-cols-2 gap-8 border-t border-gray-900/10 pt-10 sm:grid-cols-4">

                    {stats.map((stat) => (
                        <div key={stat.title} className="flex flex-col bg-gray-400/5 p-8 cursor-pointer rounded-md">
                            <dt className="dark:text-gray-200 text-sm font-semibold leading-6 dark:text-gray-200 text-gray-600 mt-2">{stat.description}</dt>
                            <dd className="order-first dark:text-gray-200 text-3xl font-semibold tracking-tight dark:text-gray-200 text-gray-900">{stat.title}</dd>
                        </div>
                    ))}
                </dl>

            </Container>

        </>

    )
}
