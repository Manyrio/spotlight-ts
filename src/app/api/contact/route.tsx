
import { Etude } from '@/models/etudes'
import { sendMail } from '@/scripts/sendMail'
import { NextResponse } from 'next/server'
export async function POST(req: any) {

    const body = await req.json()

    let message = body["message"]
    let email = body["email"]
    let etude: Etude = body["etude"]

    try {
        await sendMail("Nouveau message de https://laube-lhomme-caulnes.notaires.fr/", etude.attributes.email, message, email)

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
