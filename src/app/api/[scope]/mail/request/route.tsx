
import { sendMail } from '@/scripts/sendMail'
import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer';

import { createICS, sendEmail } from '../utils';
import { getApiDefaultParameters } from '../../utils';
import { getFooter } from '../footer';
import { mailSenderHandler } from '../handler';

export async function GET(req: any) {
    //let body = await req.json();
    //const { clientName, clientEmail, startDateTime, endDateTime, description } = body;

    let clientName = 'John Doe';
    let clientEmail = 'jeremycochard0@gmail.com';
    let startDateTime = '2022-02-22T10:00:00Z';
    let endDateTime = '2022-02-22T11:00:00Z';

    let maybeError: NextResponse<unknown> | undefined = await mailSenderHandler(
        clientEmail,
        `Invitation au rendez-vous avec ${clientName}`,
        `Vous avez un rendez-vous avec ${clientName}`,
        createICS(new Date(startDateTime), new Date(endDateTime), `Rendez-vous avec ${clientName}`, 'Cabinet Notarial Laubé Lhomme Caulnes')
    );

    if (maybeError) {
        return maybeError;
    }

    return NextResponse.json({
        message: "Invitation envoyée avec succès"
    }, {
        status: 200,
    });
}