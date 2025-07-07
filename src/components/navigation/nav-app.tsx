'use client'

import { User } from '@/generated/prisma'
import Link from 'next/link'
import styles from './nav-app.module.css'
import { LogOutIcon } from 'lucide-react'

export default function NavApp({ user }: { user: User }) {
    return (
        <div className='nav-container'>
            <div className={styles.nav}>
                <div className={styles.navLeft}>
                    <div className={styles.logo}>
                        <Link href="/dashboard"><h1>Calorie Tracker</h1></Link>
                    </div>
                </div>
                <div className={styles.navRight}>
                    <p className={styles.navControl}>Hi, <Link className={styles.username} href={`/profile/${user.id}`}>{user?.name}</Link></p>
                    <Link className={styles.navControl} href="/account">Account</Link>
                    <Link className={styles.navControl} href="/help">Help</Link>
                    <Link className={styles.navControl} href="/flow/signout"><LogOutIcon size={20} /></Link>
                </div>
            </div>
        </div>
    )
}