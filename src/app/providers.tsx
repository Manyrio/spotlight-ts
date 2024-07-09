'use client'

import { createContext, useEffect, useRef, useState } from 'react'
import { redirect, usePathname } from 'next/navigation'
import { ThemeProvider, useTheme } from 'next-themes'

export enum Scopes {
  Caulnes = "caulnes",
  Cast = "cast",
}


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
  scope: Scopes,
  setScope: React.Dispatch<React.SetStateAction<Scopes>>,
  colors: {

    background: string,
    tintedBackground: string,
    border: string,
    divider: string,
    accent: string,
    indicator: string,
    hint: string,
    primary: string,

  },
}>({
  scope: Scopes.Caulnes,
  setScope: () => { },
  colors: {
    background: "white",
    tintedBackground: "gray-50",
    border: "gray-200",
    divider: "gray-200",
    accent: "gray-800", //text
    indicator: "gray-500", //subText
    hint: "gray-400",
    primary: "red-500", //button color
  },
})

export function Providers({ children }: { children: React.ReactNode }) {
  let pathname = usePathname()
  let previousPathname = usePrevious(pathname)
  let [scope, setScope] = useState(Scopes.Caulnes)

  let [colors, setColors] = useState<any>({
    background: "white",
    tintedBackground: "gray-50",
    border: "gray-200",
    divider: "gray-200",
    accent: "gray-800", //text
    indicator: "gray-500", //subText
    hint: "gray-400",
    primary: "red-500", //button color
  })



  useEffect(() => {

    if (scope === Scopes.Caulnes) {

      setColors({
        background: "white",
        tintedBackground: "gray-50",
        border: "gray-200",
        divider: "gray-200",
        accent: "gray-800", //text
        indicator: "gray-500", //subText
        hint: "gray-400",
        primary: "red-500", //button color
      })

    } else if (scope === Scopes.Cast) {
      setColors({
        background: "white",
        tintedBackground: "gray-50",
        border: "gray-200",
        divider: "gray-200",
        accent: "gray-800", //text
        indicator: "gray-500", //subText
        hint: "gray-400",
        primary: "red-500", //button color
      })

    }

  }, [scope])


  useEffect(() => {
    if (pathname.startsWith("/caulnes")) {
      setScope(Scopes.Caulnes)

      return;
    } else if (pathname.startsWith("/cast")) {
      setScope(Scopes.Cast)
      return;
    }

    setScope(Scopes.Caulnes)
    redirect("/caulnes/" + pathname.split("/").pop())

  }, [pathname])

  return (
    <AppContext.Provider value={{
      previousPathname, scope, setScope, colors
    }} >
      <ThemeProvider attribute="class" disableTransitionOnChange>
        <ThemeWatcher />
        {children}
      </ThemeProvider>
    </ AppContext.Provider >
  )
}
