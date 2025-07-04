import bcrypt from 'bcrypt'
import prisma from '../../../lib/prisma'
import { NextRequest, NextResponse } from 'next/server'

const db = prisma.user

const INTERNAL_SERVER_ERROR_RESPONSE = NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })

// Get user(s)
export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url)
    const idParam = searchParams.get('id')
    
    try {
        // Get user from ID
        if (idParam) {
            const id = parseInt(idParam)
            if (isNaN(id))
                return NextResponse.json({ error: 'Invalid ID' }, { status: 400 })
            const user = await db.findFirst({ where: { id }})
            const meals = await prisma.meal.findMany({ where: { userId: id }})
            return NextResponse.json({ ...user, meals })
        }
        const items = await db.findMany()
        return NextResponse.json(items)
    } catch (err) {
        console.error(err)
        return INTERNAL_SERVER_ERROR_RESPONSE
    }
}

// Create user
export async function POST(req: NextRequest) {
    try {
        const { name, email, password } = await req.json()

        if (!name || !email || !password)
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })

        const hashedPassword = await bcrypt.hash(password, 10)

        const user = await db.create({ data: {
            name,
            email,
            hashedPassword
        }})
        return NextResponse.json({ success: true, user })
    } catch (err) {
        console.error(err)
        return INTERNAL_SERVER_ERROR_RESPONSE
    }
}

// Delete user(s)
export async function DELETE(req: NextRequest) {
    const { searchParams } = new URL(req.url)
    const idParam = searchParams.get('id')

    try {
        // Delete user from ID
        if (idParam) {
            const id = parseInt(idParam)
            if (isNaN(id))
                return NextResponse.json({ error: 'Invalid ID' }, { status: 400 })
            const deleted = await db.delete({ where: { id }})
            return NextResponse.json({ success: true, deleted })
        }

        // Delete all users
        const deleted = await db.deleteMany()
        return NextResponse.json({ success: true, deleted })
    } catch (err) {
        console.error(err)
        return INTERNAL_SERVER_ERROR_RESPONSE
    }
}