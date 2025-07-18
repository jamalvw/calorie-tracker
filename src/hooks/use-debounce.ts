'use client'

import { useEffect, useState } from 'react'

/*
    Debounces a value for a given delay
    @param value - The value to debounce
    @param delay - The delay in milliseconds
    @returns The debounced value
*/
export const useDebounce = <T,>(value: T, delay: number): T => {
    const [debouncedValue, setDebouncedValue] = useState(value)

    useEffect(() => {
        const timer = setTimeout(() => setDebouncedValue(value), delay)
        return () => clearTimeout(timer)
    }, [value, delay])

    return debouncedValue
}