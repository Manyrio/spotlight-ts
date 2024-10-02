import { type Metadata } from 'next'

import { Providers } from '@/app/providers'
import { Layout } from '@/components/Layout'

import '@/styles/tailwind.css'
import { Method, call } from '@/scripts/api'
import { Etude } from '@/models/etudes'
import { headers } from 'next/headers';
import { ApiListResponse, ApiRetrieveResponse } from '@/models/other'
import { LienEtSocial } from '@/models/lienEtSocial'
import { Favicon } from '@/models/favicon'
import { MainStyle } from '@/components/MainStyle'
import { Color } from '@/models/colors'
import { Image } from '@/models/image'
import { DocumentFile } from '@/models/documents'
import { Notification } from '@/components/Notification'
import LoadingState from '@/components/LoadingState'



async function getDefaultParameters() {
  let etudes: ApiListResponse<Etude> = await call("etudes?populate[colors]=*&populate[image]=*&populate[font]=*&populate[titleFont]=*&populate[pricing][populate]=*&populate[ouvertures][populate]=*&populate[seo][populate]=*", Method.get)

  let scope = ""
  let path: any = headers().get('path')
  scope = path.split("/")[1]

  let defaultEtude = etudes.data.find((etude) => etude.attributes.slug == scope) || new Etude()
  if (defaultEtude.attributes.slug == "") {
    defaultEtude.attributes.colors.data = new Color()
    defaultEtude.attributes.image.data = new Image()
  }
  let responseLES: ApiRetrieveResponse<LienEtSocial> = await call("lienetsocial", Method.get)

  let defaultDocuments: ApiListResponse<DocumentFile> = await call('documents?populate=*', Method.get)

  return {
    defaultEtude: JSON.parse(JSON.stringify(defaultEtude)),
    defaultScope: scope,
    etudes: etudes,
    defaultLienEtSocial: responseLES.data || new LienEtSocial(),
    defaultDocuments: defaultDocuments.data,
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
          url: process.env.NEXT_PUBLIC_BACKEND_URL + favicon.data.attributes.icon.data.attributes.url,
          href: process.env.NEXT_PUBLIC_BACKEND_URL + favicon.data.attributes.icon.data.attributes.url,
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



      <body className={`flex h-full overflow-x-hidden`}>
        <MainStyle etude={parameters.defaultEtude} />

        <Providers documents={parameters.defaultDocuments} etudes={parameters.etudes.data} defaultScope={parameters.defaultScope} defaultEtude={parameters.defaultEtude} defaultLienEtSocial={parameters.defaultLienEtSocial}>
          <div className="flex w-full relative">
            <Layout>{children}</Layout>

          </div>

          <LoadingState></LoadingState>

          <Notification></Notification>
        </Providers>
      </body>
    </html>
  )
}
