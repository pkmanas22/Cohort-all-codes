import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";

export const NEXT_AUTH_CONFIG = {

    providers: [
        CredentialsProvider({
            name: 'Email',
            credentials: {
                username: {
                    label: 'Email',
                    type: 'email',
                    placeholder: 'example@gmail.com'
                },
                password: {
                    label: 'Password',
                    type: 'password',
                    placeholder: "********"
                },
            },
            async authorize(credentials: any) {
                console.log(credentials);

                // return null;  // if credentials incorrect
                return {
                    id: "user1",
                    name: 'manas',
                    email: "email@gmail.com",
                    password: "password"
                }
            },
        }),
        // google provider
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID || "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || ""
        }),
        // github provider
        GitHubProvider({
            clientId: process.env.GITHUB_ID || "",
            clientSecret: process.env.GITHUB_SECRET || ""
          })
    ],
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
        // update data in jwt
        jwt: async ({ user, token }: any) => {
            // console.log(user);
            // console.log(token);

            if (user) {
                token.uid = user.id
                token.password = user.password
            }
            return token;
        },

        // update data in session
        session: ({ session, token, user }: any) => {
            if (session.user) {
                session.user.id = token.id
            }
            return session
        }
    },
    pages: {
        signIn: '/signin',
    }
}