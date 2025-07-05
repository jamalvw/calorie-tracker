import NavApp from '@/components/nav-app'
import prisma from '@/lib/prisma'
import { cookies } from 'next/headers'

export default async function AppLayout({ children }: { children: React.ReactNode }) {
    const sessionId = (await cookies()).get('session')?.value
    const session = await prisma.session.findUnique({
        where: { id: sessionId },
        include: { user: true }
    })
    const user = session?.user

    return (
        <div>
            <NavApp user={user!} />
            {children}
        </div>
    )
}