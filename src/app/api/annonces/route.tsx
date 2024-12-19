import { AnnonceObject } from "@/models/annonce";
import { ApiListResponse } from "@/models/other";
import { call, Method } from "@/scripts/api";
import { NextRequest, NextResponse } from "next/server";


export async function GET(req: NextRequest) {


    //reconstruct query parameters as string if it starts with filters
    let filterString = req.nextUrl.searchParams.toString()

    let response: ApiListResponse<AnnonceObject> = await call("annonces?populate=*&" + filterString, Method.get)
    return NextResponse.json(response, {
        status: 200,
    })
}