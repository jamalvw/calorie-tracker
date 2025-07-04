import { ErrorCode, NutritionixNutrientsRequest, NutritionixNutrientsResponse } from '@/utils/types'
import { NextRequest, NextResponse } from 'next/server'

const apiUrl = 'https://trackapi.nutritionix.com/v2/natural/nutrients'

export async function POST(req: NextRequest): Promise<NextResponse<NutritionixNutrientsResponse>> {
    if (!process.env.NUTRITIONIX_APP_ID || !process.env.NUTRITIONIX_APP_KEY) {
        return NextResponse.json({ error: { code: ErrorCode.UNKNOWN } } as NutritionixNutrientsResponse, { status: 500 })
    }

    const { query, num_servings, aggregate, line_delimited, use_raw_foods, include_subrecipe, timezone, consumed_at, use_branded_foods, taxonomy, ingredient_statement, last_modified }: NutritionixNutrientsRequest = await req.json()

    if (!query) {
        return NextResponse.json({ error: { code: ErrorCode.MISSING_REQUIRED_FIELDS } } as NutritionixNutrientsResponse, { status: 400 })
    }

    const res = await fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'x-app-id': process.env.NUTRITIONIX_APP_ID,
            'x-app-key': process.env.NUTRITIONIX_APP_KEY,
            'x-remote-user-id': process.env.NODE_ENV === 'development' ? '0' : '1'
        },
        body: JSON.stringify({
            query,
            num_servings,
            aggregate,
            line_delimited,
            use_raw_foods,
            include_subrecipe,
            timezone,
            consumed_at,
            use_branded_foods,
            taxonomy,
            ingredient_statement,
            last_modified
        })
    })

    const data = await res.json()

    return NextResponse.json(data as NutritionixNutrientsResponse)
}