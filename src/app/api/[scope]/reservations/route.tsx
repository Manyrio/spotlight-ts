import { Reservation } from "@/models/reservation";
import { call, Method } from "@/scripts/api";
import { NextRequest, NextResponse } from "next/server";
import { getRequestMailAttributes } from "@/scripts/mail/etude/request/content";
import { getApiDefaultParameters, sendEmail } from "../utils";
import { ApiRetrieveResponse } from '@/models/other'
import { Member } from '@/models/members'

export async function POST(req: NextRequest, { params }: { params: { scope: string } }) {


    let body = await req.json();
    const parameters = await getApiDefaultParameters()
    try {
        let response: Reservation = await call("reservations", Method.post, body);
        const email = parameters.defaultEtude.attributes.email

        try {
            await sendReservationEtudeMail(response.id, email);
        } catch (error) {
            return NextResponse.json({
                message: error,
            }, {
                status: 403,
            });
        }

        return NextResponse.json(response, {
            status: 200,
        })

    } catch (error) {
        console.log(error)
        return NextResponse.json(error, {
            status: 500,
        })
    }

}



async function sendReservationEtudeMail(reservationId: string, email: string) {

    let reservation: any
        = await call("reservations/" + reservationId, Method.get)



    let newRes = new Reservation(
        reservation.id,
        new Date(reservation.date),
        reservation.clientFirstName,
        reservation.clientLastName,
        reservation.message,
        reservation.clientEmail,
        reservation.clientPhone
    );

    let formattedMailAttributes: any =
        await getRequestMailAttributes(
            newRes
        );

    try {
        sendEmail(
            email,
            formattedMailAttributes.title,
            formattedMailAttributes.content,
            //icalEvent
        );

    } catch (error: any) {

        throw 'Erreur lors de l\'envoi de l\'e-mail au cabinet notarial'
    }


}








