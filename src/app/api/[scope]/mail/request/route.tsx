import { sendMail } from '@/scripts/sendMail'
import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer';

import { createICS, sendEmail } from '../utils';
import { getApiDefaultParameters } from '../../utils';
import { getFooter } from '../footer';
import { mailSenderHandler } from '../handler';
import { getFormattedMailAttributes, ReservationType } from '../content';

export async function GET(req: any) {
    //let body = await req.json();
    //const { clientName, clientEmail, startDateTime, endDateTime, description } = body;

    let clientName = 'John Doe';
    let clientEmail = 'jeremycochard0@gmail.com';
    let startDateTime = '2022-02-22T10:00:00Z';
    let endDateTime = '2022-02-22T11:00:00Z';

    // let maybeError: NextResponse<unknown> | undefined = await mailSenderHandler(
    //     clientEmail,
    //     ReservationType.Demande,
    //     createICS(new Date(startDateTime), new Date(endDateTime), `Rendez-vous avec ${clientName}`, 'Cabinet Notarial Laubé Lhomme Caulnes')
    // );

    let formattedMailAttributes = await getFormattedMailAttributes(
        ReservationType.Demande,
        clientName,
        new Date(startDateTime),
    );

    try {
        sendEmail(
            clientEmail,
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