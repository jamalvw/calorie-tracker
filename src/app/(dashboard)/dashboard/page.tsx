'use client'

import { useEffect, useRef, useState } from 'react'
import { calculateBMR, calculateCalorieGoal, calculateTDEE } from '@/utils/utils'
import styles from './dashboard.module.css'
import { useUser } from '@/providers/user-provider'
import { BookOpenTextIcon, EditIcon, PenIcon, PlusIcon } from 'lucide-react'

function setProgress(element: SVGSVGElement, value: number) {
    const progress = element.querySelector(`.${styles.progress}`) as SVGCircleElement
    const radius = progress.r.baseVal.value
    const circumference = 2 * Math.PI * radius

    progress.style.strokeDasharray = `${circumference} ${circumference}`
    progress.style.strokeDashoffset = `${circumference - value * circumference}`
}

export default function Dashboard() {
    const user = useUser()
    
    const [bmr, setBMR] = useState<number>(0)
    const [tdee, setTDEE] = useState<number>(0)
    const [calorieGoal, setCalorieGoal] = useState<number>(0)

    //const [search, setSearch] = useState<string>('')
    //const [results, setResults] = useState<NutritionixFood[]>([])
    //const [focusedItem, setFocusedItem] = useState<NutritionixFood | null>(null)
    //const [view, setView] = useState<string | null>(null)
    //const debouncedSearch = useDebounce(search, 500)

    const caloriesProgressCircle = useRef<SVGSVGElement>(null)

    useEffect(() => {
        (async () => {
            setBMR(calculateBMR(user.sex!, user.weight!, user.height!, user.age!))
            setTDEE(calculateTDEE(bmr, user.activityLevel!))
            setCalorieGoal(calculateCalorieGoal(tdee, user.goal!))
            setProgress(caloriesProgressCircle.current!, 1 - (0 / calorieGoal))
        })()
    }, [bmr, tdee, calorieGoal, user])

    //useEffect(() => {
    //    (async () => {
    //        if (debouncedSearch.length < 3 || debouncedSearch.length > 100) return
    //        
    //        const request: NutritionixSearchRequest = { query: debouncedSearch.trim() }
    //        const response = await nutritionixSearch(request) as NutritionixSearchResponse
    //        
    //        if (!response || response.error) {
    //            switch (response?.error?.code) {
    //            case ErrorCode.MISSING_REQUIRED_FIELDS:
    //                console.log('Missing required fields')
    //            default:
    //                console.log('There was an error searching for a food. Please contact support.')
    //            }
    //        }
    //        
    //        setResults([...(response?.common || []), ...(response?.branded || []), ...(response?.local || [])])
    //    })()
    //}, [debouncedSearch])

    //const openAddFoodView = async (food: NutritionixFood) => {
    //    if (food.local) {
    //        setFocusedItem(food)
    //        return
    //    }

    //    const request: NutritionixNutrientsRequest = { query: `${food.food_name}` }
    //    const response = await nutritionixNutrients(request) as NutritionixNutrientsResponse

    //    if (!response || response.error) {
    //        switch (response?.error?.code) {
    //        case ErrorCode.MISSING_REQUIRED_FIELDS:
    //            console.log('Missing required fields')
    //        default:
    //            console.log('There was an error getting the nutrients for the food. Please contact support.')
    //        }
    //    }

    //    setFocusedItem(response?.foods[0])
    //    setView('addFood')
    //}

    //const closeModal = () => {
    //    setView(null)
    //}

    return (
        <div className={styles.container}>
            <div className={styles.dashboard}>
                <div className={styles.dashboardHeader}>
                    <div className={styles.headerLeft}>
                        <div className={styles.headerItem}>
                            <div className={styles.today}>Today</div>
                            <div className={styles.date}>{new Date().toLocaleDateString()}</div>
                        </div>
                    </div>
                    <div className={styles.headerRight}>
                        <div className={styles.headerItem}>
                            <div className={styles.streak}>
                                <div className={styles.streakValue}>12</div>
                                <div className={styles.streakLabel}>day<br />streak</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles.dashboardControls}>
                    <button className={styles.dashboardControl}>
                        <PlusIcon className={styles.dashboardControlIcon} />
                        Food
                    </button>
                    <button className={styles.dashboardControl}>
                        <PlusIcon className={styles.dashboardControlIcon} />
                        Exercise
                    </button>
                    <button className={styles.dashboardControl}>
                        <PlusIcon className={styles.dashboardControlIcon} />
                        Water
                    </button>
                    <button className={styles.dashboardControl}>
                        <PlusIcon className={styles.dashboardControlIcon} />
                        Diary
                    </button>
                </div>
                <div className={styles.dashboardContent}>
                    <div className={`${styles.dashboardItem} ${styles.half}`} data-type='calories'>
                        <div className={styles.dashboardItemHeader}>
                            <div className={styles.dashboardItemTitle}>
                                <div className={styles.dashboardItemTitleText}>Calories</div>
                                <div className={styles.dashboardItemControls}>
                                    <button className={styles.dashboardItemControl}>
                                        <PenIcon className={styles.dashboardControlIcon} />
                                    </button>
                                </div>
                            </div>
                            <div className={styles.dashboardItemDescription}>Remaining = Goal - Food + Exercise</div>
                        </div>
                        <div className={styles.dashboardItemContent}>
                            <div className={styles.caloriesContainer}>
                                <div className={styles.progressCircle}>
                                    <svg width='100%' height='100%' ref={caloriesProgressCircle}>
                                        <circle className={styles.background} cx='50%' cy='50%' r='44%' />
                                        <circle className={styles.progress} cx='50%' cy='50%' r='44%' />
                                    </svg>
                                    <div className={styles.progressText}>
                                        <div className={styles.value}>{Math.round(calorieGoal)}</div>
                                        <div className={styles.label}>Remaining</div>
                                    </div>
                                </div>
                                <div className={styles.caloriesDetails}>
                                    <div className={styles.caloriesDetailsItem}>
                                        <div className={styles.title}>Goal</div>
                                        <div className={styles.value}>{Math.round(calorieGoal)}</div>
                                    </div>
                                    <div className={styles.caloriesDetailsItem}>
                                        <div className={styles.title}>Food</div>
                                        <div className={styles.value}>0</div>
                                    </div>
                                    <div className={styles.caloriesDetailsItem}>
                                        <div className={styles.title}>Exercise</div>
                                        <div className={styles.value}>0</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={`${styles.dashboardItem} ${styles.half}`} data-type='macros'>
                        <div className={styles.dashboardItemHeader}>
                            <div className={styles.dashboardItemTitle}>
                                <div className={styles.dashboardItemTitleText}>Macros</div>
                                <div className={styles.dashboardItemControls}>
                                    <button className={styles.dashboardItemControl}>
                                        <PenIcon className={styles.dashboardControlIcon} />
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className={styles.dashboardItemContent}>
                            <div className={styles.macrosContainer}>
                                <div className={styles.macrosItem} data-type='protein'>
                                    <div className={styles.title}>Protein</div>
                                    <div className={styles.progressCircle}>
                                        <svg width='100%' height='100%'>
                                            <circle className={styles.background} cx='50%' cy='50%' r='44%' />
                                            <circle className={styles.progress} cx='50%' cy='50%' r='44%' />
                                        </svg>
                                        <div className={styles.progressText}>
                                            <div className={styles.value}>5g</div>
                                            <div className={styles.label}>Remaining</div>
                                        </div>
                                    </div>
                                </div>
                                <div className={styles.macrosItem} data-type='carbs'>
                                    <div className={styles.title}>Carbs</div>
                                    <div className={styles.progressCircle}>
                                        <svg width='100%' height='100%'>
                                            <circle className={styles.background} cx='50%' cy='50%' r='44%' />
                                            <circle className={styles.progress} cx='50%' cy='50%' r='44%' />
                                        </svg>
                                        <div className={styles.progressText}>
                                            <div className={styles.value}>5g</div>
                                            <div className={styles.label}>Remaining</div>
                                        </div>
                                    </div>
                                </div>
                                <div className={styles.macrosItem} data-type='fat'>
                                    <div className={styles.title}>Fat</div>
                                    <div className={styles.progressCircle}>
                                        <svg width='100%' height='100%'>
                                            <circle className={styles.background} cx='50%' cy='50%' r='44%' />
                                            <circle className={styles.progress} cx='50%' cy='50%' r='44%' />
                                        </svg>
                                        <div className={styles.progressText}>
                                            <div className={styles.value}>5g</div>
                                            <div className={styles.label}>Remaining</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={`${styles.dashboardItem} ${styles.third}`} data-type='meals'>
                        <div className={styles.dashboardItemHeader}>
                            <div className={styles.dashboardItemTitle}>
                                <div className={styles.dashboardItemTitleText}>Meals</div>
                                <div className={styles.dashboardItemControls}>
                                    <button className={styles.dashboardItemControl}>
                                        <PlusIcon className={styles.dashboardControlIcon} />
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className={styles.dashboardItemContent}>
                            <div className={`${styles.meals} ${styles.dashboardItemList}`}>
                                <button className={`${styles.meal} ${styles.dashboardItemListNode}`}>
                                    <div className={styles.mealDetails}>
                                        <div className={styles.listNodeTitle}>Breakfast</div>
                                        <div className={styles.listNodeDescription}>600 calories</div>
                                    </div>
                                    <PenIcon className={styles.dashboardControlIcon} />
                                </button>
                                <button className={`${styles.meal} ${styles.dashboardItemListNode}`}>
                                    <div className={styles.mealDetails}>
                                        <div className={styles.listNodeTitle}>Lunch</div>
                                        <div className={styles.listNodeDescription}>600 calories</div>
                                    </div>
                                    <PenIcon className={styles.dashboardControlIcon} />
                                </button>
                                <button className={`${styles.meal} ${styles.dashboardItemListNode}`}>
                                    <div className={styles.mealDetails}>
                                        <div className={styles.listNodeTitle}>Dinner</div>
                                        <div className={styles.listNodeDescription}>600 calories</div>
                                    </div>
                                    <PenIcon className={styles.dashboardControlIcon} />
                                </button>
                                <button className={`${styles.meal} ${styles.dashboardItemListNode}`}>
                                    <div className={styles.mealDetails}>
                                        <div className={styles.listNodeTitle}>Snack</div>
                                        <div className={styles.listNodeDescription}>600 calories</div>
                                    </div>
                                    <PenIcon className={styles.dashboardControlIcon} />
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className={`${styles.dashboardItem} ${styles.third}`} data-type='water'>
                        <div className={styles.dashboardItemHeader}>
                            <div className={styles.dashboardItemTitle}>
                                <div className={styles.dashboardItemTitleText}>Water</div>
                                <div className={styles.dashboardItemControls}>
                                    <button className={styles.dashboardItemControl}>
                                        <PlusIcon className={styles.dashboardControlIcon} />
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className={styles.dashboardItemContent}>
                            <div className={styles.waterContainer}>
                                <div className={styles.progressCircle}>
                                    <svg width='100%' height='100%'>
                                        <circle className={styles.background} cx='50%' cy='50%' r='44%' />
                                        <circle className={styles.progress} cx='50%' cy='50%' r='44%' />
                                    </svg>
                                    <div className={styles.progressText}>
                                        <div className={styles.value}>500ml</div>
                                        <div className={styles.label}>Remaining</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={styles.dashboardItemFooter}>
                            <div className={styles.waterDetails}>
                                <div className={styles.waterDetailsItem}>
                                    <div className={styles.title}>Goal</div>
                                    <div className={styles.value}>500ml</div>
                                </div>
                                <div className={styles.waterDetailsItem}>
                                    <div className={styles.title}>Drank</div>
                                    <div className={styles.value}>500ml</div>
                                </div>
                                <div className={styles.waterDetailsItem}>
                                    <div className={styles.title}>Streak</div>
                                    <div className={styles.value}>12 days</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={`${styles.dashboardItem} ${styles.third}`} data-type='diary'>
                        <div className={styles.dashboardItemHeader}>
                            <div className={styles.dashboardItemTitle}>
                                <div className={styles.dashboardItemTitleText}>Diary</div>
                                <div className={styles.dashboardItemControls}>
                                    <button className={styles.dashboardItemControl}>
                                        <EditIcon className={styles.dashboardControlIcon} />
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className={styles.dashboardItemContent}>
                            <div className={`${styles.diaryList} ${styles.dashboardItemList}`}>
                                <button className={`${styles.diaryItem} ${styles.dashboardItemListNode}`}>
                                    <div className={styles.diaryItemDetails}>
                                        <div className={styles.listNodeTitle}>Today</div>
                                        <div className={styles.listNodeDescription}>{new Date().toLocaleDateString()}</div>
                                    </div>
                                    <BookOpenTextIcon className={styles.dashboardControlIcon} />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}