
import '@/styles/tailwind.css'
import { Method, call } from '@/scripts/api'
import { Etude } from '@/models/etudes'
import { ApiRetrieveResponse } from '@/models/other'
import { MailReservation } from '@/models/mailReservation'
import showdown from 'showdown'
import { getFooter } from './footer'
import { getApiDefaultParameters } from '../../../app/api/[scope]/utils'
import { Reservation } from '@/models/reservation'

export enum ReservationType {
    Demande = "demande",
    Confirmation = "confirmation",
    Annulation = "annulation",
    Refus = "refus",
    Déplacement = "deplacement"
}

export async function getMailAttributes(type: ReservationType) {
    let responseMailReservation: ApiRetrieveResponse<MailReservation> = await call("mail-de-reservation", Method.get)
    let mailReservation: MailReservation = responseMailReservation.data || new MailReservation();

    let mailContent = '';
    let mailTitle = '';

    if (type === ReservationType.Demande) {
        mailContent = mailReservation.attributes.send;
        mailTitle = mailReservation.attributes.sendObject;
    } else if (type === ReservationType.Confirmation) {
        mailContent = mailReservation.attributes.confirmation;
        mailTitle = mailReservation.attributes.confirmationObject;
    }
    else if (type === ReservationType.Annulation) {
        mailContent = mailReservation.attributes.canceled;
        mailTitle = mailReservation.attributes.cancelObject;
    }
    else if (type === ReservationType.Refus) {
        mailContent = mailReservation.attributes.denied;
        mailTitle = mailReservation.attributes.deniedObject
    } else if (type === ReservationType.Déplacement) {
        mailContent = mailReservation.attributes.move;
        mailTitle = mailReservation.attributes.moveObject;
    }

    return {
        content: mailContent,
        title: mailTitle
    }
}

function replacePlaceholders(
    content: string,
    clientName: string,
    startDate: Date,
    etude: Etude
): string {




    let variables = {
        'NOM CLIENT': clientName,
        'DATE RDV': startDate as any,
        'ADRESSE ETUDE': etude.attributes.address,
        'TELEPHONE ETUDE': etude.attributes.phone,
        'EMAIL ETUDE': etude.attributes.email,
        'NOM ETUDE': etude.attributes.name,
    };

    return content.replace(/\[(.*?)\]/g, (_, key: keyof typeof variables) => variables[key] || '');
}

export async function getFormattedMailAttributes(
    type: ReservationType,
    reservation: Reservation,
): Promise<any> {
    let mailAttributes = await getMailAttributes(type);
    let parameters = await getApiDefaultParameters();
    console.log(parameters)
    console.log(JSON.stringify(parameters))
    let clientName: string = reservation.clientFirstName + ' ' + reservation.clientLastName;



    const reservationDate = reservation.date;
    const options: Intl.DateTimeFormatOptions = {
        timeZone: 'Europe/Paris',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    };
    const formatter = new Intl.DateTimeFormat('fr-FR', options);
    const parisTime = formatter.format(reservationDate);


    let markdownToHtmlTitle = replacePlaceholders(
        mailAttributes.title,
        clientName,
        parisTime as any,
        parameters.defaultEtude
    );

    let markdownToHtmlContent = new showdown.Converter().makeHtml(replacePlaceholders(
        mailAttributes.content,
        clientName,
        parisTime as any,
        parameters.defaultEtude
    ));

    return {
        title: markdownToHtmlTitle,
        content: `
                        <table class="es-content" cellspacing="0" cellpadding="20" align="center">
                            <tbody>
                                <tr>
                                    <td class="esd-stripe" align="center">
                                        <table class="es-content-body" width="600" cellspacing="20" cellpadding="20" bgcolor="#DCE8F3" align="center" background="https://tlr.stripocdn.email/content/guids/CABINET_09e9fe3469e9e38cee45638bc890f8fb7fa30bea0ae9e8d1c37288fc5f1f0d62/images/frame_3.png" style="background-image: url(https://tlr.stripocdn.email/content/guids/CABINET_09e9fe3469e9e38cee45638bc890f8fb7fa30bea0ae9e8d1c37288fc5f1f0d62/images/frame_3.png); background-repeat: no-repeat; background-position: center top;">
                                            <tbody>
                                                <tr>
                                                    <td class="esd-structure es-p40 es-m-p20r es-m-p20l" align="left">
                                                        <table cellspacing="0" cellpadding="0" width="100%">
                                                            <tbody>
                                                                <tr>
                                                                    <td class="es-m-p0r esd-container-frame" width="520" valign="top" align="center">
                                                                        <table width="100%" cellspacing="0" cellpadding="0">
                                                                            <tbody>
                                                                                <tr>
                                                                                    <td align="left" class="esd-block-image es-m-txt-l" style="font-size: 0px;"><a target="_blank" href="https://viewstripo.email"><img src="https://demo.stripocdn.email/content/guids/ae3c7118-3194-4c99-8156-b2d59a5f4f71/images/logonotaires2021.png" alt="Logo" style="display: block;" height="70" title="Logo"></a></td>
                                                                                </tr>
                                                                            </tbody>
                                                                        </table>
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td class="esd-structure es-p30t es-p30b es-p40r es-p40l es-m-p20r es-m-p20l" align="left">
                                                        <table width="100%" cellspacing="0" cellpadding="0">
                                                            <tbody>
                                                                <tr>
                                                                    <td class="es-m-p0r es-m-p20b esd-container-frame" width="520" valign="top" align="center">
                                                                        <table width="100%" cellspacing="0" cellpadding="0">
                                                                            <tbody>
                                                                                <tr>
                                                                                    <td align="left" class="esd-block-text">
                                                                                        <h1 style="color: #026fe5;">${markdownToHtmlTitle}</h1>
                                                                                    </td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td align="center" class="esd-block-spacer es-p20" style="font-size:0">
                                                                                        <table border="0" width="100%" height="100%" cellpadding="0" cellspacing="0">
                                                                                            <tbody>
                                                                                                <tr>
                                                                                                    <td style="border-bottom: 1px solid #cccccc; background: unset; height:1px; width:100%; margin:0px 0px 0px 0px;"></td>
                                                                                                </tr>
                                                                                            </tbody>
                                                                                        </table>
                                                                                    </td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td align="left" class="esd-block-text">
                                                                                    ${markdownToHtmlContent}
                                                                                    </td>
                                                                                </tr>
                                                                            </tbody>
                                                                        </table>
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        ${getFooter(parameters.defaultEtude, parameters.defaultLienEtSocial, parameters.defaultFavicon)}
        
                        `
    };
}