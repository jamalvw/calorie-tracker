import { NextRequest, NextResponse } from 'next/server'
import { ErrorCode, GetCurrentUserResponse } from '@/utils/types'
import prisma from '@/lib/prisma'

/*
    GET /api/auth/current-user
    Returns: GetCurrentUserResponse
*/
export async function GET(req: NextRequest): Promise<NextResponse<GetCurrentUserResponse>> {
    const sessionId = req.cookies.get('session')?.value

    if (!sessionId) {
        return NextResponse.json({ error: { code: ErrorCode.INVALID_SESSION } } as GetCurrentUserResponse, { status: 401 })
    }

    const session = await prisma.session.findUnique({ where: { id: sessionId }, include: { user: true } })

    if (!session || session.expiresAt < new Date()) {
        return NextResponse.json({ error: { code: ErrorCode.EXPIRED_SESSION } } as GetCurrentUserResponse, { status: 401 })
    }

    return NextResponse.json({ session, user: session.user } as GetCurrentUserResponse)
}