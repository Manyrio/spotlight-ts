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
import { ContenusAffiches } from '@/models/contenusAffiches'
import { Logo } from '@/models/logo'



export interface NotificationContent {
    message: string,
    title: string,
    Icon?: any,
    duration?: number,
    color?: NotificationColor,
    key?: string

}

export enum NotificationColor {
    red = "#EF4444",
    green = "#22C55E",
    blue = "#6366F1",
    yellow = "#EAB308",
    purple = "#A855F7",
    gray = "#6B7280",
}

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
    contenusAffiches: ContenusAffiches,
    documents?: DocumentFile[],
    logo?: Logo,
    notifications?: NotificationContent[],
    addNotification: (notification: NotificationContent) => void,
}>({
    addNotification(notification: NotificationContent | undefined) {
        throw new Error("Not implemented")
    },
    scope: "",
    setScope: () => { },
    etude: new Etude(),
    etudes: [new Etude()],
    colors: new Color(),
    logo: new Logo(),
    lienEtSocial: new LienEtSocial(),
    contenusAffiches: new ContenusAffiches(),

})

export function Providers({ children, documents, etudes, defaultScope, defaultEtude, defaultLienEtSocial, defaultContenusAffiches, logo }: { children: React.ReactNode, documents: DocumentFile[], etudes: Etude[], defaultScope: string, defaultEtude: Etude, defaultLienEtSocial: LienEtSocial, defaultContenusAffiches: ContenusAffiches, logo: Logo }) {
    let pathname = usePathname()
    let previousPathname = usePrevious(pathname)
    let [scope, setScope] = useState(defaultScope)
    let [lienEtSocial, setLienEtSocial] = useState<LienEtSocial>(defaultLienEtSocial)
    let [contenusAffiches, setContenusAffiches] = useState<ContenusAffiches>(defaultContenusAffiches)
    let [etude, setEtude] = useState<Etude>(defaultEtude)
    let [colors, setColors] = useState<Color>(defaultEtude.attributes.colors.data)

    let [notifications, setNotifications] = useState<NotificationContent[]>([])


    function addNotification(notification: NotificationContent) {
        notification.key = Math.random().toString()
        setNotifications([...notifications, notification]);
    }


    useEffect(() => {
        let etude = etudes.find(etude => etude.attributes.slug === scope) || etudes[0] || new Etude()
        setEtude(etude)
        if (etude.attributes.slug == "") {
            etude.attributes.colors.data = new Color()
            etude.attributes.image.data = new Image()
        }
        setColors(etude.attributes.colors.data)
        setLienEtSocial(lienEtSocial)
        setContenusAffiches(contenusAffiches)
    }, [scope])

    useEffect(() => {
        setScope(pathname.split("/")[1])
    }, [pathname])



    console.log(logo)


    return (
        <AppContext.Provider value={{
            previousPathname, scope, setScope, etude, logo, colors, lienEtSocial, contenusAffiches, etudes, documents, notifications, addNotification
        }} >
            <ThemeProvider attribute="class" disableTransitionOnChange>
                <MainStyle etude={etude} important />

                {children}
            </ThemeProvider>
        </ AppContext.Provider >
    )
}
