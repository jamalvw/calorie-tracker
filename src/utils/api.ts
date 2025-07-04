import { GetSessionResponse, SignInRequest, SignInResponse, SignOutResponse, SignUpRequest, SignUpResponse } from './types'

const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'

/*
 * Get Session
 */
export async function getSession(): Promise<GetSessionResponse> {
    const res = await fetch(`${baseUrl}/api/auth/session`, {
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
    })
    return res.json()
}

/*
 * Sign In
 */
export async function signIn(data: SignInRequest): Promise<SignInResponse> {
    const res = await fetch(`${baseUrl}/api/auth/signin`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(data)
    })
    return res.json()
}

/*
 * Sign Up
 */
export async function signUp(data: SignUpRequest): Promise<SignUpResponse> {
    const res = await fetch(`${baseUrl}/api/auth/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(data)
    })
    return res.json()
}

/*
 * Sign Out
 */
export async function signOut(): Promise<SignOutResponse> {
    const res = await fetch(`${baseUrl}/api/auth/signout`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
    })
    return res.json()
}
