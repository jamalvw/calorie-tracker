'use client'
import { ActivityLevel, Goal, Sex } from '@/generated/prisma'
import { signUp } from '@/utils/api'
import { ErrorCode, SignUpRequest, SignUpResponse } from '@/utils/types'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function SignUp() {
    const router = useRouter()

    const [name, setName] = useState<string>('')
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')

    // TODO: some of these are not required for signup, move to post-signup flow
    const [age, setAge] = useState<number>(0)
    const [sex, setSex] = useState<Sex>(Sex.MALE)
    const [weight, setWeight] = useState<number>(0)
    const [height, setHeight] = useState<number>(0)
    const [activityLevel, setActivityLevel] = useState<ActivityLevel>(ActivityLevel.SEDENTARY)
    const [goal, setGoal] = useState<Goal>(Goal.GAIN_MUSCLE)

    const [error, setError] = useState<string>('')

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        // TODO: input validation
        const request: SignUpRequest = { name, email, password, age, sex, weight, height, activityLevel, goal }
        const response = await signUp(request) as SignUpResponse

        if (!response || response.error) {
            switch (response?.error?.code) {
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
                {/* TODO: generate form fields dynamically */}
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
                <div className="form-group">
                    <label htmlFor="age">Age</label>
                    <input type="number" value={age} onChange={(e) => setAge(Number(e.target.value))} placeholder="Age" required />
                </div>
                <div className="form-group">
                    <label htmlFor="sex">Sex</label>
                    <select value={sex} onChange={(e) => setSex(e.target.value as Sex)} required>
                        <option value={Sex.MALE}>Male</option>
                        <option value={Sex.FEMALE}>Female</option>
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="weight">Weight</label>
                    <input type="number" value={weight} onChange={(e) => setWeight(Number(e.target.value))} placeholder="Weight" required />
                </div>
                <div className="form-group">
                    <label htmlFor="height">Height</label>
                    <input type="number" value={height} onChange={(e) => setHeight(Number(e.target.value))} placeholder="Height" required />
                </div>
                <div className="form-group">
                    <label htmlFor="activityLevel">Activity Level</label>
                    <select value={activityLevel} onChange={(e) => setActivityLevel(e.target.value as ActivityLevel)} required>
                        <option value={ActivityLevel.SEDENTARY}>Sedentary</option>
                        <option value={ActivityLevel.LIGHT}>Light</option>
                        <option value={ActivityLevel.MODERATE}>Moderate</option>
                        <option value={ActivityLevel.HIGH}>High</option>
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="goal">Goal</label>
                    <select value={goal} onChange={(e) => setGoal(e.target.value as Goal)} required>
                        <option value={Goal.GAIN_MUSCLE}>Gain Muscle</option>
                        <option value={Goal.LOSE_WEIGHT}>Lose Weight</option>
                        <option value={Goal.MAINTAIN_WEIGHT}>Maintain Weight</option>
                    </select>
                </div>
                <button type="submit">Sign Up</button>
                <p>Already have an account? <Link href="/flow/signin">Sign In</Link></p>
                {error && <p className="error">{error}</p>}
            </form>
        </div>
    )
}