import { sub } from 'date-fns';
import nodemailer from 'nodemailer';
import { text } from 'stream/consumers';

export async function sendEmail(
    clientEmail: string,
    subject: string,
    text: string,
    icalEvent: any
) {

    let transporter = nodemailer.createTransport({
        service: 'smtp',
        auth: {
            user: process.env.NODEMAILER_EMAIL,
            pass: process.env.NODEMAILER_PASSWORD,
        },
        host: process.env.NODEMAILER_HOST,
        port: Number(process.env.NODEMAILER_PORT),
        secure: false,
    });

    let mailOptions = {
        from: process.env.NODEMAILER_EMAIL,
        to: clientEmail,
        subject: subject,
        html: text,
        icalEvent: icalEvent
    };

    let info = await transporter.sendMail(mailOptions);
    console.log('Message sent: %s', info.messageId);

}

export function createICS(
    startDateTime: Date,
    endDateTime: Date,
    description: string,
    location: string,
) {
    let content = `
  BEGIN:VCALENDAR
  VERSION:2.0
  CALSCALE:GREGORIAN
  METHOD:PUBLISH
  BEGIN:VEVENT
  UID:${new Date().getTime()}-${Math.random()}@laube-lhomme-caulnes.notaires.fr
  DTSTAMP:${new Date().toISOString().replace(/[-:]/g, '').split('.')[0]}Z
  DTSTART:${startDateTime.toISOString().replace(/[-:]/g, '').split('.')[0]}Z
  DTEND:${endDateTime.toISOString().replace(/[-:]/g, '').split('.')[0]}Z
  SUMMARY:${description}
  DESCRIPTION:${description}
  LOCATION:${location}
  ORGANIZER:mailto:${process.env.NODEMAILER_EMAIL}
  STATUS:CONFIRMED
  SEQUENCE:0
  END:VEVENT
  END:VCALENDAR
    `;

    return {
        filename: 'invitation.ics',
        method: 'REQUEST',
        content: content,
    }
}