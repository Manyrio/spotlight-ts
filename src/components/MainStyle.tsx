import { Etude } from '@/models/etudes'
import React from 'react'


export function MainStyle({ etude, important }: { etude: Etude, important?: boolean }) {

    return (
        <style global>{`
            @import url('${etude.attributes.font?.data?.attributes?.fontUrl || "https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap"}');
                html, body, main {
                font-family: '${etude.attributes.font?.data?.attributes?.name || "Inter"}', sans-serif${important ? " !important" : ""};
                background: ${etude.attributes.colors?.data?.attributes?.background || "white"}${important ? " !important" : ""};
                }
            `}</style>
    )
}