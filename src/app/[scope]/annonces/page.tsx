
import { Metadata } from 'next';
import AnnoncesContent from './content';


// either Static metadata
export const metadata: Metadata = {
  title: "Annonces",
}

export default function Annonces() {

  return (
    <AnnoncesContent></AnnoncesContent>
  )
}
