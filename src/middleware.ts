import { NextRequest, NextResponse } from 'next/server'

const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'

export async function middleware(req: NextRequest) {
    const sessionId = req.cookies.get('session')?.value

    if (!sessionId) {
        return NextResponse.redirect(new URL('/flow/signin', req.url))
    }

    const response = await fetch(`${baseUrl}/api/auth/current-user`, {
        headers: { 
            'Content-Type': 'application/json',
            'Cookie': req.headers.get('cookie') || ''
        },
        credentials: 'include'
    })
    const data = await response.json()

    if (!data.session || data.session.expiresAt < new Date()) {
        return NextResponse.redirect(new URL('/flow/signin', req.url))
    }

    return NextResponse.next()
}

export const config = {
    matcher: [
        '/dashboard/:path*',
        '/account/:path*',
        '/api/protected/:path*'
    ]
}