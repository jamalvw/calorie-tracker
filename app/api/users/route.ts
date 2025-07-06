import prisma from '@/lib/prisma'
import { ErrorCode, UpdateUserRequest, UpdateUserResponse } from '@/utils/types'
import { NextRequest, NextResponse } from 'next/server'

/*
    PUT /api/protected/users
    Body: UpdateUserRequest
    Returns: UpdateUserResponse
*/
export async function PUT(req: NextRequest): Promise<NextResponse> {
    const { id, email, age, sex, weight, height, activityLevel, goal }: UpdateUserRequest = await req.json()

    // TODO: input validation

    if (!id) {
        return NextResponse.json({ error: { code: ErrorCode.MISSING_ID } } as UpdateUserResponse, { status: 400 })
    }
    
    if (!email || !age || !sex || !weight || !height || !activityLevel || !goal) {
        return NextResponse.json({ error: { code: ErrorCode.MISSING_REQUIRED_FIELDS } } as UpdateUserResponse, { status: 400 })
    }

    const existingUser = await prisma.user.findUnique({ where: { email } })

    if (existingUser && existingUser.id !== parseInt(id)) {
        return NextResponse.json({ error: { code: ErrorCode.EMAIL_IN_USE } } as UpdateUserResponse, { status: 400 })
    }

    const user = await prisma.user.update({
        where: { id: parseInt(id) },
        data: { email, age, sex, weight, height, activityLevel, goal }
    })

    return NextResponse.json({ success: true, user } as UpdateUserResponse)
}