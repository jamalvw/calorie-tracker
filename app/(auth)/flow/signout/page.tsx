'use client'

import { signOut } from '@/utils/api'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function SignOut() {
    const router = useRouter()

    useEffect(() => {
        (async () => {
            const response = await signOut()

            if (!response || response.error) {
                return router.push('/')
            }

            setTimeout(() => {
                router.push('/')
            }, 5000)
        })()
    }, [router])

    return (
        <div>
            <h1>You have been signed out.</h1>
            <p>You will be redirected home in 5 seconds.</p>
        </div>
    )
}