'use client'

import { useEffect, useState } from 'react'
import DashboardNavbar from '../_components/DashboardNavbar'
import { User } from '@/generated/prisma'
import { getCurrentUser } from '@/utils/api'

export default function Dashboard() {
    const [user, setUser] = useState<User | null>(null)

    useEffect(() => {
        getCurrentUser().then(response => setUser(response.user))
    }, [])

    return (
        <div className='dashboard-container'>
            <DashboardNavbar />
            {user && <div className='dashboard'>
                <div className='dashboard-header'>
                    <h1>Hi, {user.name}!</h1>
                    <p>Email: {user.email}</p>
                    <p>Age: {user.age}</p>
                    <p>Sex: {user.sex}</p>
                    <p>Weight: {user.weight}</p>
                    <p>Height: {user.height}</p>
                    <p>Activity Level: {user.activityLevel}</p>
                    <p>Goal: {user.goal}</p>
                </div>
                <div className='dashboard-content'>
                </div>
            </div>}
        </div>
    )
}