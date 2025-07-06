import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
    title: 'Calorie Tracker',
    description: 'Track your calories and stay healthy',
}

export default function RootLayout({
    children,
}: Readonly<{
  children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body>{children}</body>
        </html>
    )
}
