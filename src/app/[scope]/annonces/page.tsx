
import { Metadata } from 'next';
import AnnoncesContent from './content';
import { ApiListResponse } from '@/models/other';
import { Annonce, AnnonceObject } from '@/models/annonce';
import { call, Method } from '@/scripts/api';


// either Static metadata
export const metadata: Metadata = {
  title: "Annonces",
}

export default async function Annonces() {

  let response: ApiListResponse<AnnonceObject> = await call("annonces", Method.get)

  return (
    <AnnoncesContent annonces={response.data}></AnnoncesContent>
  )
}
