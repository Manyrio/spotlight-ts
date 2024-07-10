'use client'

import { createContext, useEffect, useRef, useState } from 'react'
import { redirect, usePathname } from 'next/navigation'
import { ThemeProvider, useTheme } from 'next-themes'
import { Method, call } from '@/scripts/api'
import { Etude } from '@/models/etudes'
import { Scope } from '@/models/other'
import { Color } from '@/models/colors'
import { LienEtSocial } from '@/models/lienEtSocial'



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
    colors: Color,
    lienEtSocial: LienEtSocial
}>({
    scope: Scope.Caulnes,
    setScope: () => { },
    etude: new Etude(),
    colors: new Color(),
    lienEtSocial: new LienEtSocial()
})

export function Providers({ children, etudes, defaultScope, defaultEtude, defaultLienEtSocial }: { children: React.ReactNode, etudes: Etude[], defaultScope: Scope, defaultEtude: Etude, defaultLienEtSocial: LienEtSocial }) {
    let pathname = usePathname()
    let previousPathname = usePrevious(pathname)
    let [scope, setScope] = useState(defaultScope)
    let [lienEtSocial, setLienEtSocial] = useState<LienEtSocial>(defaultLienEtSocial)
    let [etude, setEtude] = useState<Etude>(defaultEtude)
    let [colors, setColors] = useState<Color>(defaultEtude.attributes.colors.data)

    useEffect(() => {
        let etude = etudes.find(etude => etude.attributes.slug === scope) || new Etude()
        setEtude(etude)
        setColors(etude.attributes.colors.data)
        setLienEtSocial(lienEtSocial)
    }, [scope])

    useEffect(() => {
        if (pathname.startsWith("/" + Scope.Caulnes)) {
            setScope(Scope.Caulnes)

            return;
        } else if (pathname.startsWith("/" + Scope.Cast)) {
            setScope(Scope.Cast)
            return;
        }

        setScope(Scope.Caulnes)
        redirect("/" + Scope.Caulnes + "/" + pathname.split("/").pop())

    }, [pathname])






    return (
        <AppContext.Provider value={{
            previousPathname, scope, setScope, etude, colors, lienEtSocial
        }} >
            <ThemeProvider attribute="class" disableTransitionOnChange>
                <ThemeWatcher />
                {children}
            </ThemeProvider>
        </ AppContext.Provider >
    )
}
