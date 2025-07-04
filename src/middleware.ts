import prisma from './lib/prisma'
import { NextRequest, NextResponse } from 'next/server'

export async function middleware(req: NextRequest) {
    const sessionId = req.cookies.get('session')?.value

    if (!sessionId) {
        return NextResponse.redirect(new URL('/login', req.url))
    }

    const session = await prisma.session.findUnique({
        where: { id: sessionId },
        include: { user: true }
    })

    if (!session || session.expiresAt < new Date()) {
        return NextResponse.redirect(new URL('/login', req.url))
    }

    return NextResponse.next()
}

export const config = {
    matcher: ['/api/protected/:path*']
}