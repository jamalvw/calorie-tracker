import Link from 'next/link'

export default function MainNavbar() {
    return (
        <div className="navbar main-navbar">
            <div className="navbar-left">
                <Link href="/"><h1>Calorie Tracker</h1></Link>
            </div>
            <div className="navbar-right">
                <Link href="/flow/signin">Sign In / Sign Up</Link>
            </div>
        </div>
    )
}