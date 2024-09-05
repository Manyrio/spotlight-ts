
import { Metadata } from 'next';
import RendezvousContent from './content';
import { ApiListResponse, ApiRetrieveResponse } from '@/models/other';
import { Member } from '@/models/members';
import { Method, call } from '@/scripts/api';
import { Steps } from '@/models/steps';

// either Static metadata
export const metadata: Metadata = {
    title: 'Prendre un rendez-vous',
}

export default async function RendezVous() {

    let members: ApiListResponse<Member> = new ApiListResponse<Member>()
    let steps: ApiRetrieveResponse<Steps> = new ApiRetrieveResponse<Steps>()
    try {
        members = await call("members?populate=*", Method.get)
        steps = await call("step?populate[contact]=*&populate[steps][populate]=*", Method.get)
    } catch (error) {

    }



    return (
        <RendezvousContent members={members.data} steps={steps.data}></RendezvousContent>
    )
}
