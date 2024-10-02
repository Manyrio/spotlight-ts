'use client'

import { createContext, useEffect, useRef, useState } from 'react'
import { redirect, usePathname } from 'next/navigation'
import { ThemeProvider, useTheme } from 'next-themes'
import { Etude } from '@/models/etudes'
import { ApiListResponse } from '@/models/other'
import { Color } from '@/models/colors'
import { LienEtSocial } from '@/models/lienEtSocial'
import { MainStyle } from '@/components/MainStyle'
import { Image } from '@/models/image'
import { DocumentFile } from '@/models/documents'



function usePrevious<T>(value: T) {
    let ref = useRef<T>()

    useEffect(() => {
        ref.current = value
    }, [value])

    return ref.current
}




export const AppContext = createContext<{
    previousPathname?: string,
    scope: string,
    setScope: React.Dispatch<React.SetStateAction<string>>,
    etude: Etude,
    etudes: Etude[],
    colors: Color,
    lienEtSocial: LienEtSocial,
    documents?: DocumentFile[]
}>({
    scope: "",
    setScope: () => { },
    etude: new Etude(),
    etudes: [new Etude()],
    colors: new Color(),
    lienEtSocial: new LienEtSocial(),
})

export function Providers({ children, documents, etudes, defaultScope, defaultEtude, defaultLienEtSocial }: { children: React.ReactNode, documents: DocumentFile[], etudes: Etude[], defaultScope: string, defaultEtude: Etude, defaultLienEtSocial: LienEtSocial }) {
    let pathname = usePathname()
    let previousPathname = usePrevious(pathname)
    let [scope, setScope] = useState(defaultScope)
    let [lienEtSocial, setLienEtSocial] = useState<LienEtSocial>(defaultLienEtSocial)
    let [etude, setEtude] = useState<Etude>(defaultEtude)
    let [colors, setColors] = useState<Color>(defaultEtude.attributes.colors.data)


    useEffect(() => {
        let etude = etudes.find(etude => etude.attributes.slug === scope) || new Etude()
        setEtude(etude)
        if (etude.attributes.slug == "") {
            etude.attributes.colors.data = new Color()
            etude.attributes.image.data = new Image()
        }
        setColors(etude.attributes.colors.data)
        setLienEtSocial(lienEtSocial)
    }, [scope])

    useEffect(() => {
        setScope(pathname.split("/")[1])
    }, [pathname])






    return (
        <AppContext.Provider value={{
            previousPathname, scope, setScope, etude, colors, lienEtSocial, etudes, documents
        }} >
            <ThemeProvider attribute="class" disableTransitionOnChange>
                <MainStyle etude={etude} important />

                {children}
            </ThemeProvider>
        </ AppContext.Provider >
    )
}
