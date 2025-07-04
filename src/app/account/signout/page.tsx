'use client'

import { signOut } from '../../../utils/api'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function SignOut() {
    const router = useRouter()

    useEffect(() => {
        (async () => {
            await signOut()
            router.push('/')
        })()
    }, [])
}