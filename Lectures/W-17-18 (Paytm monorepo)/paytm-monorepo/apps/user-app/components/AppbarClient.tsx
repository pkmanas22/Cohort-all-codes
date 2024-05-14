"use client"

import { AppBar } from '@repo/ui/app-bar'
import { signIn, signOut, useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import React from 'react'

export default function AppbarClient() {
    const session = useSession();
    const router = useRouter();

    return (
        <div>
            <AppBar onsignin={signIn} onsignout={async () => {
                await signOut();
                router.push('/api/auth/signin')
            }} user={session.data?.user} />
        </div>
    )
}
