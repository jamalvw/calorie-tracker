import prisma from '@/lib/prisma'
import { CreateCustomFoodRequest, CreateCustomFoodResponse, ErrorCode } from '@/utils/types'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest): Promise<NextResponse<CreateCustomFoodResponse>> {
    const { name, brand, servingSize, servingUnit, calories, protein, carbs, fat, fiber } = await req.json() as CreateCustomFoodRequest

    if (!name) {
        return NextResponse.json({ error: { code: ErrorCode.MISSING_REQUIRED_FIELDS } } as CreateCustomFoodResponse)
    }

    const food = await prisma.food.create({
        data: { name, brand, servingSize, servingUnit, calories, protein, carbs, fat, fiber }
    })

    return NextResponse.json({ food } as CreateCustomFoodResponse)
}