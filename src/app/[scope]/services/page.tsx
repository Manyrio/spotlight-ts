"use client"

import { Container } from '@/components/Container';
import { SimpleLayout } from '@/components/SimpleLayout'
import Link from 'next/link';
import React from 'react';
import { Services } from './service';


export default function Service() {
    return (


        <>
            <Container>

                <div className="mt-20 mx-auto grid max-w-2xl grid-cols-1 items-start gap-x-8 gap-y-16 sm:gap-y-24 lg:mx-0 lg:max-w-none lg:grid-cols-1">

                    <div>
                        <div className="dark:text-gray-200 text-base leading-7 dark:text-gray-200 text-gray-700 w-full">
                            <p className="dark:text-gray-200 text-base font-semibold leading-7 dark:text-gray-200 text-indigo-600">Notaires de France</p>
                            <h1 className="mt-2 dark:text-gray-200 text-3xl font-bold tracking-tight dark:text-gray-200 text-gray-900 sm:dark:text-gray-200 text-4xl">
                                Nos services numériques
                            </h1>
                        </div>
                    </div>
                </div>

                <Services />

                {/* <dl className="mt-10 grid grid-cols-2 gap-8 border-t border-gray-900/10 pt-10 sm:grid-cols-4">

                {stats.map((stat) => (
    <div key={stat.title} className="flex flex-col items-start bg-gray-400/5 p-8 cursor-pointer rounded-md">
        <img src={stat.image} alt={stat.title} className="order-first w-auto h-10 mb-4 object-contain" />
        <dd className="dark:text-gray-200 text-3xl font-semibold tracking-tight dark:text-gray-200 text-gray-900">{stat.title}</dd>
    </div>
))}

                </dl> */}

            </Container>

        </>

    )
}

