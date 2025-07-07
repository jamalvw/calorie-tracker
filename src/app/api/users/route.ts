import prisma from '@/lib/prisma'
import { ErrorCode, UpdateUserRequest, UpdateUserResponse } from '@/utils/types'
import { NextRequest, NextResponse } from 'next/server'

/*
    PUT /api/protected/users
    Body: UpdateUserRequest
    Returns: UpdateUserResponse
*/
export async function PUT(req: NextRequest): Promise<NextResponse> {
    const { id, data }: UpdateUserRequest = await req.json()

    // Require id
    if (!id) {
        return NextResponse.json({ error: { code: ErrorCode.MISSING_ID } } as UpdateUserResponse, { status: 400 })
    }

    // Check if user exists
    const user = await prisma.user.findUnique({ where: { id } })
    if (!user) {
        return NextResponse.json({ error: { code: ErrorCode.UNKNOWN } } as UpdateUserResponse, { status: 404 })
    }

    // Check if new email is in use
    if (data.email && data.email !== user.email) {
        const existingUser = await prisma.user.findUnique({ where: { email: data.email } })
        if (existingUser) {
            return NextResponse.json({ error: { code: ErrorCode.EMAIL_IN_USE } } as UpdateUserResponse, { status: 400 })
        }
    }

    // Update user
    const newUser = await prisma.user.update({ where: { id }, data })

    return NextResponse.json({ success: true, user: newUser } as UpdateUserResponse)
}