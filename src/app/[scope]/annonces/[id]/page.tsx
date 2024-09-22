
import { Method, call } from '@/scripts/api';
import { ApiListResponse, NotyResponse } from '@/models/other';
import { Metadata } from 'next';
import { Annonce } from '@/models/annonce';
import { NextRequest } from 'next/server';
import { headers } from 'next/headers';
import AnnoncePageContent from './content';



export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
    const id = params.id


    let origin = ""
    let page = 1

    const referer = headers().get("referer")
    if (referer) {
        let nextUrl = new NextRequest(referer).nextUrl
        page = Number(nextUrl.searchParams.get("page")) || 1
        origin = nextUrl.origin
    }

    let annonces: NotyResponse<Annonce> = await call(origin + "/api/noty?path=annonces&page=" + page, Method.get)
    let annonce = annonces.results.find(a => a.uuid == id) as Annonce
    console.log(annonce)
    return {
        title: annonce.bien.nature,
        description: annonce.description
    }

}



export default async function ArticlePage({ params }: { params: { id: string } }) {

    const id = params.id

    let origin = ""
    let page = 1

    const referer = headers().get("referer")
    if (referer) {
        let nextUrl = new NextRequest(referer).nextUrl
        page = Number(nextUrl.searchParams.get("page")) || 1
        origin = nextUrl.origin
    }

    let annonces: NotyResponse<Annonce> = await call(origin + "/api/noty?path=annonces&page=" + page, Method.get)
    let annonce = annonces.results.find(a => a.uuid == id) as Annonce

    return (
        <AnnoncePageContent annonce={annonce}></AnnoncePageContent>
    )
}


