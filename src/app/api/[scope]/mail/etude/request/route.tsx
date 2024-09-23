import { NextResponse } from 'next/server'

import { sendEmail } from '../../utils';
import { getRequestMailAttributes } from '@/scripts/mail/etude/request/content';
import { Reservation } from '@/models/reservation';
import { call, Method } from '@/scripts/api';

export async function GET(req: any) {
    let reservationId = req.nextUrl.searchParams.get('reservationId');

    if (!reservationId) {
        return NextResponse.json({
            message: 'Paramètres manquants',
        }, {
            status: 400,
        });
    }

    let reservation: any
        = await call("reservations/" + reservationId, Method.get)

    console.log(reservation);

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
            newRes.clientEmail,
            formattedMailAttributes.title,
            formattedMailAttributes.content,
            //icalEvent
        );

    } catch (error: any) {
        console.error('Erreur lors de l\'envoi de l\'e-mail au cabinet notarial:', error);
        return NextResponse.json({
            message: 'Erreur lors de l\'envoi de l\'e-mail au cabinet notarial',
            error: error.message,
        }, {
            status: 403,
        });
    }

    return NextResponse.json({
        message: "Demande de reservation envoyée avec succès"
    }, {
        status: 200,
    });
}