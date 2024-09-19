import { sendEmail } from './utils';
import { getFooter } from './footer';
import { getApiDefaultParameters } from '../utils';

import { sendMail } from '@/scripts/sendMail'
import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer';

export async function mailSenderHandler(
    email: string,
    subject: string,
    content: string,
    icalEvent: any
) {
    try {
        let parameters = await getApiDefaultParameters();

        let modifiedContent = `${content}
        ${getFooter(parameters.defaultEtude, parameters.defaultLienEtSocial, parameters.defaultFavicon)}
        `;
        console.log('modifiedContent:', modifiedContent);

        sendEmail(
            email,
            subject,
            modifiedContent,
            icalEvent
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
}