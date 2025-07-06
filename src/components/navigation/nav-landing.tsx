import Link from 'next/link'

export default function NavLanding() {
    return (
        <div className="navbar landing-navbar">
            <div className="navbar-left">
                <Link href="/"><h1>Calorie Tracker</h1></Link>
            </div>
            <div className="navbar-right">
                <Link href="/flow/signin">Sign In / Sign Up</Link>
            </div>
        </div>
    )
}