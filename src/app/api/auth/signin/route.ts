import prisma from '@/lib/prisma'
import { ErrorCode, SignInRequest, SignInResponse } from '@/utils/types'
import bcrypt from 'bcrypt'
import { NextRequest, NextResponse } from 'next/server'

/*
    POST /api/auth/signin
    Body: SignInRequest
    Returns: SignInResponse
*/
export async function POST(req: NextRequest): Promise<NextResponse<SignInResponse>> {
    const { email, password }: SignInRequest = await req.json()

    const user = await prisma.user.findUnique({ where: { email }})

    if (!user || !(await bcrypt.compare(password, user.hashedPassword))) {
        return NextResponse.json({ error: { code: ErrorCode.INVALID_CREDENTIALS } } as SignInResponse, { status: 401 })
    }

    const session = await prisma.session.create({
        data: {
            userId: user.id,
            expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7), // 7 days
        }
    })

    const response = NextResponse.json({ user } as SignInResponse)

    response.cookies.set('session', session.id, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        maxAge: 60 * 60 * 24 * 7, // 7 days
    })
    
    return response
}