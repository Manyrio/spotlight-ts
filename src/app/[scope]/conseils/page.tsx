import { Metadata } from "next";
import { ConseilsContent } from "./content";
// either Static metadata
export const metadata: Metadata = {
    title: "Conseils",
}



export default function Conseils() {

    return (
        <ConseilsContent></ConseilsContent>

    )
}

