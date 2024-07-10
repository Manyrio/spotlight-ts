import { Metadata } from "next";
import { ServicesContent } from "./content";
// either Static metadata
export const metadata: Metadata = {
    title: "Nos services",
}



export default function Services() {

    return (
        <ServicesContent></ServicesContent>

    )
}

