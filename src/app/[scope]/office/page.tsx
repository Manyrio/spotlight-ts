import { Metadata } from "next";
import { OfficeContent } from "./content";
import { ApiListResponse, ApiRetrieveResponse } from "@/models/other";
import { Label } from "@/models/labels";
import { Method, call } from "@/scripts/api";
import { CarouselComponent } from "@/models/carousel";
// either Static metadata
export const metadata: Metadata = {
    title: "L'office",
}


export default async function Office() {

    let labels: ApiListResponse<Label> = await call("labels?populate=*", Method.get)
    let carousel: ApiRetrieveResponse<CarouselComponent> = await call("carousel?populate=*", Method.get)
    return (
        <OfficeContent labels={labels.data} carousel={carousel.data}></OfficeContent>

    )
}

