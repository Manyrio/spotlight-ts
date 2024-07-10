import { type Metadata } from 'next'

import { Providers } from '@/app/providers'
import { Layout } from '@/components/Layout'

import '@/styles/tailwind.css'
import { Method, call } from '@/scripts/api'
import { Etude } from '@/models/etudes'
import { headers } from 'next/headers';
import { ApiListResponse, ApiRetrieveResponse, Scope } from '@/models/other'
import { redirect } from 'next/navigation'
import { LienEtSocial } from '@/models/lienEtSocial'

export const metadata: Metadata = {
  title: {
    template: '%s - Cabinet Notarial LAUB LHOMME',
    default:
      ' Cabinet Notarial LAUB LHOMME - VOTRE CABINET NOTARIAL À VOTRE SERVICE ',
  },
  description:
    'I’m Spencer, a software designer and entrepreneur based in New York City. I’m the founder and CEO of Planetaria, where we develop technologies that empower regular people to explore space on their own terms.',
  alternates: {
    types: {
      'application/rss+xml': `${process.env.NEXT_PUBLIC_SITE_URL}/feed.xml`,
    },
  },
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {


  let etudes: ApiListResponse<Etude> = await call("etudes?populate=*", Method.get)
  let scope = Scope.Caulnes
  let path: any = headers().get('path')
  if (path.startsWith("/" + Scope.Caulnes)) {
    scope = Scope.Caulnes
  } else if (path.startsWith("/" + Scope.Cast)) {
    scope = Scope.Cast
  }

  let defaultEtude = etudes.data.find((etude) => etude.attributes.slug == scope) || new Etude()
  

  let responseLES: ApiRetrieveResponse<LienEtSocial> = await call("lienetsocial", Method.get)
  let defaultLienEtSocial = responseLES.data;



  return (
    <html lang="fr" className="h-full antialiased" suppressHydrationWarning>
      <body className={`flex h-full`} style={{ background: defaultEtude.attributes.colors.data.attributes.background }}>
        <Providers etudes={etudes.data} defaultScope={scope} defaultEtude={defaultEtude} defaultLienEtSocial={defaultLienEtSocial}>
          <div className="flex w-full">
            <Layout colors={defaultEtude.attributes.colors.data}>{children}</Layout>
          </div>
        </Providers>
      </body>
    </html>
  )
}
