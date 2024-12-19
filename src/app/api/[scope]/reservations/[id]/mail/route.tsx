import { Reservation } from "@/models/reservation";
import { call, Method } from "@/scripts/api";
import { getFormattedMailAttributes, ReservationType } from "@/scripts/mail/client/content";
import { NextRequest, NextResponse } from "next/server";
import { sendEmail } from "../../../utils";


export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
    let id = params.id
    let type = req.nextUrl.searchParams.get("type") as ReservationType

    try {
        let response: Reservation = await call("reservations/" + id, Method.get)
        try {
            await sendReservationClientMail(response.id, type);
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





async function sendReservationClientMail(reservationId: string, type: ReservationType) {


    let reservationType: ReservationType;

    if (typeof type === "string" && Object.values(ReservationType).includes(type as ReservationType)) {
        // Valid enum value, you can now use it
        reservationType = type as ReservationType;

    } else {
        console.error('Erreur lors du traitement de la requête:', 'Type de réservation invalide');

        throw 'Erreur lors du traitement de la requête'
    }

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
        await getFormattedMailAttributes(
            reservationType,
            newRes
        );

    try {
        sendEmail(
            reservation.clientEmail,
            formattedMailAttributes.title,
            formattedMailAttributes.content,
            //icalEvent
        );

    } catch (error: any) {

        throw 'Erreur lors de l\'envoi de l\'e-mail:' + error.message;

    }



}
