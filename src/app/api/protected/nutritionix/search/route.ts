import { NutritionixSearchResponse, ErrorCode } from '@/utils/types'
import { NextRequest, NextResponse } from 'next/server'

const apiUrl = 'https://trackapi.nutritionix.com/v2/search/instant'

/*
    GET /api/protected/nutritionix/search
    Params: NutritionixSearchRequest
    Returns: NutritionixSearchResponse
*/
export async function GET(req: NextRequest): Promise<NextResponse<NutritionixSearchResponse>> {
    const { searchParams } = new URL(req.url)
    const query = searchParams.get('query')

    if (!process.env.NUTRITIONIX_APP_ID || !process.env.NUTRITIONIX_APP_KEY) {
        return NextResponse.json({ error: { code: ErrorCode.UNKNOWN } } as NutritionixSearchResponse, { status: 500 })
    }

    if (!query) {
        return NextResponse.json({ error: { code: ErrorCode.MISSING_REQUIRED_FIELDS } } as NutritionixSearchResponse, { status: 400 })
    }

    const res = await fetch(`${apiUrl}?${searchParams.toString()}`, {
        headers: {
            'Content-Type': 'application/json',
            'x-app-id': process.env.NUTRITIONIX_APP_ID,
            'x-app-key': process.env.NUTRITIONIX_APP_KEY,
            'x-remote-user-id': process.env.NODE_ENV === 'development' ? '0' : '1'
        }
    })

    const data = await res.json()

    return NextResponse.json({ branded: data.branded, common: data.common } as NutritionixSearchResponse)
}