import { Metadata } from "next";
import { ApiListResponse, ApiRetrieveResponse } from "@/models/other";
import { Legal } from "@/models/legals";
import { Method, call } from "@/scripts/api";
import LegalsContent from "./content";
import UsageContent from "./content";
// either Static metadata
export const metadata: Metadata = {
    title: "Politique de confidentialité",
}



export default async function usage() {
    let legal: ApiRetrieveResponse<Legal> = await call("legal?populate=*", Method.get)

    return (
        <UsageContent legal={legal.data}></UsageContent>

    )
}

