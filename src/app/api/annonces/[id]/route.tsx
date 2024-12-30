import { AnnonceObject } from "@/models/annonce";
import { ApiListResponse } from "@/models/other";
import { call, Method } from "@/scripts/api";
import { NextRequest, NextResponse } from "next/server";
import { syncAnnonces } from "@/scripts/syncAnnonces";

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {

    let id = params.id

    if (id == "sync") {
        syncAnnonces()
        return NextResponse.json({
            message: "syncing"
        }, {
            status: 200,
        })
    }

    let response: ApiListResponse<AnnonceObject> = await call("annonces?populate=*&filters[uuid][$eq]=" + id, Method.get)
    console.log(response)
    let annonce = response.data.find(a => a.attributes.uuid == id) as AnnonceObject

    if (annonce) {
        return NextResponse.json(annonce, {
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




