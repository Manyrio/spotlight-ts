
import { Method, call } from '@/scripts/api';
import InformationsContent from './content';
import { ApiListResponse, ApiRetrieveResponse } from '@/models/other';
import { Article } from '@/models/articles';
import { Metadata } from 'next';



export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {

    const id = params.id

    let article: ApiListResponse<Article> = await call("articles?populate=*&filters[slug][$eq]=" + id, Method.get)

    let seoArticle = article.data[0]

    return {
        title: seoArticle.attributes.title,
        description: seoArticle.attributes.description,
    }

}



export default async function ArticlePage({ params }: { params: { id: string } }) {

    const id = params.id

    let article: ApiListResponse<Article> = await call("articles?populate=*&filters[slug][$eq]=" + id, Method.get)
    return (

        <InformationsContent article={article.data[0]}></InformationsContent>

    )
}
