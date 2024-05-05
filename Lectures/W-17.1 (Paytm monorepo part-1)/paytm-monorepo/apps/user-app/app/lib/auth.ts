
import db from '@manaspaytm/db/client'
import CredentialProvider from "next-auth/providers/credentials";
import { Session, TokenSet } from 'next-auth'
import bcrypt from "bcrypt"

export const authOptions = {
    providers: [
        CredentialProvider({
            name: "Phone Number",
            
            credentials: {
                name: {
                    label: "Full Name",
                    type: "text",
                    placeholder: "John Doe"
                },
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
            // TODO: User credentials type from next-auth
            async authorize(credentials: any): Promise<any> {

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
                            name: credentials.name,
                            number: credentials.phone,
                            password: hashedPassword
                        }
                    })

                    await db.balance.create({
                        data: {
                            userId: user.id,
                            amount: 0,
                            locked: 0
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
        }),
    ],
    secret: process.env.JWT_SECRET || "secret",
    callbacks: {
        async session({ token, session }: {
            token: TokenSet,
            session: Session
        }) {
            if (session?.user) {
                session.user.id = token.sub as string;
            }

            return session
        }
    },
    // whether authentication is mandatory (true) or optional (false) for accessing protected routes or resources.
    required: true // or false depending requirement
}