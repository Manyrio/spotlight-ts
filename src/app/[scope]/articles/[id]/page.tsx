
import { Method, call } from '@/scripts/api';
import InformationsContent from './content';
import { ApiListResponse, ApiRetrieveResponse } from '@/models/other';
import { Article } from '@/models/articles';


export default async function ArticlePage({ params }: { params: { id: string } }) {

    const id = params.id

    let article: ApiRetrieveResponse<Article> = await call("articles/" + id + "?populate=*", Method.get)
    return (

        <InformationsContent article={article.data}></InformationsContent>

    )
}
