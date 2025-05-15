
import { Metadata } from 'next';
import AnnoncesContent from './content';
import { ApiListResponse } from '@/models/other';
import { Annonce, AnnonceObject } from '@/models/annonce';
import { call, Method } from '@/scripts/api';
import { headers } from 'next/headers';
import { NextRequest } from 'next/server';


// either Static metadata
export const metadata: Metadata = {
  title: "Annonces",
}

export default async function Annonces() {

  let origin = process.env.NEXT_PUBLIC_URL

  let response: ApiListResponse<AnnonceObject> = await call(origin + "/api/annonces?sort[0]=createdAt:desc&pagination[pageSize]=1000", Method.get)
  return (
    <AnnoncesContent annonces={response.data}></AnnoncesContent>
  )
}
