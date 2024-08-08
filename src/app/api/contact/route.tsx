
import { sendMail } from '@/scripts/sendMail'
import { NextResponse } from 'next/server'
export async function POST(req: any) {


    // not needed in NextJS v12+
    const body = await req.json()

    let message = body["message"]
    let email = body["email"]
    let name = body["name"]
    let lastName = body["lastName"]

    try {
        await sendMail("Nouveau message de https://laube-lhomme-caulnes.notaires.fr/", "contact.hicards@gmail.com",
            `${message} \n \n 
            email: ${email}\n 
            Prénom: ${name}\n 
            Nom: ${lastName}
            `, email)

    } catch (error) {

        return NextResponse.json({
            message: error
        }, {
            status: 403,
        })
    }


    return NextResponse.json({
        message: "success"
    }, {
        status: 200,
    })


}
