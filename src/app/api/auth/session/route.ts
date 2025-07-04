import prisma from '@/lib/prisma'
import { ErrorCode, GetSessionResponse } from '@/utils/types'
import { NextRequest, NextResponse } from 'next/server' 

/*
    GET /api/auth/session
    Returns: GetSessionResponse
*/
export async function GET(req: NextRequest): Promise<NextResponse<GetSessionResponse>> {
    const sessionId = req.cookies.get('session')?.value

    if (!sessionId) {
        return NextResponse.json({ error: { code: ErrorCode.INVALID_SESSION } } as GetSessionResponse, { status: 401 })
    }

    const session = await prisma.session.findUnique({ where: { id: sessionId } })

    if (!session || session.expiresAt < new Date()) {
        return NextResponse.json({ error: { code: ErrorCode.EXPIRED_SESSION } } as GetSessionResponse, { status: 401 })
    }

    const user = await prisma.user.findUnique({ where: { id: session.userId } })

    if (!user) {
        return NextResponse.json({ error: { code: ErrorCode.INVALID_SESSION } } as GetSessionResponse, { status: 401 })
    }

    return NextResponse.json({ session, user } as GetSessionResponse)
}