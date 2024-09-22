
import { syncAnnonces } from '@/scripts/sync_annonces'
import { headers } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'
export async function GET(req: NextRequest) {
    let binary: string = await syncAnnonces()

    console.log(binary)

    const requestHeaders = new Headers(req.headers)
    requestHeaders.set('Content-Type', 'image/jpeg')

    NextResponse.next({ headers: requestHeaders })
    return NextResponse.json(Buffer.from(binary), {
        status: 403,
        headers: {
            'Content-Type': 'image/jpeg',
        },

    })
}
