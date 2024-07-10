
import { Method, call } from '@/scripts/api';
import { ApiListResponse } from '@/models/other';
import { Article } from '@/models/articles';
import ArticlesContent from './content';


export default async function Articles() {

    let articles: ApiListResponse<Article> = await call("articles?populate=*", Method.get)
    return (

        <ArticlesContent articles={articles.data}></ArticlesContent>

    )
}
