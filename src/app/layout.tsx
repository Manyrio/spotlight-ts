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
import { Image } from '@/models/image'
import { Favicon } from '@/models/favicon'





async function getDefaultParameters() {
  let etudes: ApiListResponse<Etude> = await call("etudes?populate[colors]=*&populate[pricing][populate]=*&populate[ouvertures][populate]=*&populate[seo][populate]=*", Method.get)
  let scope = Scope.Caulnes
  let path: any = headers().get('path')
  if (path.startsWith("/" + Scope.Caulnes)) {
    scope = Scope.Caulnes
  } else if (path.startsWith("/" + Scope.Cast)) {
    scope = Scope.Cast
  }
  let defaultEtude = etudes.data.find((etude) => etude.attributes.slug == scope) || new Etude()
  let responseLES: ApiRetrieveResponse<LienEtSocial> = await call("lienetsocial", Method.get)
  console.log(defaultEtude.attributes.pricing)
  return {
    defaultEtude: defaultEtude,
    defaultScope: scope,
    etudes: etudes,
    defaultLienEtSocial: responseLES.data
  }
}



export async function generateMetadata(): Promise<Metadata> {

  let favicon: ApiRetrieveResponse<Favicon> = await call(`favicon?populate=*`, Method.get)

  let parameters = await getDefaultParameters()


  return {
    title: {
      template: '%s - ' + parameters.defaultEtude.attributes.name,
      default:
        parameters.defaultEtude.attributes.seo?.metaTitle,
    },
    description: parameters.defaultEtude.attributes.seo?.metaDescription,
    keywords: parameters.defaultEtude.attributes.seo?.keywords?.join(","),
    alternates: {
      types: {
        'application/rss+xml': `${process.env.NEXT_PUBLIC_SITE_URL}/feed.xml`,
      },
    },
    icons: {
      icon: [
        {
          url: 'https://adminpreview.hicards.fr' + favicon.data.attributes.icon.data.attributes.url,
          href: 'https://adminpreview.hicards.fr' + favicon.data.attributes.icon.data.attributes.url,
        },
      ],
    },
  }

}









export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {


  let parameters = await getDefaultParameters()




  return (
    <html lang="fr" className="h-full antialiased" suppressHydrationWarning>
      <body className={`flex h-full`} style={{ background: parameters.defaultEtude.attributes.colors.data.attributes.background }}>
        <Providers etudes={parameters.etudes.data} defaultScope={parameters.defaultScope} defaultEtude={parameters.defaultEtude} defaultLienEtSocial={parameters.defaultLienEtSocial}>
          <div className="flex w-full">
            <Layout colors={parameters.defaultEtude.attributes.colors.data}>{children}</Layout>
          </div>
        </Providers>
      </body>
    </html>
  )
}
