"use client"

import { Container } from '@/components/Container';
import Link from 'next/link';
import Calendar from './calendar';


export default function RendezVous() {

    return (


        <>
            <Container>
                <div className="mx-auto max-w-2xl lg:mx-0 pt-20">
                    <h2 className="dark:text-gray-200 text-3xl font-bold tracking-tight dark:text-gray-200 text-gray-900 sm:dark:text-gray-200 text-4xl">Informations</h2>
                    <p className="mt-2 dark:text-gray-200 text-lg leading-8 dark:text-gray-200 text-gray-600">
                        Parcourez les dernières informations de notre blog et des dernières actualités
                    </p>
                </div>
                <Calendar />

            </Container>

        </>

    )
}
