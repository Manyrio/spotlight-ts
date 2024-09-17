
import { call, Method } from '@/scripts/api'
import { NextRequest, NextResponse } from 'next/server'
export async function GET(req: NextRequest) {

    let path = new URL(req.url).searchParams.get("path")
    let limit = new URL(req.url).searchParams.get("limit") || 10
    let page = new URL(req.url).searchParams.get("page") || 1

    let notyApiKey = process.env.NOTY_API_KEY
    let baseApiPath = "https://api.broadcast.test.noty.fr"

    try {
        let response = await call(`${baseApiPath}/${path}?limit=${limit}&page=${page}`, Method.get, null, "application/json", {
            "AUTH-TOKEN": notyApiKey
        })
        console.log(response)

        return NextResponse.json(response, {
            status: 200,
        })

    } catch (error) {
        console.log(error)
        return NextResponse.json(error, {
            status: 403,
        })
    }



}
