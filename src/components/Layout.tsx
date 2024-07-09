"use client"
import { AppContext } from '@/app/providers'
import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import { useContext } from 'react'

export function Layout({ children }: { children: React.ReactNode }) {

  const { colors } = useContext(AppContext)

  
  return (
    <>
      <div className={`fixed inset-0 flex bg-[${colors.attributes.background}] justify-center sm:px-8`}>
        <div className="flex w-full max-w-7xl lg:px-8">
          <div className={`w-full bg-[${colors.attributes.background}]`} />
        </div>
      </div>
      <div className="relative flex w-full flex-col">
        <Header />
        <main className="flex-auto">{children}</main>
        <Footer />
      </div>
    </>
  )
}
