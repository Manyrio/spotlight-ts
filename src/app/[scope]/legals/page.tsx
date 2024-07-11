import { Metadata } from "next";
import { ApiListResponse, ApiRetrieveResponse } from "@/models/other";
import { Legal } from "@/models/legals";
import { Method, call } from "@/scripts/api";
import LegalsContent from "./content";
// either Static metadata
export const metadata: Metadata = {
    title: "Nos services",
}



export default async function Legals() {
    let legal: ApiRetrieveResponse<Legal> = await call("legal?populate=*", Method.get)

    return (
        <LegalsContent legal={legal.data}></LegalsContent>

    )
}

