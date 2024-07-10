
import { Metadata } from 'next';
import RendezvousContent from './content';

// either Static metadata
export const metadata: Metadata = {
    title: 'Prendre un rendez-vous',
}

export default function RendezVous() {

    return (

        <RendezvousContent></RendezvousContent>

    )
}
