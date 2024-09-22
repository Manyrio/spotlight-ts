import { type Metadata } from 'next'

import { Providers } from '@/app/providers'
import { Layout } from '@/components/Layout'

import '@/styles/tailwind.css'
import { Method, call } from '@/scripts/api'
import { Etude } from '@/models/etudes'
import { headers } from 'next/headers';
import { ApiListResponse, ApiRetrieveResponse, Scope } from '@/models/other'
import { LienEtSocial } from '@/models/lienEtSocial'
import { Favicon } from '@/models/favicon'
import { MainStyle } from '@/components/MainStyle'
import { Color } from '@/models/colors'
import { Image } from '@/models/image'



async function getDefaultParameters() {
  let etudes: ApiListResponse<Etude> = await call("etudes?populate[colors]=*&populate[image]=*&populate[font]=*&populate[titleFont]=*&populate[pricing][populate]=*&populate[ouvertures][populate]=*&populate[seo][populate]=*", Method.get)
  let scope = Scope.Unknown
  let path: any = headers().get('path')
  if (path.startsWith("/" + Scope.Caulnes)) {
    scope = Scope.Caulnes
  } else if (path.startsWith("/" + Scope.Cast)) {
    scope = Scope.Cast
  }
  let defaultEtude = etudes.data.find((etude) => etude.attributes.slug == scope) || new Etude()
  if (defaultEtude.attributes.slug == Scope.Unknown) {
    defaultEtude.attributes.colors.data = new Color()
    defaultEtude.attributes.image.data = new Image()
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
    icons: {
      icon: [
        {
          url: 'https://admin.laube-lhomme-caulnes.notaires.fr' + favicon.data.attributes.icon.data.attributes.url,
          href: 'https://admin.laube-lhomme-caulnes.notaires.fr' + favicon.data.attributes.icon.data.attributes.url,
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



      <body className={`flex h-full`}>
        <MainStyle etude={parameters.defaultEtude} />

        <Providers etudes={parameters.etudes.data} defaultScope={parameters.defaultScope} defaultEtude={parameters.defaultEtude} defaultLienEtSocial={parameters.defaultLienEtSocial}>
          <div className="flex w-full">
            <Layout colors={parameters.defaultEtude.attributes.colors.data}>{children}</Layout>
          </div>
        </Providers>
      </body>
    </html>
  )
}
