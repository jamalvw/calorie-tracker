'use client'

import { User } from '@/generated/prisma'
import Link from 'next/link'

export default function NavApp({ user }: { user: User }) {
    return (
        <div className="navbar app-navbar">
            <div className="navbar-left">
                <Link href="/dashboard"><h1>Calorie Tracker</h1></Link>
            </div>
            <div className="navbar-right">
                <p>{user?.name}</p>
                <Link href="/account">Account</Link>
                <Link href="/flow/signout">Sign Out</Link>
            </div>
        </div>
    )
}