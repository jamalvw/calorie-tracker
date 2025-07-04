import prisma from "../../../../lib/prisma"
import { NextRequest, NextResponse } from "next/server"

const db = prisma.goal

const INTERNAL_SERVER_ERROR_RESPONSE = NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url)
    const idParam = searchParams.get('id')
    const userIdParam = searchParams.get('user_id')
      
    try {
        // Get goal from ID
        if (idParam) {
            const id = parseInt(idParam)
            if (isNaN(id))
                return NextResponse.json({ error: 'Invalid ID' }, { status: 400 })
            const item = await db.findFirst({ where: { id }})
            return NextResponse.json(item)
        }
        // Get goals from user ID
        if (userIdParam) {
            const userId = parseInt(userIdParam)
            if (isNaN(userId))
                return NextResponse.json({ error: 'Invalid user ID' }, { status: 400 })
            const items = await db.findMany({ where: { userId }})
            return NextResponse.json(items)
        }
        return NextResponse.json({})
    } catch (err) {
        console.error(err)
        return INTERNAL_SERVER_ERROR_RESPONSE
    }
}

export async function POST(req: NextRequest) {
    const { searchParams } = new URL(req.url)

    const userId = parseInt(searchParams.get('user_id') || '')
    if (isNaN(userId))
        return NextResponse.json({ error: 'Invalid user ID' }, { status: 400 })

    try {
        const body = await req.json()
        const created = await db.create({ data: {
            user: { connect: { id: userId } },
            type: body.type,
            targetValue: body.targetValue,
            unit: body.unit
        }})
        return NextResponse.json({ success: true, created })
    } catch (err) {
        console.error(err)
        return INTERNAL_SERVER_ERROR_RESPONSE
    }
}