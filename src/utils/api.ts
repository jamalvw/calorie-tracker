import { GetCurrentUserResponse, SignInRequest, SignInResponse, SignOutResponse, SignUpRequest, SignUpResponse, UpdateUserRequest, UpdateUserResponse } from './types'

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

    if (!res.ok) return null

    return res.json()
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

    if (!res.ok) return null

    return res.json()
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

    if (!res.ok) return null

    return res.json()
}

/*
 * Get Current User
 */
export async function getCurrentUser(): Promise<GetCurrentUserResponse | null> {
    const res = await fetch(`${baseUrl}/api/auth/current-user`, {
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
    })

    if (!res.ok) return null

    return res.json()
}

/*
 * Update User
 */
export async function updateUser(data: UpdateUserRequest): Promise<UpdateUserResponse | null> {
    const res = await fetch(`${baseUrl}/api/auth/update-user`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(data)
    })

    if (!res.ok) return null

    return res.json()
}