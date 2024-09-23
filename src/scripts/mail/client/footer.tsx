import { Etude } from '@/models/etudes';
import { Favicon } from '@/models/favicon';
import { LienEtSocial } from '@/models/lienEtSocial';

import nodemailer from 'nodemailer';
import { text } from 'stream/consumers';
import showdown from 'showdown';

export function getFooter(
    etude: Etude,
    lienEtSocial: LienEtSocial,
    favicon: Favicon
): string {

    let etudeName = etude.attributes.name
    let etudeMail = etude.attributes.email
    let etudePhone = etude.attributes.phone

    let facebook = lienEtSocial.attributes.facebook
    let instagram = lienEtSocial.attributes.instagram
    let youtube = lienEtSocial.attributes.youtube

    let faviconIcon = favicon.attributes.icon

    return `
                        <table cellpadding="0" cellspacing="0" class="es-content" align="center">
                            <tbody>
                                <tr>
                                    <td class="esd-stripe" align="center">
                                        <table bgcolor="#ffffff" class="es-content-body" align="center" cellpadding="0" cellspacing="0" width="600">
                                            <tbody>
                                                <tr>
                                                    <td class="esd-structure es-p20t es-p40r es-p40l es-m-p20r es-m-p20l" align="left">
                                                        <table cellpadding="0" cellspacing="0" width="100%">
                                                            <tbody>
                                                                <tr>
                                                                    <td width="520" class="esd-container-frame" align="center" valign="top">
                                                                        <table cellpadding="0" cellspacing="0" width="100%" bgcolor="#ffffff" style="background-color: #ffffff; border-radius: 20px 20px 0 0; border-collapse: separate;">
                                                                            <tbody>
                                                                                <tr>
                                                                                    <td align="center" class="esd-block-image es-p25t es-p15b" style="font-size: 0px;"><a target="_blank" href="https://viewstripo.email" class="rollover"><img src="https://demo.stripocdn.email/content/guids/ae3c7118-3194-4c99-8156-b2d59a5f4f71/images/logonotaires2021.png" alt="Shawn Fields" style="display: block;" width="115" title="Shawn Fields" class="rollover-first"><span style="mso-hide:all;"><img alt="Shawn Fields" title="Shawn Fields" width="115" class="rollover-second" style="max-height: 0px; display: none;" src="https://demo.stripocdn.email/content/guids/ae3c7118-3194-4c99-8156-b2d59a5f4f71/images/logonotaires2021.png"></span></a></td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td align="center" class="esd-block-text es-p5b es-m-txt-c">
                                                                                        <h2>${etudeName}</h2>
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
                        <table class="es-footer" cellspacing="0" cellpadding="0" align="center">
                            <tbody>
                                <tr>
                                    <td class="esd-stripe" align="center">
                                        <table class="es-footer-body" width="600" cellspacing="0" cellpadding="0" bgcolor="#ffffff" align="center">
                                            <tbody>
                                                <tr>
                                                    <td class="esd-structure es-p40r es-p40l es-m-p20r es-m-p20l" align="left">
                                                        <table cellpadding="0" cellspacing="0" width="100%">
                                                            <tbody>
                                                                <tr>
                                                                    <td width="520" class="esd-container-frame" align="center" valign="top">
                                                                        <table cellpadding="0" cellspacing="0" width="100%" bgcolor="#ffffff" style="background-color: #ffffff; border-radius: 0 0 20px 20px; border-collapse: separate;">
                                                                            <tbody>
                                                                                <tr>
                                                                                    <td class="esd-block-menu" esd-tmp-menu-padding="20|5" esd-tmp-menu-color="#00356C">
                                                                                        <table cellpadding="0" cellspacing="0" width="100%" class="es-menu">
                                                                                            <tbody>
                                                                                                <tr class="links-images-left">
                                                                                                    <td align="center" valign="top" width="100%" class="es-p10t es-p10b es-p5r es-p5l" style="padding-bottom: 5px; padding-top: 20px;"><a target="_blank" href="mailto:" style="color: #00356c;"><img src="https://tlr.stripocdn.email/content/guids/CABINET_09e9fe3469e9e38cee45638bc890f8fb7fa30bea0ae9e8d1c37288fc5f1f0d62/images/envelope_8.png" alt="${etudeMail}" title="${etudeMail}" align="absmiddle" class="es-p5r" width="16" style="font-size: 12px;">${etudeMail}</a></td>
                                                                                                </tr>
                                                                                            </tbody>
                                                                                        </table>
                                                                                    </td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td class="esd-block-menu" esd-tmp-menu-padding="5|20" esd-tmp-menu-color="#00356C">
                                                                                        <table cellpadding="0" cellspacing="0" width="100%" class="es-menu">
                                                                                            <tbody>
                                                                                                <tr class="links-images-left">
                                                                                                    <td align="center" valign="top" width="100%" class="es-p10t es-p10b es-p5r es-p5l" style="padding-bottom: 20px; padding-top: 5px;"><a target="_blank" href="tel:+123-456-789" style="color: #00356c;"><img src="https://tlr.stripocdn.email/content/guids/CABINET_09e9fe3469e9e38cee45638bc890f8fb7fa30bea0ae9e8d1c37288fc5f1f0d62/images/mobilebutton_1.png" alt="${etudePhone}" title="${etudePhone}" align="absmiddle" class="es-p5r" width="16">${etudePhone}</a></td>
                                                                                                </tr>
                                                                                            </tbody>
                                                                                        </table>
                                                                                    </td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td align="center" class="esd-block-social es-p25b" style="font-size:0">
                                                                                        <table cellpadding="0" cellspacing="0" class="es-table-not-adapt es-social">
                                                                                            <tbody>
                                                                                                <tr>
                                                                                                    <td align="center" valign="top" class="es-p15r"><a target="_blank" href="${facebook}"><img src="https://tlr.stripocdn.email/content/assets/img/social-icons/circle-colored/facebook-circle-colored.png" alt="Fb" title="Facebook" width="24"></a></td>
                                                                                                    <td align="center" valign="top" class="es-p15r"><a target="_blank" href="${instagram}"><img src="https://tlr.stripocdn.email/content/assets/img/social-icons/circle-colored/instagram-circle-colored.png" alt="Ig" title="Instagram" width="24"></a></td>
                                                                                                    <td align="center" valign="top" class="es-p15r"><a target="_blank" href="${youtube}"><img src="https://tlr.stripocdn.email/content/assets/img/social-icons/circle-colored/youtube-circle-colored.png" alt="Yt" title="Youtube" width="24"></a></td>
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
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <table cellpadding="0" cellspacing="0" class="es-footer" align="center">
                            <tbody>
                                <tr>
                                    <td class="esd-stripe" align="center" esd-custom-block-id="1042140">
                                        <table class="es-footer-body" width="600" cellspacing="0" cellpadding="0" bgcolor="#ffffff" align="center">
                                            <tbody>
                                                <tr>
                                                    <td class="esd-structure es-p40t es-p40b es-p30r es-p30l" align="left">
                                                        <table cellspacing="0" cellpadding="0" width="100%">
                                                            <tbody>
                                                                <tr>
                                                                    <td class="esd-container-frame" width="540" align="left">
                                                                        <table width="100%" cellspacing="0" cellpadding="0">
                                                                            <tbody>
                                                                                <tr>
                                                                                    <td align="center" class="esd-block-text es-p5t es-p5b" esd-links-underline="none">
                                                                                        <p>©2024 Anne LAUBE, Pierre LHOMME, Marc DELMAS, Jeanne LERAY & Virginie DUFEIL. Notaires CAULNES (22) - Tous droits réservés.</p>
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
`;
}