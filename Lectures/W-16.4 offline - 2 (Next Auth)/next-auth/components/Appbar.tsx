"use client"
import { signIn, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
export const Appbar = () => {
    const router = useRouter();

    return (
        <div>
            {/* general solution */}
            {/* <button onClick={() => {
                router.push('/api/auth/signin')
            }}>Signin</button>
            <button onClick={() => {}}>Logout</button> */}

            {/* using nextauth's signin and signout */}
            <button onClick={() => {
                signIn()
            }}>Signin</button>
            <button onClick={() => {
                signOut()
            }}>Logout</button>            
        </div>
    )
}