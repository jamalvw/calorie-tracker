'use client'

import { useEffect, useState } from 'react'
import { nutritionixNutrients, nutritionixSearch } from '@/utils/api'
import { calculateBMR, calculateCalorieGoal, calculateTDEE } from '@/utils/utils'
import { ErrorCode, NutritionixNutrientsRequest, NutritionixNutrientsResponse, NutritionixSearchRequest, NutritionixSearchResponse } from '@/utils/types'
import { NutritionixFood } from '@/lib/nutritionix/types'
import styles from './dashboard.module.css'
import AddCustomFood from '@/components/dashboard/add-custom-food'
import { useUser } from '@/providers/user-provider'

const useDebounce = <T,>(value: T, delay: number): T => {
    const [debouncedValue, setDebouncedValue] = useState(value)

    useEffect(() => {
        const timer = setTimeout(() => setDebouncedValue(value), delay)
        return () => clearTimeout(timer)
    }, [value, delay])

    return debouncedValue
}

export default function Dashboard() {
    const user = useUser()
    
    const [bmr, setBMR] = useState<number>(0)
    const [tdee, setTDEE] = useState<number>(0)
    const [calorieGoal, setCalorieGoal] = useState<number>(0)

    const [search, setSearch] = useState<string>('')
    const [results, setResults] = useState<NutritionixFood[]>([])
    const [focusedItem, setFocusedItem] = useState<NutritionixFood | null>(null)

    const [view, setView] = useState<string | null>(null)

    const debouncedSearch = useDebounce(search, 500)

    useEffect(() => {
        (async () => {
            setBMR(calculateBMR(user.sex!, user.weight!, user.height!, user.age!))
            setTDEE(calculateTDEE(bmr, user.activityLevel!))
            setCalorieGoal(calculateCalorieGoal(tdee, user.goal!))
        })()
    }, [bmr, tdee, calorieGoal, user])

    useEffect(() => {
        (async () => {
            if (debouncedSearch.length < 3 || debouncedSearch.length > 100) return
            
            const request: NutritionixSearchRequest = { query: debouncedSearch }
            const response = await nutritionixSearch(request) as NutritionixSearchResponse
            
            if (!response || response.error) {
                switch (response?.error?.code) {
                case ErrorCode.MISSING_REQUIRED_FIELDS:
                    console.log('Missing required fields')
                default:
                    console.log('There was an error searching for a food. Please contact support.')
                }
            }
            
            setResults([...(response?.common || []), ...(response?.branded || []), ...(response?.local || [])])
        })()
    }, [debouncedSearch])

    const openAddFoodView = async (food: NutritionixFood) => {
        if (food.local) {
            setFocusedItem(food)
            return
        }

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
        setView('addFood')
    }

    const closeView = () => {
        setView(null)
    }

    return (
        <div className={styles.dashboardContainer}>
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
                    <div className={styles.addFoodContainer}>
                        <div className={styles.search}>
                            <form className={styles.searchControls}>
                                <input type='text' placeholder='Search for a food' value={search} onChange={(e) => setSearch(e.target.value.trim())} disabled={view != null} />
                                <button type='button' onClick={() => setView('addCustomFood')} disabled={view != null}>Add Food</button>
                            </form>
                            <div className={styles.searchResults}>
                                {results.map((food) => (
                                    <button key={food.food_name} className={styles.searchResult} onClick={() => openAddFoodView(food)} disabled={view != null}>
                                        <h3>{food.food_name}</h3>
                                        <p>{food.serving_qty} {food.serving_unit}</p>
                                        <p>{food.nf_calories} calories</p>
                                        <p>{food.brand_name ? food.brand_name : ''}</p>
                                    </button>
                                ))}
                            </div>
                        </div>
                        <div className={styles.viewContainer}>
                            {view == 'addFood' && focusedItem && (
                                <div className={`${styles.view} ${styles.addFoodView}`}>
                                    <h3>{focusedItem.food_name}</h3>
                                    {focusedItem.brand_name && <p>{focusedItem.brand_name}</p>}
                                    <p>{focusedItem.serving_qty} {focusedItem.serving_unit}</p>
                                    <p>{focusedItem.nf_calories} calories</p>
                                    <p>{focusedItem.nf_total_fat}g fat</p>
                                    <p>{focusedItem.nf_total_carbohydrate}g carbs</p>
                                    <p>{focusedItem.nf_dietary_fiber}g fiber</p>
                                    <p>{focusedItem.nf_protein}g protein</p>
                                    <div className={styles.viewControls}>
                                        <button type='button' onClick={closeView}>Cancel</button>
                                        <button type='button' onClick={() => console.log('add food')}>Add</button>
                                    </div>
                                </div>
                            )}
                            {view == 'addCustomFood' && <AddCustomFood closeView={closeView} />}
                        </div>
                    </div>
                </div>
            </div>}
        </div>
    )
}