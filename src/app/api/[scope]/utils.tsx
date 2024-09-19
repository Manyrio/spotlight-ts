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

export async function getApiDefaultParameters() {
    let etudes: ApiListResponse<Etude> = await call("etudes?populate[colors]=*&populate[image]=*&populate[font]=*&populate[titleFont]=*&populate[pricing][populate]=*&populate[ouvertures][populate]=*&populate[seo][populate]=*", Method.get)
    let scope = Scope.Unknown
    let path: any = headers().get('path')
    if (path.startsWith("/api/" + Scope.Caulnes)) {
        scope = Scope.Caulnes
    } else if (path.startsWith("/api/" + Scope.Cast)) {
        scope = Scope.Cast
    }
    let defaultEtude = etudes.data.find((etude) => etude.attributes.slug == scope) || new Etude()
    if (defaultEtude.attributes.slug == Scope.Unknown) {
        defaultEtude.attributes.colors.data = new Color()
        defaultEtude.attributes.image.data = new Image()
    }
    let responseLES: ApiRetrieveResponse<LienEtSocial> = await call("lienetsocial", Method.get)
    let responseFavicon: ApiRetrieveResponse<Favicon> = await call("favicon", Method.get)

    return {
        defaultEtude: JSON.parse(JSON.stringify(defaultEtude)),
        defaultScope: scope,
        etudes: etudes,
        defaultLienEtSocial: responseLES.data || new LienEtSocial(),
        defaultFavicon: responseFavicon.data || new Favicon()
    }
}