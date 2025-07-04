import Link from "next/link"

export default function DashboardNavbar() {
    return (
        <div className="navbar dashboard-navbar">
            <div className="navbar-left">
                <Link href="/dashboard"><h1>Calorie Tracker</h1></Link>
            </div>
            <div className="navbar-right">
                <Link href="/account/signout">Sign Out</Link>
            </div>
        </div>
    )
}