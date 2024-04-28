import GoogleProvider from 'next-auth/providers/google'
import db from '@manaspaytm/db/client'

export const authOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID || "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || ""
        })
    ],
    callbacks: {
        async signIn({ user, account } : {
            user: {
                email: string,
                name: string
            },
            account: {
                provider: "google" | "github"
            }
        }) {
            console.log("Hi signin")
            if (!user || !user.email) {
                return false;
            }

            await db.merchant.upsert({
                where: {
                    email: user.email
                },
                update: {
                    name: user.name,
                    auth_type: account.provider === "google" ? "Google" : "Github"
                },
                create: {
                    email: user.email,
                    name: user.name,
                    auth_type: account.provider === "google" ? "Google" : "Github"
                }
            })

            return true;
        }
    },
    secret: process.env.NEXTAUTH_SECRET || "secret"
}