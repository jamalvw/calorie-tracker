import prisma from '@/lib/prisma'
import { ErrorCode, SignUpRequest } from '../../../../utils/types'
import bcrypt from 'bcrypt'
import { NextRequest, NextResponse } from 'next/server'

/*
    POST /api/account/signup
    Body: SignUpRequest
    Returns: User
*/
export async function POST(req: NextRequest) {
    const { name, email, password }: SignUpRequest = await req.json()

    if (!name || !email || !password) {
        return NextResponse.json({ SignUpResponse: { error: { code: ErrorCode.MISSING_REQUIRED_FIELDS } } }, { status: 400 })
    }

    const existingUser = await prisma.user.findUnique({ where: { email }})

    if (existingUser) {
        return NextResponse.json({ SignUpResponse: { error: { code: ErrorCode.EMAIL_IN_USE } } }, { status: 400 })
    }

    const user = await prisma.user.create({
        data: { name, email, hashedPassword: await bcrypt.hash(password, 10) }
    })

    const session = await prisma.session.create({
        data: { userId: user.id, expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7) }
    })

    const response = NextResponse.json({ SignUpResponse: { user } })

    response.cookies.set('session', session.id, {
        httpOnly: true,
        secure: true,
        path: '/',
        maxAge: 60 * 60 * 24 * 7, // 7 days
    })
    
    return response
}