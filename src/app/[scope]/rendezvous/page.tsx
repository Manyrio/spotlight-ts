
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

    const { currentMonth, nextMonth } = getCurrentAndNextMonth();

    let members: ApiListResponse<Member> = new ApiListResponse<Member>()
    let steps: ApiRetrieveResponse<Steps> = new ApiRetrieveResponse<Steps>()
    let currentMonthSlots: ReservationMap = {}
    let nextMonthSlots: ReservationMap = {}
    try {
        members = await call("members?populate=*", Method.get)
        steps = await call("step?populate[contact]=*&populate[steps][populate]=*", Method.get)
        currentMonthSlots = await call("strapi-reservations/time-slots/month/" + currentMonth + "?populate[slots]=*", Method.get)
        nextMonthSlots = await call("strapi-reservations/time-slots/month/" + nextMonth + "?populate[slots]=*", Method.get)
    } catch (error) {
    }

    //filter out members that are not notaires
    members.data = members.data.filter((member) => member.attributes.role == "Notaire")

    return (
        <RendezvousContent members={members.data} steps={steps.data} currentMonthSlots={currentMonthSlots} nextMonthSlots={nextMonthSlots}></RendezvousContent>
    )
}


function formatMonth(date: Date): string {
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // getMonth is zero-based, so add 1
    const day = date.getDate().toString().padStart(2, '0');
    const year = date.getFullYear();

    return `${month}-${day}-${year}`;
}

function getCurrentAndNextMonth(): { currentMonth: string; nextMonth: string } {
    const today = new Date();

    // Current month formatted
    const currentMonth = formatMonth(today);

    // Get next month date
    const nextMonthDate = new Date(today.getFullYear(), today.getMonth() + 1, today.getDate());

    // Next month formatted
    const nextMonth = formatMonth(nextMonthDate);

    return {
        currentMonth,
        nextMonth,
    };
}
