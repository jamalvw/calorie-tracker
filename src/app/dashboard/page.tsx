'use client'

import { useEffect, useState } from 'react'
import DashboardNavbar from '../_components/DashboardNavbar'
import { User } from '@/generated/prisma'
import { getCurrentUser, nutritionixNutrients, nutritionixSearch } from '@/utils/api'
import { calculateBMR, calculateCalorieGoal, calculateTDEE } from '@/utils/utils'
import { ErrorCode, NutritionixNutrientsRequest, NutritionixNutrientsResponse, NutritionixSearchRequest, NutritionixSearchResponse } from '@/utils/types'
import { NutritionixFood } from '@/lib/nutritionix/types'
import styles from './dashboard.module.css'

export default function Dashboard() {
    const [user, setUser] = useState<User | null>(null)
    
    const [bmr, setBMR] = useState<number>(0)
    const [tdee, setTDEE] = useState<number>(0)
    const [calorieGoal, setCalorieGoal] = useState<number>(0)

    const [search, setSearch] = useState<string>('')
    const [results, setResults] = useState<NutritionixFood[]>([])
    const [focusedItem, setFocusedItem] = useState<NutritionixFood | null>(null)

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

    const onSearch = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

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

        setResults([...(response?.common || []), ...(response?.branded || [])])
    }

    const onFocus = async (food: NutritionixFood) => {
        const request: NutritionixNutrientsRequest = { query: `${food.food_name}` }
        const response = await nutritionixNutrients(request) as NutritionixNutrientsResponse

        if (!response || response.error) {
            switch (response?.error?.code) {
            case ErrorCode.MISSING_REQUIRED_FIELDS:
                console.log('Missing required fields')
            default:
                console.log('There was an error getting the nutrients for the food. Please contact support.')
            }
        }

        setFocusedItem(response?.foods[0])
    }

    return (
        <div className={styles.dashboardContainer}>
            <DashboardNavbar />
            {user && <div className={styles.dashboard}>
                <div className={styles.dashboardHeader}>
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
                </div>
                <div className={styles.dashboardContent}>
                    <div className={styles.search}>
                        <form onSubmit={onSearch} className={styles.searchControls}>
                            <input type='text' placeholder='Search for a food' onChange={(e) => setSearch(e.target.value)} />
                            <button type='submit'>Search</button>
                        </form>
                        <div className={styles.searchResults}>
                            <div className={styles.searchResultsList}>
                                {results.map((food) => (
                                    <button key={food.food_name} className={styles.searchResult} onClick={() => onFocus(food)}>
                                        <h3>{food.food_name}</h3>
                                        <p>{food.serving_qty} {food.serving_unit}</p>
                                        <p>{food.nf_calories} calories</p>
                                        <p>{food.brand_name ? food.brand_name : ''}</p>
                                    </button>
                                ))}
                            </div>
                            <div className={styles.searchFocusContainer}>
                                {focusedItem && (
                                    <div className={styles.searchFocus}>
                                        <h3>{focusedItem.food_name}</h3>
                                        {focusedItem.brand_name && <p>{focusedItem.brand_name}</p>}
                                        <p>{focusedItem.serving_qty} {focusedItem.serving_unit}</p>
                                        <p>{focusedItem.nf_calories} calories</p>
                                        <p>{focusedItem.nf_total_fat}g fat</p>
                                        <p>{focusedItem.nf_total_carbohydrate}g carbs</p>
                                        <p>{focusedItem.nf_dietary_fiber}g fiber</p>
                                        <p>{focusedItem.nf_protein}g protein</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>}
        </div>
    )
}