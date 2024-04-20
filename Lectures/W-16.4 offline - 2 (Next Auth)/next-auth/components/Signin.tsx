"use client"
import { signIn } from 'next-auth/react'
import React from 'react'
import { useRouter } from 'next/navigation';

export default function Signin() {
    const router = useRouter();

    return (
        <div>
            <button onClick={async () => {
                await signIn("google")
            }}>Login with google</button>
            <br />
            <button onClick={async () => {
                await signIn("github")
            }}>Login with github</button>
            <br />

            <div>
                {/* couple of input fields */}

                <button onClick={async () => {
                    const res = await signIn("credentials", {
                        username: '',
                        password: '',
                        redirect: false
                    })
                    console.log(res);
                    router.push("/")
                }}>Login with email</button>
            </div>
        </div>
    )
}
