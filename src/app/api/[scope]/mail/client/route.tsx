import { NextRequest, NextResponse } from 'next/server'

import { sendEmail } from '../utils';
import { getFormattedMailAttributes, ReservationType } from '@/scripts/mail/client/content';
import { ApiRetrieveResponse } from '@/models/other';
import { Reservation } from '@/models/reservation';
import { call, Method } from '@/scripts/api';

export async function GET(req: NextRequest) {
    let reservationId = req.nextUrl.searchParams.get('reservationId');
    let type = req.nextUrl.searchParams.get('type');
    console.log('reservationId', reservationId);
    console.log('type', type);

    if (!reservationId || !type) {
        return NextResponse.json({
            message: 'Paramètres manquants',
        }, {
            status: 400,
        });
    }

    let reservationType: ReservationType;

    if (typeof type === "string" && Object.values(ReservationType).includes(type as ReservationType)) {
        // Valid enum value, you can now use it
        reservationType = type as ReservationType;

    } else {
        console.error('Erreur lors du traitement de la requête:', 'Type de réservation invalide');
        return NextResponse.json({
            message: 'Erreur lors du traitement de la requête',
        }, {
            status: 403,
        });
    }
    console.log('type', reservationType);

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
        console.error('Erreur lors de l\'envoi de l\'e-mail:', error);
        return NextResponse.json({
            message: 'Erreur lors de l\'envoi de l\'e-mail',
            error: error.message,
        }, {
            status: 403,
        });
    }

    return NextResponse.json({
        message: "Invitation envoyée avec succès"
    }, {
        status: 200,
    });
}