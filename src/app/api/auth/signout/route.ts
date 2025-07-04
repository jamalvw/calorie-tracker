import prisma from '@/lib/prisma'
import { ErrorCode, SignOutResponse } from '@/utils/types'
import { NextRequest, NextResponse } from 'next/server'

/*
    POST /api/auth/signout
    Returns: SignOutResponse
*/
export async function POST(req: NextRequest): Promise<NextResponse<SignOutResponse>> {
    const sessionId = req.cookies.get('session')?.value

    if (!sessionId) {
        return NextResponse.json({ error: { code: ErrorCode.INVALID_SESSION } } as SignOutResponse, { status: 401 })
    }

    const session = await prisma.session.findUnique({ where: { id: sessionId } })

    if (!session) {
        return NextResponse.json({ error: { code: ErrorCode.INVALID_SESSION } } as SignOutResponse, { status: 401 })
    }

    await prisma.session.delete({ where: { id: sessionId } })

    const response = NextResponse.json({ success: true } as SignOutResponse)

    response.cookies.delete('session')

    return response
}
