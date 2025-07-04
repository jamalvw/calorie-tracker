import { APIResponse, SignInRequest, SignInResponse, SignUpRequest, SignUpResponse } from './types'

const endpoint = '/api/users'

// TODO: Replace all generic APIResponse promises with typed responses

export async function getUser(id: number): Promise<APIResponse> {
    const res = await fetch(`${endpoint}?id=${id}`)
    return res.json()
}

export async function getAllUsers(): Promise<APIResponse> {
    const res = await fetch(`${endpoint}`)
    return res.json()
}

export async function deleteUser(id: number): Promise<APIResponse> {
    const res = await fetch(`${endpoint}?id=${id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }
    })
    return res.json()
}

export async function deleteAllUsers(): Promise<APIResponse> {
    const res = await fetch(`${endpoint}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }
    })
    return res.json()
}

export async function createUser(data: { name: string, email: string, password: string }): Promise<APIResponse> {
    const res = await fetch(`${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    })
    return res.json().then((data) => data.user)
}

export async function signIn(data: SignInRequest): Promise<SignInResponse> {
    const res = await fetch('/api/account/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    })
    return res.json()
}

export async function signUp(data: SignUpRequest): Promise<SignUpResponse> {
    const res = await fetch('/api/account/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    })
    return res.json()
}
