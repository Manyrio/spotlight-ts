"use client"

import { Container } from '@/components/Container';
import { SimpleLayout } from '@/components/SimpleLayout'
import Link from 'next/link';


export default function Service() {

    const stats = [
        {
            title: "Optimiser votre patrimoine",
            description: "Optimiser votre patrimoine"
        },
        {
            title: "Se marier, se pacser",
            description: "Se marier, se pacser"
        },
        {
            title: "Vendre un bien immobilier",
            description: "Vendre un bien immobilier"
        },
        {
            title: "Adopter un enfant",
            description: "Adopter un enfant"
        },
        {
            title: "Se séparer, divorcer",
            description: "Se séparer, divorcer"
        },
        {
            title: "Procéder à des donations",
            description: "Procéder à des donations"
        },
        {
            title: "Protéger et prévoir l’avenir de vos proches",
            description: "Protéger et prévoir l’avenir de vos proches"
        },
        {
            title: "Vous vous posez des questions sur l’héritage",
            description: "Vous vous posez des questions sur l’héritage"
        },
        {
            title: "Louer un bien immobilier",
            description: "Louer un bien immobilier"
        },
        {
            title: "Vivre à l’étranger",
            description: "Vivre à l’étranger"
        },
        {
            title: "Entreprendre",
            description: "Entreprendre"
        },
        {
            title: "Acheter une maison",
            description: "Acheter une maison"
        },
        {
            title: "Evaluer vos frais d'achat",
            description: "Evaluer vos frais d'achat"
        },
        {
            title: "Vérifier vos capacités d'emprunt",
            description: "Vérifier vos capacités d'emprunt"
        },
        {
            title: "Calculer vos remboursements de prêt",
            description: "Calculer vos remboursements de prêt"
        },
        {
            title: "Calculer vos plus-values immobilières",
            description: "Calculer vos plus-values immobilières"
        }
    ];


    return (


        <>
            <Container>

                <div className="mt-20 mx-auto grid max-w-2xl grid-cols-1 items-start gap-x-8 gap-y-16 sm:gap-y-24 lg:mx-0 lg:max-w-none lg:grid-cols-1">

                    <div>
                        <div className="text-base leading-7 text-gray-700 w-full">
                            <p className="text-base font-semibold leading-7 text-indigo-600">Services</p>
                            <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
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
                            <Link href="/contact" className="text-base font-semibold leading-7 text-indigo-600">
                                Nous contacter <span aria-hidden="true">&rarr;</span>
                            </Link>
                        </div>
                    </div>
                </div>

                <dl className="mt-10 grid grid-cols-2 gap-8 border-t border-gray-900/10 pt-10 sm:grid-cols-4">

                    {stats.map((stat) => (
                        <div key={stat.title} className="flex flex-col bg-gray-400/5 p-8 cursor-pointer hover:bg-gray-200 rounded-md">
                            <dt className="text-sm font-semibold leading-6 text-gray-600 mt-2">{stat.description}</dt>
                            <dd className="order-first text-3xl font-semibold tracking-tight text-gray-900">{stat.title}</dd>
                        </div>
                    ))}
                </dl>

            </Container>

        </>

    )
}
