import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import { Color } from '@/models/colors'

export function Layout({ children, colors }: { children: React.ReactNode, colors: Color }) {


  return (
    <>
      <div className={`fixed inset-0 flex  justify-center sm:px-8`} style={{ background: colors.attributes.background }}>
        <div className="flex w-full max-w-7xl" style={{ background: colors.attributes.background }}>
          <div className={`w-full `} />
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
