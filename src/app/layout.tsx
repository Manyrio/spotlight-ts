import { type Metadata } from 'next'

import { Providers } from '@/app/providers'
import { Layout } from '@/components/Layout'

import '@/styles/tailwind.css'
import { Method, call } from '@/scripts/api'
import { Etude } from '@/models/etudes'
import { WebFont } from '@/models/fonts'
import { headers } from 'next/headers';
import { ApiListResponse, ApiRetrieveResponse, Scope } from '@/models/other'
import { LienEtSocial } from '@/models/lienEtSocial'
import { Favicon } from '@/models/favicon'
import { MainStyle } from '@/components/MainStyle'
import { Color } from '@/models/colors'



async function getDefaultParameters() {
  let etudes: ApiListResponse<Etude> = await call("etudes?populate[colors]=*&populate[image]=*&populate[font]=*&populate[pricing][populate]=*&populate[ouvertures][populate]=*&populate[seo][populate]=*", Method.get)
  let scope = Scope.Caulnes
  let path: any = headers().get('path')
  if (path.startsWith("/" + Scope.Caulnes)) {
    scope = Scope.Caulnes
  } else if (path.startsWith("/" + Scope.Cast)) {
    scope = Scope.Cast
  }
  let defaultEtude = etudes.data.find((etude) => etude.attributes.slug == scope) || new Etude()
  if (defaultEtude.attributes.slug == Scope.Unknown) {
    defaultEtude.attributes.colors.data = new Color()
  }
  let responseLES: ApiRetrieveResponse<LienEtSocial> = await call("lienetsocial", Method.get)


  return {
    defaultEtude: JSON.parse(JSON.stringify(defaultEtude)),
    defaultScope: scope,
    etudes: etudes,
    defaultLienEtSocial: responseLES.data || new LienEtSocial()
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
    <html lang="fr" className={"h-full antialiased"} suppressHydrationWarning>


      <MainStyle etude={parameters.defaultEtude} />

      <body className={`flex h-full`}>
        <Providers etudes={parameters.etudes.data} defaultScope={parameters.defaultScope} defaultEtude={parameters.defaultEtude} defaultLienEtSocial={parameters.defaultLienEtSocial}>
          <div className="flex w-full">
            <Layout colors={parameters.defaultEtude.attributes.colors.data}>{children}</Layout>
          </div>
        </Providers>
      </body>
    </html>
  )
}
