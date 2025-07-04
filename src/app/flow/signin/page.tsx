'use client'
import { signIn } from '../../../utils/api'
import { ErrorCode, SignInRequest, SignInResponse } from '../../../utils/types'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function SignIn() {
    const router = useRouter()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [showPassword, setShowPassword] = useState(false)

    const passwordInputType = showPassword ? 'text' : 'password'

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        const request: SignInRequest = { email, password }
        const response = await signIn(request) as SignInResponse

        if (!response || response.error) {
            switch (response.error?.code) {
            case ErrorCode.INVALID_CREDENTIALS:
                return setError('Invalid email or password')
            default:
                return setError('There was an error signing in. Please contact support.')
            }
        }

        router.push('/dashboard')
    }

    return (
        <div>
            <h1>Sign In</h1>
            <form className="signin-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email address" required />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type={passwordInputType} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
                    <div className="show-password-toggle">
                        <input type="checkbox" onChange={() => setShowPassword(!showPassword)} checked={showPassword} /> <label onClick={() => setShowPassword(!showPassword)} htmlFor="show-password">Show Password</label>
                    </div>
                </div>
                {error && <p className="error">{error}</p>}
                <button type="submit">Sign In</button>
                <p>Don&apos;t have an account? <Link href="/flow/signup">Sign Up</Link></p>
                <p>Forgot your password? <Link href="/flow/reset-password">Reset Password</Link></p>
            </form>
        </div>
    )
}