import NavLanding from '@/components/navigation/nav-landing'
import styles from './root.module.css'

export default function Root() {
    return (
        <div className={styles.rootContainer}>
            <NavLanding />
            <div className={styles.root}>
                <h1>Root</h1>
            </div>
        </div>
    )
}
