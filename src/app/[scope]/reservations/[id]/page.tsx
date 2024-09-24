import { Metadata } from "next";
import { ApiListResponse, ApiRetrieveResponse } from "@/models/other";
import { Legal } from "@/models/legals";
import { Method, call } from "@/scripts/api";
import ReservationContent from "./content";
import { Reservation } from "@/models/reservation";
// either Static metadata
export const metadata: Metadata = {
    title: "Politique de confidentialité",
}



export default async function usage({ params }: { params: { id: string } }) {
    let reservation: Reservation = await call("reservations/" + params.id, Method.get)
    return (
        <ReservationContent reservation={reservation}></ReservationContent>

    )
}

