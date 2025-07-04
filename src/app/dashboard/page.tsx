'use client'

import { useEffect, useState } from 'react'
import DashboardNavbar from '../_components/DashboardNavbar'
import { getSession } from '@/utils/api'
import { GetSessionResponse } from '@/utils/types'
import { User } from '@/generated/prisma'

export default function Dashboard() {
    const [user, setUser] = useState<User | null>(null)

    useEffect(() => {
        (async () => {
            const response = await getSession() as GetSessionResponse
            setUser(response.user)
        })()
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