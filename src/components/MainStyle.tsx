import { Etude } from '@/models/etudes'
import React from 'react'


export function MainStyle({ etude, important }: { etude: Etude, important?: boolean }) {

    let font = etude.attributes.font?.data?.attributes?.fontUrl || "https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap"
    let fontName = etude.attributes.font?.data?.attributes?.name || "Inter"
    let titleFont = etude.attributes.titleFont?.data?.attributes?.fontUrl || font
    let titleFontName = etude.attributes.titleFont?.data?.attributes?.name || fontName


    return (
        <>
            <style>{`
            @import url('${font}');
            @import url('${titleFont}');
                html, body, main {
                font-family: '${fontName}', sans-serif${important ? " !important" : ""};
                background: ${etude.attributes.colors?.data?.attributes?.background || "white"}${important ? " !important" : ""};
                }
                .titleFont {
                font-family: '${titleFontName}', sans-serif${important ? " !important" : ""};
                }
            `}</style>

            <style>{`
                .carousel .thumbs-wrapper {
                margin: 20px 0px;
                }
                .carousel .thumb.selected, .carousel .thumb:hover{
                    border-radius: 10px;
                    border: 3px solid ${etude.attributes.colors?.data?.attributes.primary}
                }
            `}</style>
        </>
    )
}