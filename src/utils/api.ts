import { GetCurrentUserResponse, NutritionixNutrientsResponse, NutritionixNutrientsRequest, NutritionixSearchRequest, NutritionixSearchResponse, SignInRequest, SignInResponse, SignOutResponse, SignUpRequest, SignUpResponse, UpdateUserRequest, UpdateUserResponse, CreateCustomFoodRequest, CreateCustomFoodResponse } from './types'

const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'

/*
 * Sign In
 */
export async function signIn(data: SignInRequest): Promise<SignInResponse | null> {
    const res = await fetch(`${baseUrl}/api/auth/signin`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(data)
    })

    try { return await res.json() } catch { return null }
}

/*
 * Sign Up
 */
export async function signUp(data: SignUpRequest): Promise<SignUpResponse | null> {
    const res = await fetch(`${baseUrl}/api/auth/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(data)
    })

    try { return await res.json() } catch { return null }
}

/*
 * Sign Out
 */
export async function signOut(): Promise<SignOutResponse | null> {
    const res = await fetch(`${baseUrl}/api/auth/signout`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
    })

    try { return await res.json() } catch { return null }
}

/*
 * Get Current User
 */
export async function getCurrentUser(): Promise<GetCurrentUserResponse | null> {
    const res = await fetch(`${baseUrl}/api/auth/current-user`, {
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
    })

    try { return await res.json() } catch { return null }
}

/*
 * Update User
 */
export async function updateUser(data: UpdateUserRequest): Promise<UpdateUserResponse | null> {
    const res = await fetch(`${baseUrl}/api/users`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(data)
    })

    try { return await res.json() } catch { return null }
}

/*
 * Create Custom Food
 */
export async function createCustomFood(data: CreateCustomFoodRequest): Promise<CreateCustomFoodResponse | null> {
    const res = await fetch(`${baseUrl}/api/foods`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(data)
    })
    
    try { return await res.json() } catch { return null }
}

/*
 * Search with Nutritionix
 */
export async function nutritionixSearch(data: NutritionixSearchRequest): Promise<NutritionixSearchResponse | null> {
    const params = new URLSearchParams(
        Object.fromEntries(
            Object.entries(data).filter(([, v]) => v != null).map(([k, v]) => [k, String(v)])
        )
    ).toString()

    const res = await fetch(`${baseUrl}/api/nutritionix/search?${params}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
    })

    try { return await res.json() } catch { return null }
}

/*
 * Get Nutrients from Nutritionix
 */
export async function nutritionixNutrients(data: NutritionixNutrientsRequest): Promise<NutritionixNutrientsResponse | null> {
    const res = await fetch(`${baseUrl}/api/nutritionix/nutrients`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(data)
    })

    try { return await res.json() } catch { return null }
}