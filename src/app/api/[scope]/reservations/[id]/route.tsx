import { Reservation } from "@/models/reservation";
import { call, Method } from "@/scripts/api";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
    console.log("body")

    const id = params.id;
    let body = await req.json();
    try {
        let updatedReservation = await call("reservations/" + id, Method.put, body);

        console.log(updatedReservation)
        return NextResponse.json(updatedReservation, {
            status: 200,
        })

    } catch (error) {
        console.log("non ici")
        return NextResponse.json({
            message: error,
        }, {
            status: 400,
        })
    }


}


export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
    console.log("body")

    let id = params.id


    let response: Reservation = await call("reservations" + id, Method.get)

    if (response) {
        return NextResponse.json(response, {
            status: 200,
        })
    } else {
        return NextResponse.json({
            message: "Not found"
        }, {
            status: 404,
        })
    }

}
