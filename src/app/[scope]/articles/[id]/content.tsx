"use client"

import { AppContext } from '@/app/providers';
import { SimpleLayout } from '@/components/SimpleLayout'
import { Article } from '@/models/articles';
import { RiMarkdownFill } from '@remixicon/react';
import { useContext } from 'react';
import Markdown from 'react-markdown'

export default function ArticlePageContent({ article }: { article: Article }) {

    console.log(article)
    let { colors, scope } = useContext(AppContext)

    return (

        <SimpleLayout
            title={article.attributes.title}
            intro={article.attributes.description}
        >
            <p className="text-base font-semibold leading-7 text-indigo-600">{article.attributes.type}</p>

            <div className="mt-10 max-w-2xl"
                style={{ color: colors.attributes.accent }}
            >
                <Markdown>{article.attributes.content}</Markdown>
            </div>


        </SimpleLayout>

    )
}
