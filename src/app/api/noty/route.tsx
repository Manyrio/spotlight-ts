
import { syncAnnonces } from '@/scripts/sync_annonces'
import { headers } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'
export async function GET(req: NextRequest) {
    let binary: string = await syncAnnonces()
    console.log(binary)
    return new NextResponse(binary, {
        headers: {
            'Content-Type': 'image/jpeg',
        }
    }
    )





}


