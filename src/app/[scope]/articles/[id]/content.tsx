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

    const components = {
        h1(props: any) {
            const { node, ...rest } = props;
            return <h1 className='text-2xl font-medium' {...rest} />;
        },
        h2(props: any) {
            const { node, ...rest } = props;
            return <h2 className='text-xl' {...rest} />;
        },
        p(props: any) {
            const { node, ...rest } = props;
            return <p className='text-sm font-normal' style={{ color: colors.attributes.indicator }} {...rest} />;
        },
        h3(props: any) {
            const { node, ...rest } = props;
            return <h3 className='text-lg font-medium' {...rest} />;
        },
        h4(props: any) {
            const { node, ...rest } = props;
            return <h4 className='text-md font-medium' {...rest} />;
        },
        h5(props: any) {
            const { node, ...rest } = props;
            return <h5 className='text-sm font-medium' {...rest} />;
        },
        h6(props: any) {
            const { node, ...rest } = props;
            return <h6 className='text-xs font-medium' {...rest} />;
        },
        blockquote(props: any) {
            const { node, ...rest } = props;
            return <blockquote className='border-l-4 pl-4 italic' {...rest} />;
        },
        ul(props: any) {
            const { node, ...rest } = props;
            return <ul className='list-disc list-inside' {...rest} />;
        },
        ol(props: any) {
            const { node, ...rest } = props;
            return <ol className='list-decimal list-inside' {...rest} />;
        },
        li(props: any) {
            const { node, ...rest } = props;
            return <li className='ml-4' {...rest} />;
        },
        code(props: any) {
            const { node, ...rest } = props;
            return <code className='bg-gray-100 p-1 rounded' {...rest} />;
        },
        pre(props: any) {
            const { node, ...rest } = props;
            return <pre className='bg-gray-100 p-2 rounded overflow-auto' {...rest} />;
        },
        a(props: any) {
            const { node, ...rest } = props;
            return <a className='text-blue-600 underline' {...rest} />;
        },
        img(props: any) {
            const { node, ...rest } = props;
            return <img className='max-w-full h-auto' {...rest} />;
        },
        table(props: any) {
            const { node, ...rest } = props;
            return <table className='min-w-full border-collapse' {...rest} />;
        },
        thead(props: any) {
            const { node, ...rest } = props;
            return <thead className='bg-gray-200' {...rest} />;
        },
        tbody(props: any) {
            const { node, ...rest } = props;
            return <tbody {...rest} />;
        },
        tr(props: any) {
            const { node, ...rest } = props;
            return <tr className='border-b' {...rest} />;
        },
        th(props: any) {
            const { node, ...rest } = props;
            return <th className='p-2 text-left' {...rest} />;
        },
        td(props: any) {
            const { node, ...rest } = props;
            return <td className='p-2' {...rest} />;
        }
    }
    return (

        <SimpleLayout
            title={article.attributes.title}
            intro={article.attributes.description}
        >
            <div
                className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium -mt-12 sm:-mt-16 w-fit"
                style={{ color: colors.attributes.hint, background: colors.attributes.tintedBackground }}
            >
                {article.attributes.type}
            </div>


            <div className="mt-10 max-w-2xl"
                style={{ color: colors.attributes.accent }}
            >
                <Markdown
                    components={components}
                >{article.attributes.content}</Markdown>
            </div>


        </SimpleLayout >

    )
}