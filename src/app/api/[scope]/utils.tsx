import nodemailer from 'nodemailer';
import '@/styles/tailwind.css'
import { Method, call } from '@/scripts/api'
import { Etude } from '@/models/etudes'
import { headers } from 'next/headers';
import { ApiListResponse, ApiRetrieveResponse } from '@/models/other'
import { LienEtSocial } from '@/models/lienEtSocial'
import { Favicon } from '@/models/favicon'
import { Color } from '@/models/colors'
import { Image } from '@/models/image'

export async function getApiDefaultParameters() {
    let etudes: ApiListResponse<Etude> = await call("etudes?populate[colors]=*&populate[image]=*&populate[font]=*&populate[titleFont]=*&populate[pricing][populate]=*&populate[ouvertures][populate]=*&populate[seo][populate]=*", Method.get)
    let scope = ""
    let path: any = headers().get('path')
    scope = path.split("/")[2]
    let defaultEtude = etudes.data.find((etude) => etude.attributes.slug == scope) || etudes.data[0]
    if (defaultEtude.attributes.slug == "") {
        defaultEtude.attributes.colors.data = new Color()
        defaultEtude.attributes.image.data = new Image()
    }
    let responseLES: ApiRetrieveResponse<LienEtSocial> = await call("lienetsocial", Method.get)
    let responseFavicon: ApiRetrieveResponse<Favicon> = await call("favicon", Method.get)

    return {
        defaultEtude: JSON.parse(JSON.stringify(defaultEtude)) as Etude,
        defaultScope: scope,
        etudes: etudes,
        defaultLienEtSocial: responseLES.data || new LienEtSocial(),
        defaultFavicon: responseFavicon.data || new Favicon()
    }
}



export async function sendEmail(
    email: string,
    subject: string,
    text: string,
    //icalEvent: any
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
        to: email,
        subject: subject,
        html: text,
        //icalEvent: icalEvent
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