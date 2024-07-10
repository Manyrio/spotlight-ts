"use client"

import { AppContext } from '@/app/providers';
import { Container } from '@/components/Container';
import { SimpleLayout } from '@/components/SimpleLayout'
import Link from 'next/link';
import { useContext } from 'react';


export default function InformationsContent() {
    const posts = [
        {
            id: 1,
            title: 'Permis de louer et colocations',
            href: '#',
            description:
                'Même si le logement est décent, une demande d’autorisation de louer peut être rejetée si les caractéristiques d’une colocation avec plusieurs contrats ne garantissent pas aux occupants, des conditions dignes d’existence.',
            date: 'Mar 16, 2020',
            datetime: '2020-03-16',
            category: { title: 'Marketing', href: '#' },
            imageUrl: "https://application-adsn.infostrates.fr/img/Articles/photo/1718888790.2829/colocation.jpg",
            author: {
                name: 'Michael Foster',
                role: 'Co-Founder / CTO',
                href: '#',
            }
        },
        // More posts...
    ]

    let { colors } = useContext(AppContext)

    return (


        <>
            <SimpleLayout

                title="Informations"
                intro="Parcourez les dernières informations de notre blog et des dernières actualités."
            >


                <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-2"
                    style={{ borderColor: colors.attributes.divider }}
                >
                    {posts.map((post) => (
                        <article key={post.id} className="flex max-w-xl flex-col items-start justify-between">
                            <div className="flex items-center gap-x-4  text-xs"
                                style={{ color: colors.attributes.hint }}
                            >
                                <time dateTime={post.datetime}

                                >
                                    {post.date}
                                </time>
                                <a
                                    href={post.category.href}
                                    className="relative z-10 rounded-full bg-gray-600/40 px-3 py-1.5 font-medium dark:text-gray-200 text-gray-600 "
                                    style={{ color: colors.attributes.hint, backgroundColor: colors.attributes.tintedBackground }}

                                >
                                    {post.category.title}
                                </a>
                            </div>
                            <div className='flex items-center gap-2'>
                                <img src={post.imageUrl} alt="" className="object-cover max-h-24 w-[200px] rounded-md bg-gray-50" />

                                <div className="group relative">

                                    <h3 className="mt-3 dark:text-gray-200 text-lg font-semibold leading-6 dark:text-gray-200 text-gray-900 group-hover:dark:text-gray-200 text-gray-600"
                                        style={{ color: colors.attributes.accent }}
                                    >
                                        <a href={post.href}>
                                            <span className="absolute inset-0" />
                                            {post.title}
                                        </a>
                                    </h3>
                                    <p className="mt-5 line-clamp-3 dark:text-gray-200 text-sm leading-6 dark:text-gray-200 text-gray-600"
                                        style={{ color: colors.attributes.indicator }}
                                    >{post.description}</p>
                                </div>
                            </div>
                            <div className="relative mt-8 flex items-center gap-x-4">
                                <div className="dark:text-gray-200 text-sm leading-6">
                                    <p className="font-semibold dark:text-gray-200 text-gray-900"
                                        style={{ color: colors.attributes.indicator }}
                                    >
                                        <a href={post.author.href}>
                                            <span className="absolute inset-0" />
                                            {post.author.name}
                                        </a>
                                    </p>
                                    <p className="dark:text-gray-200 text-gray-600"
                                        style={{ color: colors.attributes.hint }}
                                    >{post.author.role}</p>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>

            </SimpleLayout>

        </>

    )
}
