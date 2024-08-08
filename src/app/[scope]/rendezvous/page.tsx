
import { Metadata } from 'next';
import RendezvousContent from './content';
import { ApiListResponse } from '@/models/other';
import { Member } from '@/models/members';
import { Method, call } from '@/scripts/api';

// either Static metadata
export const metadata: Metadata = {
    title: 'Prendre un rendez-vous',
}

export default async function RendezVous() {

    let members: ApiListResponse<Member> = new ApiListResponse<Member>()
    try {
        members = await call("members?populate=*", Method.get)
    } catch (error) {

    }



    return (

        <RendezvousContent members={members.data}></RendezvousContent>

    )
}
