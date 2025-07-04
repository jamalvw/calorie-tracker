'use client'

import { useEffect, useState } from 'react'
import DashboardNavbar from '../_components/DashboardNavbar'
import { User } from '@/generated/prisma'
import { getCurrentUser, nutritionixSearch } from '@/utils/api'
import { calculateBMR, calculateCalorieGoal, calculateTDEE } from '@/utils/utils'
import { ErrorCode, NutritionixSearchRequest, NutritionixSearchResponse } from '@/utils/types'

export default function Dashboard() {
    const [user, setUser] = useState<User | null>(null)
    
    const [bmr, setBMR] = useState<number>(0)
    const [tdee, setTDEE] = useState<number>(0)
    const [calorieGoal, setCalorieGoal] = useState<number>(0)

    const [search, setSearch] = useState<string>('')
    const [suggestions, setSuggestions] = useState<string[]>([])

    useEffect(() => {
        (async () => {
            const response = await getCurrentUser()

            if (!response) return

            setUser(response.user)

            setBMR(calculateBMR(response.user.sex!, response.user.weight!, response.user.height!, response.user.age!))
            setTDEE(calculateTDEE(bmr, response.user.activityLevel!))
            setCalorieGoal(calculateCalorieGoal(tdee, response.user.goal!))
        })()
    }, [bmr, tdee, calorieGoal])

    const onSearch = async () => {
        const request: NutritionixSearchRequest = { query: search }
        const response = await nutritionixSearch(request) as NutritionixSearchResponse

        if (!response || response.error) {
            switch (response?.error?.code) {
            case ErrorCode.MISSING_REQUIRED_FIELDS:
                console.log('Missing required fields')
            default:
                console.log('There was an error searching for a food. Please contact support.')
            }
        }

        console.log(response)

        setSuggestions(response?.common?.map((food) => food.food_name) || [])
    }

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
                    <br />
                    <input type='text' placeholder='Search for a food' onChange={(e) => setSearch(e.target.value)} />
                    <button onClick={onSearch}>Search</button>
                    {suggestions.map((suggestion) => (
                        <div key={suggestion}>{suggestion}</div>
                    ))}
                </div>
                <div className='dashboard-content'>
                </div>
            </div>}
        </div>
    )
}