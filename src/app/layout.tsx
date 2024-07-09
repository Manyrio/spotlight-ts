import { type Metadata } from 'next'

import { Providers } from '@/app/providers'
import { Layout } from '@/components/Layout'

import '@/styles/tailwind.css'
import { Method, call } from '@/scripts/api'
import { Etude } from '@/models/etudes'
import { headers } from 'next/headers';
import { ApiListResponse, Scope } from '@/models/other'

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
  if (path.startsWith("/caulnes")) {
    scope = Scope.Caulnes
  } else if (path.startsWith("/cast")) {
    scope = Scope.Cast
  }



  return (
    <html lang="fr" className="h-full antialiased" suppressHydrationWarning>
      <body className="flex h-full bg-white dark:bg-black">
        <Providers etudes={etudes.data} defaultScope={scope}>
          <div className="flex w-full">
            <Layout>{children}</Layout>
          </div>
        </Providers>
      </body>
    </html>
  )
}
