
import { Method, call } from '@/scripts/api';
import { ApiListResponse, ApiRetrieveResponse, NotyResponse } from '@/models/other';
import { Metadata } from 'next';
import { Annonce, AnnonceObject } from '@/models/annonce';
import { NextRequest } from 'next/server';
import { headers } from 'next/headers';
import AnnoncePageContent from './content';


export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
    const id = params.id
    let origin = process.env.NEXT_PUBLIC_URL
    let annonce: AnnonceObject = await call(origin + `/api/annonces/${id}`, Method.get)
    return {
        title: annonce.attributes.object.bien.nature,
        description: annonce.attributes.object.description,
    }
}

export default async function ArticlePage({ params }: { params: { id: string } }) {
    const id = params.id
    let origin = process.env.NEXT_PUBLIC_URL
    let annonce: AnnonceObject = await call(origin + `/api/annonces/${id}`, Method.get)
    return (
        <AnnoncePageContent annonceObject={annonce}></AnnoncePageContent>
    )
}


