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
                    <h1>Hi, {user.name}</h1>
                </div>
                <div className='dashboard-content'>
                </div>
            </div>}
        </div>
    )
}