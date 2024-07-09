'use client'

import { createContext, useEffect, useRef, useState } from 'react'
import { redirect, usePathname } from 'next/navigation'
import { ThemeProvider, useTheme } from 'next-themes'
import { Method, call } from '@/scripts/api'
import { Etude } from '@/models/etudes'
import { Scope } from '@/models/other'
import { Color } from '@/models/colors'



function usePrevious<T>(value: T) {
    let ref = useRef<T>()

    useEffect(() => {
        ref.current = value
    }, [value])

    return ref.current
}




function ThemeWatcher() {
    let { resolvedTheme, setTheme } = useTheme()

    useEffect(() => {
        let media = window.matchMedia('(prefers-color-scheme: dark)')

        function onMediaChange() {
            let systemTheme = media.matches ? 'dark' : 'light'
            if (resolvedTheme === systemTheme) {
                setTheme('system')
            }
        }

        onMediaChange()
        media.addEventListener('change', onMediaChange)

        return () => {
            media.removeEventListener('change', onMediaChange)
        }
    }, [resolvedTheme, setTheme])

    return null
}
export const AppContext = createContext<{
    previousPathname?: string,
    scope: Scope,
    setScope: React.Dispatch<React.SetStateAction<Scope>>,
    etude: Etude,
    colors: Color
}>({
    scope: Scope.Caulnes,
    setScope: () => { },
    etude: new Etude(),
    colors: new Color(),
})

export function Providers({ children, etudes, defaultScope }: { children: React.ReactNode, etudes: Etude[], defaultScope: Scope }) {
    let pathname = usePathname()
    let previousPathname = usePrevious(pathname)
    let [scope, setScope] = useState(defaultScope)
    let [etude, setEtude] = useState<Etude>(new Etude())
    let [colors, setColors] = useState<Color>(new Color())

    useEffect(() => {
        let etude = etudes.find(etude => etude.attributes.name === scope) || new Etude()
        setEtude(etude)
        setColors(etude.attributes.colors.data)
    }, [scope])

    console.log(etude)
    useEffect(() => {
        if (pathname.startsWith("/caulnes")) {
            setScope(Scope.Caulnes)

            return;
        } else if (pathname.startsWith("/cast")) {
            setScope(Scope.Cast)
            return;
        }

        setScope(Scope.Caulnes)
        redirect("/caulnes/" + pathname.split("/").pop())

    }, [pathname])






    return (
        <AppContext.Provider value={{
            previousPathname, scope, setScope, etude, colors
        }} >
            <ThemeProvider attribute="class" disableTransitionOnChange>
                <ThemeWatcher />
                {children}
            </ThemeProvider>
        </ AppContext.Provider >
    )
}
