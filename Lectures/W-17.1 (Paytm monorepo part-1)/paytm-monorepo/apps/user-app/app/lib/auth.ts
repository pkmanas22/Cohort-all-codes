
import db from '@manaspaytm/db/client'
import CredentialProvider from "next-auth/providers/credentials";
import { Session, TokenSet } from 'next-auth'
import bcrypt from "bcrypt"

export const authOptions = {
    providers: [
        CredentialProvider({
            name: "Phone Number",
            credentials: {
                phone: {
                    label: "Phone Number",
                    type: "text",
                    placeholder: "9876543210"
                },
                password: {
                    label: "Password",
                    type: "password",
                    placeholder: "********"
                }
            },
            // TODO: User credentials type from next-aut
            async authorize(credentials: any) {

                const hashedPassword = await bcrypt.hash(credentials.password, 10)

                const existingUser = await db.user.findFirst({
                    where: {
                        number: credentials?.phone
                    }
                })

                if (existingUser) {
                    const passwordValidation = await bcrypt.compare(credentials.password, existingUser.password);

                    if (passwordValidation) {
                        return {
                            id: existingUser.id.toString(),
                            name: existingUser.name,
                            email: existingUser.email,
                        }
                    }

                    return null;
                }

                try {
                    const user = await db.user.create({
                        data: {
                            number: credentials.phone,
                            password: hashedPassword
                        }
                    })

                    return {
                        id: user.id.toString(),
                        name: user.name,
                        email: user.email,
                    }
                } catch (e) {
                    console.error(e);
                    return null;
                }
            },
        })
    ],
    secret: process.env.JWT_SECRET || "secret",
    callbacks: {
        async session({ token, session }: {
            token: TokenSet,
            session: Session
        }) {
            if (session?.user) {
                session.user.id= token.sub as string;
            } 

            return session
        }
    }
}