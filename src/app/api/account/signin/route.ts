import prisma from '@/lib/prisma'
import { ErrorCode, SignInRequest } from '../../../../utils/types'
import bcrypt from 'bcrypt'
import { NextRequest, NextResponse } from 'next/server'

/*
    POST /api/account/signin
    Body: SignInRequest
    Returns: User
*/
export async function POST(req: NextRequest) {
    const { email, password }: SignInRequest = await req.json()

    const user = await prisma.user.findUnique({ where: { email }})

    if (!user || !(await bcrypt.compare(password, user.hashedPassword))) {
        return NextResponse.json({ SignInResponse: { error: { code: ErrorCode.INVALID_CREDENTIALS } } }, { status: 401 })
    }

    const session = await prisma.session.create({
        data: {
            userId: user.id,
            expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7), // 7 days
        }
    })

    const response = NextResponse.json({ SignInResponse: { user } })

    response.cookies.set('session', session.id, {
        httpOnly: true,
        secure: true,
        path: '/',
        maxAge: 60 * 60 * 24 * 7, // 7 days
    })
    
    return response
}