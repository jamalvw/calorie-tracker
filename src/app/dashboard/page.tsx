'use client'

import { useEffect, useState } from 'react'
import DashboardNavbar from '../_components/DashboardNavbar'
import { User } from '@/generated/prisma'
import { getCurrentUser } from '@/utils/api'
import { calculateBMR, calculateCalorieGoal, calculateTDEE } from '@/utils/utils'

export default function Dashboard() {
    const [user, setUser] = useState<User | null>(null)

    const [bmr, setBMR] = useState<number>(0)
    const [tdee, setTDEE] = useState<number>(0)
    const [calorieGoal, setCalorieGoal] = useState<number>(0)

    useEffect(() => {
        (async () => {
            const response = await getCurrentUser()
            setUser(response.user)

            setBMR(calculateBMR(response.user.sex!, response.user.weight!, response.user.height!, response.user.age!))
            setTDEE(calculateTDEE(bmr, response.user.activityLevel!))
            setCalorieGoal(calculateCalorieGoal(tdee, response.user.goal!))
        })()
    }, [bmr, tdee, calorieGoal])

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
                    <br />
                    <p>BMR: {bmr}</p>
                    <p>TDEE: {tdee}</p>
                    <p>Calorie Goal: {calorieGoal}</p>
                </div>
                <div className='dashboard-content'>
                </div>
            </div>}
        </div>
    )
}