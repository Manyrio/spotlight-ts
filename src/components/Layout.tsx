import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'

export function Layout({ children }: { children: React.ReactNode }) {


  return (
    <>

      <div className="relative flex w-full flex-col">
        <Header />
        <div className='absolute top-0 w-full h-full max-w-screen left-0 overflow-hidden pointer-events-none '>
          <div className="absolute !z-0 mix-blend-multiply opacity-50 pointer-events-none -top-[1rem] left-1/2 -ml-[40rem] w-[163.125rem] max-w-none sm:-ml-[67.5rem] mainBeam ">
            <img src="/beams-home@95.jpg" alt="" className={`!z-50 !-scale-x-100 `} />
          </div>
        </div>
        <main className="flex-auto">{children}</main>
        <Footer />
      </div>
    </>
  )
}

