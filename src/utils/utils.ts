import { ActivityLevel, Goal, Sex } from '@/generated/prisma'
import { useEffect, useState } from 'react'

// Mifflin-St Jeor Equation
export const calculateBMR = (sex: Sex, weight: number, height: number, age: number) => {
    // TODO: research what do to for different sexes
    switch (sex) {
    case Sex.MALE:
        return 10 * weight + 6.25 * height - 5 * age + 5
    case Sex.FEMALE:
        return 10 * weight + 6.25 * height - 5 * age - 161
    default:
        throw new Error('Invalid sex')
    }
}

export const calculateTDEE = (bmr: number, activityLevel: ActivityLevel): number => {
    switch (activityLevel) {
    case ActivityLevel.SEDENTARY:
        return bmr * 1.2
    case ActivityLevel.LIGHT:
        return bmr * 1.375
    case ActivityLevel.MODERATE:
        return bmr * 1.55
    case ActivityLevel.HIGH:
        return bmr * 1.725
    default:
        throw new Error('Invalid activity level')
    }
}

export const calculateCalorieGoal = (tdee: number, goal: Goal): number => {
    switch (goal) {
    case Goal.GAIN_MUSCLE:
        return tdee + 500
    case Goal.LOSE_WEIGHT:
        return tdee - 500
    case Goal.MAINTAIN_WEIGHT:
        return tdee
    default:
        throw new Error('Invalid goal')
    }
}

export const useDebounce = <T>(value: T, delay: number): T => {
    const [debounced, setDebounced] = useState(value)

    useEffect(() => {
        const timer = setTimeout(() => setDebounced(value), delay)
        return () => clearTimeout(timer)
    }, [value, delay])

    return debounced
}