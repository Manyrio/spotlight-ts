import { Metadata } from "next";
import { OfficeContent } from "./content";
// either Static metadata
export const metadata: Metadata = {
    title: "Nos services",
}



export default function Office() {

    return (
        <OfficeContent></OfficeContent>

    )
}

