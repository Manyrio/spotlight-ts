var nodemailer = require("nodemailer");
//-----------------------------------------------------------------------------
export async function sendMail(subject: string, toEmail: string, otpText: string, replyTo?: string) {

    let from = "contact@shunter.fr"



    var transporter = nodemailer.createTransport({
        host: 'shunter.fr',
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: from,
            pass: 'Cheval1234*',
        },
    });


    const mailOptions: any = {
        from: 'shunter <' + from + '>',
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