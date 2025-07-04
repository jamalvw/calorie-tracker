'use client'

import { getCurrentUser, updateUser } from '@/utils/api'
import { Sex, ActivityLevel, Goal, User } from '@/generated/prisma'
import { useState, useEffect } from 'react'
import DashboardNavbar from '../_components/DashboardNavbar'
import { ErrorCode, UpdateUserRequest, UpdateUserResponse } from '@/utils/types'

export default function Account() {
    const [user, setUser] = useState<User | null>(null)

    const [isEditing, setIsEditing] = useState<boolean>(false)
    const [isSaving, setIsSaving] = useState<boolean>(false)

    const [name, setName] = useState<string>('')
    const [email, setEmail] = useState<string>('')
    const [age, setAge] = useState<number>(0)
    const [sex, setSex] = useState<Sex>(Sex.MALE)
    const [weight, setWeight] = useState<number>(0)
    const [height, setHeight] = useState<number>(0)
    const [activityLevel, setActivityLevel] = useState<ActivityLevel>(ActivityLevel.SEDENTARY)
    const [goal, setGoal] = useState<Goal>(Goal.GAIN_MUSCLE)
    const [error, setError] = useState<string>('')

    useEffect(() => {
        (async () => {
            const response = await getCurrentUser()

            if (!response) return

            setUser(response.user)

            setName(response.user.name!)
            setEmail(response.user.email!)
            setAge(response.user.age!)
            setSex(response.user.sex!)
            setWeight(response.user.weight!)
            setHeight(response.user.height!)
            setActivityLevel(response.user.activityLevel!)
            setGoal(response.user.goal!)
        })()
    }, [])

    const saveChanges = async () => {
        setIsSaving(true)

        const request: UpdateUserRequest = {
            id: user!.id.toString(),
            name,
            email,
            age,
            sex,
            weight,
            height,
            activityLevel,
            goal,
        }

        const response = await updateUser(request) as UpdateUserResponse

        setIsSaving(false)

        if (!response || response.error) {     
            switch (response?.error?.code) {
            case ErrorCode.MISSING_REQUIRED_FIELDS:
                return setError('Please fill in all fields')
            case ErrorCode.EMAIL_IN_USE:
                return setError('Email is already in use')
            default:
                return setError('There was an error saving changes. Please contact support.')
            }
        }

        setUser(response.user)
        setIsEditing(false)
        setError('')
    }

    return (
        <div className='account-container'>
            <DashboardNavbar />
            {user && <div className='account'>
                <div className='account-header'>
                    <h1>Account</h1>
                    <button onClick={() => setIsEditing(true)} disabled={isEditing || isSaving}>Edit</button>
                    {isEditing && <button onClick={() => saveChanges()} disabled={isSaving}>Save</button>}
                    <div className='account-edit'>
                        {/* TODO: dynamically generate form groups */}
                        <div className='form-group'>
                            <label htmlFor="name">Name</label>
                            <input type="text" value={name} onChange={(e) => setName(e.target.value)} required disabled={!isEditing}/>
                        </div>
                        <div className='form-group'>
                            <label htmlFor="email">Email</label>
                            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required disabled={!isEditing}/>
                        </div>
                        <div className='form-group'>
                            <label htmlFor="age">Age</label>
                            <input type="number" value={age} onChange={(e) => setAge(Number(e.target.value))} required disabled={!isEditing}/>
                        </div>
                        <div className='form-group'>
                            <label htmlFor="sex">Sex</label>
                            <select value={sex} onChange={(e) => setSex(e.target.value as Sex)} required disabled={!isEditing}>
                                <option value={Sex.MALE}>Male</option>
                                <option value={Sex.FEMALE}>Female</option>
                            </select>
                        </div>
                        <div className='form-group'>
                            <label htmlFor="weight">Weight</label>
                            <input type="number" value={weight} onChange={(e) => setWeight(Number(e.target.value))} required disabled={!isEditing}/>
                        </div>
                        <div className='form-group'>
                            <label htmlFor="height">Height</label>
                            <input type="number" value={height} onChange={(e) => setHeight(Number(e.target.value))} required disabled={!isEditing}/>
                        </div>
                        <div className='form-group'>
                            <label htmlFor="activityLevel">Activity Level</label>
                            <select value={activityLevel} onChange={(e) => setActivityLevel(e.target.value as ActivityLevel)} required disabled={!isEditing}>
                                <option value={ActivityLevel.SEDENTARY}>Sedentary</option>
                                <option value={ActivityLevel.LIGHT}>Light</option>
                                <option value={ActivityLevel.MODERATE}>Moderate</option>
                                <option value={ActivityLevel.HIGH}>High</option>
                            </select>
                        </div>
                        <div className='form-group'>
                            <label htmlFor="goal">Goal</label>
                            <select value={goal} onChange={(e) => setGoal(e.target.value as Goal)} required disabled={!isEditing}>
                                <option value={Goal.GAIN_MUSCLE}>Gain Muscle</option>
                                <option value={Goal.LOSE_WEIGHT}>Lose Weight</option>
                                <option value={Goal.MAINTAIN_WEIGHT}>Maintain Weight</option>
                            </select>
                        </div>
                        {error && <p className="error">{error}</p>}
                    </div>
                </div>
            </div>}
        </div>
    )
}