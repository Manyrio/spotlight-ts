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
import TopLoader from './topLoader'
import { ContenusAffiches } from '@/models/contenusAffiches'
import { Logo } from '@/models/logo'


async function getDefaultParameters(populate: boolean = true) {
  const populateParams = populate
    ? [
      "colors",
      "sections_textes_accueil",
      "carousel",
      "sections_textes_office",
      "image",
      "font",
      "titleFont",
      "pricing",
      "ouvertures",
    ]
      .map((param) => `populate[${param}][populate]=*`)
      .join("&")
    : "";

  const etudesUrl = `etudes?populate[seo][populate]=*${populateParams ? `&${populateParams}` : ""}`;
  const etudes: ApiListResponse<Etude> = await call(etudesUrl, Method.get);

  // Extract the scope from headers
  const path: string | null = headers().get("path");
  const scope = path ? path.split("/")[1] : "";

  // Find the default Etude
  let defaultEtude = etudes.data.find((etude) => etude.attributes.slug === scope) || etudes.data[0] || new Etude();

  // Ensure defaultEtude has default values
  if (!defaultEtude.attributes.slug) {
    defaultEtude.attributes.colors.data = new Color();
    defaultEtude.attributes.image.data = new Image();
  }

  // Fetch additional data in parallel for better performance
  const [responsesCA, responseLES, logo, defaultDocuments] = await Promise.all([
    call("pages-and-contenus-affiche", Method.get) as Promise<ApiRetrieveResponse<ContenusAffiches>>,
    call("lienetsocial", Method.get) as Promise<ApiRetrieveResponse<LienEtSocial>>,
    call("logo?populate=*", Method.get) as Promise<ApiRetrieveResponse<Logo>>,
    call("documents?populate=*", Method.get) as Promise<ApiListResponse<DocumentFile>>,
  ]);

  console.log(JSON.stringify(responsesCA))
  return {
    defaultEtude: defaultEtude,
    defaultScope: scope,
    etudes,
    logo,
    defaultLienEtSocial: responseLES.data || new LienEtSocial(),
    defaultDocuments: defaultDocuments.data,
    defaultContenusAffiches: responsesCA.data || new ContenusAffiches(),
  };
}




export async function generateMetadata(): Promise<Metadata> {
  const startTime = Date.now()

  let favicon: ApiRetrieveResponse<Favicon> = await call(`favicon?populate=*`, Method.get)
  let parameters = await getDefaultParameters(false)

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
  const parameters = await getDefaultParameters()
  return (
    <html lang="fr" className={"h-full antialiased"} suppressHydrationWarning>
      <body className={`flex`}>
        <MainStyle etude={JSON.parse(JSON.stringify(parameters.defaultEtude))} />
        <Providers
          documents={parameters.defaultDocuments.map(doc => JSON.parse(JSON.stringify(doc)))}
          etudes={parameters.etudes.data.map(doc => JSON.parse(JSON.stringify(doc)))}
          defaultScope={parameters.defaultScope}
          logo={JSON.parse(JSON.stringify(parameters.logo.data))}
          defaultEtude={JSON.parse(JSON.stringify(parameters.defaultEtude))}
          defaultLienEtSocial={JSON.parse(JSON.stringify(parameters.defaultLienEtSocial))}
          defaultContenusAffiches={JSON.parse(JSON.stringify(parameters.defaultContenusAffiches))}
        >
          <div className="flex w-full relative">
            <Layout>{children}</Layout>
          </div>
          <TopLoader></TopLoader>
          <Notification />
        </Providers>
      </body>
    </html>
  )
}
