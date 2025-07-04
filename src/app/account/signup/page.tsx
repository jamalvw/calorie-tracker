'use client'
import { signIn, signUp } from '../../../utils/api'
import { ErrorCode, SignUpRequest, SignUpResponse } from '../../../utils/types'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function SignUp() {
    const router = useRouter()

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        // TODO: password validation
        // TODO: name validation
        // TODO: email validation
        // TODO: check if email is already in use

        const request: SignUpRequest = { name, email, password }
        const response = await signUp(request) as SignUpResponse

        if (!response || response.error) {
            switch (response.error?.code) {
            case ErrorCode.MISSING_REQUIRED_FIELDS:
                return setError('Missing required fields')
            case ErrorCode.EMAIL_IN_USE:
                return setError('Email already in use')
            default:
                return setError('There was an error signing up. Please contact support.')
            }
        }

        router.push('/dashboard')
    }

    return (
        <div>
            <h1>Sign Up</h1>
            <form className="signup-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" required />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email address" required />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
                </div>
                {error && <p className="error">{error}</p>}
                <button type="submit">Sign Up</button>
                <p>Already have an account? <Link href="/account/signin">Sign In</Link></p>
            </form>
        </div>
    )
}