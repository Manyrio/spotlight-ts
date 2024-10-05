"use client";
import NextTopLoader from "nextjs-toploader";
import React, { useContext } from "react";
import { AppContext } from "./providers";


export default function TopLoader() {
    let { colors, etude } = useContext(AppContext)
    return (
        <NextTopLoader
            color={etude.id == "" ? "#ffffff" : colors.attributes.primary} //if its a defined color aka = not on the main page
            crawlSpeed={200}
            height={3}
            crawl={true}
            showSpinner={false}
            easing="ease"
            speed={200}
        />
    )
}
