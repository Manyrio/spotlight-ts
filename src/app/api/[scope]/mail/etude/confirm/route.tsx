import { NextResponse } from 'next/server'

import { sendEmail } from '../../utils';

export async function GET(req: any) {
    return NextResponse.json({
        message: "Confirmation de reservation envoyée avec succès"
    }, {
        status: 200,
    });
}