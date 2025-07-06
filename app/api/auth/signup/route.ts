import prisma from '@/lib/prisma'
import { ErrorCode, SignUpRequest, SignUpResponse } from '@/utils/types'
import bcrypt from 'bcrypt'
import { NextRequest, NextResponse } from 'next/server'

/*
    POST /api/auth/signup
    Body: SignUpRequest
    Returns: SignUpResponse
*/
export async function POST(req: NextRequest): Promise<NextResponse<SignUpResponse>> {
    // TODO: some of these are not required for signup, move to post-signup flow
    // TODO: input validation
    const { name, email, password, age, sex, weight, height, activityLevel, goal }: SignUpRequest = await req.json()

    if (!name || !email || !password || !age || !sex || !weight || !height || !activityLevel || !goal) {
        return NextResponse.json({ error: { code: ErrorCode.MISSING_REQUIRED_FIELDS } } as SignUpResponse, { status: 400 })
    }

    const existingUser = await prisma.user.findUnique({ where: { email }})

    if (existingUser) {
        return NextResponse.json({ error: { code: ErrorCode.EMAIL_IN_USE } } as SignUpResponse, { status: 400 })
    }

    const user = await prisma.user.create({
        data: { name, email, hashedPassword: await bcrypt.hash(password, 10), age, sex, weight, height, activityLevel, goal }
    })

    const session = await prisma.session.create({
        data: { userId: user.id, expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7) }
    })

    const response = NextResponse.json({ user } as SignUpResponse)

    response.cookies.set('session', session.id, {
        httpOnly: true,
        secure: true,
        path: '/',
        maxAge: 60 * 60 * 24 * 7, // 7 days
    })
    
    return response
}