import { Reservation } from '@/models/reservation';
import '@/styles/tailwind.css';

export async function getRequestMailAttributes(
    reservation: Reservation
): Promise<any> {
    let dateRdv = reservation.date.toLocaleDateString('fr-FR',
        { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
    let heureRdv = reservation.date.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });

    return {
        title: "Demande de rendez-vous - " + dateRdv + " à " + heureRdv,
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
                                                                                        <h1 style="color: #026fe5;">Vous avez une nouvelle demande de rendez-vous - ${dateRdv} à ${heureRdv}</h1>
                                                                                    </td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td align="left" class="esd-block-text">
                                                                                        <p>E-mail: ${reservation.clientEmail}</p>
                                                                                        <p>Nom: ${reservation.name}</p>
                                                                                        <p>Téléphone: ${reservation.clientPhone}</p>
                                                                                        <p>Motif: ${reservation.message}</p>
                                                                                        <p>Date: ${dateRdv}</p>
                                                                                        <p>Heure: ${heureRdv}</p>
                                                                                        <p>Vous pouvez accepter ou refuser la demande en cliquant sur les boutons ci-dessous :</p>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td align="left" class="esd-block-text">
                                                                                        <table cellspacing="0" cellpadding="0">
                                                                                            <tr>
                                                                                                <td style="border-radius: 6px;" bgcolor="#026fe5">
                                                                                                    <a href="https://www.copernica.com" target="_blank" style="padding: 8px 12px; font-family: Helvetica, Arial, sans-serif;font-size: 14px; color: #ffffff;text-decoration: none;font-weight:bold;display: inline-block;">
                                                                                                        Confirmer
                                                                                                    </a>
                                                                                                </td>
                                                                                                <td style="padding-left: 12px;">
                                                                                                <td style="border-radius: 6px;" bgcolor="#026fe5">
                                                                                                    <a href="https://www.copernica.com" target="_blank" style="padding: 8px 12px; font-family: Helvetica, Arial, sans-serif;font-size: 14px; color: #ffffff;text-decoration: none;font-weight:bold;display: inline-block;">
                                                                                                        Refuser
                                                                                                    </a>
                                                                                                </td>
                                                                                            </tr>
                                                                                        </table>
                                                                                    </td>
                                                                                </td>
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
                        `
    };
}