"use client"

import { AppContext } from '@/app/providers';
import { SimpleLayout } from '@/components/SimpleLayout'
import { Article } from '@/models/articles';
import { BookOpenIcon } from '@heroicons/react/20/solid';
import { useContext } from 'react';


export default function ArticlesContent({ articles }: { articles: Article[] }) {

    console.log(articles)
    let { colors, scope } = useContext(AppContext)

    return (

        <SimpleLayout
            title="Articles"
            intro="Parcourez les dernièrs articles de notre blog et des dernières actualités."
        >

            <div className="mt-16 space-y-20 lg:mt-20 lg:space-y-20">
                {articles.map((article) => (
                    <article key={article.attributes.slug} className="relative isolate flex flex-col gap-8 lg:flex-row">
                        <div className="relative aspect-[16/9] sm:aspect-[2/1] lg:aspect-square lg:w-64 lg:shrink-0">

                            {
                                article.attributes.image.data ?
                                    <img className="absolute inset-0 h-full w-full rounded-2xl bg-gray-50 object-cover" src={"https://adminpreview.hicards.fr" + (article.attributes.image.data.attributes.url)} alt="" />

                                    : <div className='absolute inset-0 h-full w-full rounded-2xl bg-gray-50 object-cover flex items-center justify-center' style={{ background: colors.attributes.tintedBackground }}>

                                        <BookOpenIcon className='h-12 w-12' style={{ color: colors.attributes.hint }}></BookOpenIcon>

                                    </div>
                            }


                            <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-gray-900/10" />
                        </div>
                        <div>
                            <div className="flex items-center gap-x-4 text-xs">
                                <time dateTime={article.attributes.createdAt} style={{ color: colors.attributes.hint }}>
                                    {new Date(article.attributes.createdAt).toLocaleDateString()}
                                </time>
                                <a
                                    href={article.attributes.type}
                                    className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium "
                                    style={{ color: colors.attributes.hint, background: colors.attributes.tintedBackground }}
                                >
                                    {article.attributes.type}
                                </a>
                            </div>
                            <div className="group relative max-w-xl">
                                <h3 className="mt-3 text-lg font-semibold leading-6 "
                                    style={{ color: colors.attributes.accent }}
                                >
                                    <a href={`/${scope}/articles/${article.attributes.slug}`}>
                                        <span className="absolute inset-0" />
                                        {article.attributes.title}
                                    </a>
                                </h3>
                                <p className="mt-5 text-sm leading-6"
                                    style={{ color: colors.attributes.indicator }}
                                >{article.attributes.description}</p>
                            </div>

                        </div>
                    </article>
                ))}
            </div>

        </SimpleLayout>

    )
}
