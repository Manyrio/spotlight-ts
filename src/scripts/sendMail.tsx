var nodemailer = require("nodemailer");
//-----------------------------------------------------------------------------
export async function sendMail(subject: string, toEmail: string, otpText: string, replyTo?: string) {

    let from = "ne-pas-repondre@laube-lhomme-caulnes.notaires.fr"



    var transporter = nodemailer.createTransport({
        host: 'mail.hicards.fr',
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: from,
            pass: process.env.NODEMAILER_PASSWORD,
        },
    });


    const mailOptions: any = {
        from: 'laube-lhomme-caulnes.notaires.fr <' + from + '>',
        to: toEmail,
        replyTo: replyTo ?? toEmail,
        subject: subject,
        text: otpText,
        html: otpText,
    }



    transporter.sendMail(mailOptions, function (error: any, info: any) {
        if (error) {
            throw new Error(error);
        } else {
            return true;
        }
    });
}