import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import {NextAuthOptions} from "next-auth";

export const option: NextAuthOptions = {
    providers: [
            GoogleProvider({
                clientId: process.env.GOOGLE_CLIENT_ID,
                clientSecret: process.env.GOOGLE_CLIENT_SECRET,
                profile(profile){
                    return {
                        id: profile.sub,
                        email: profile.email
                    }

                }

            }),
            CredentialsProvider({
                name: "credential",
                credentials: {
                    email: {label: "email",type: "string"},
                    password: {label: "password", type: "string"}
                },
                async authorize(credentials,req) {
                    
                    console.log("cred", credentials)



                    if (!credentials?.email || !credentials?.password) {
                        return null;
                    }

                    const host = req.headers?.host;

                    const response = await fetch(`http://${host}/api/signIn`,
                        {
                            method: "POST",
                            headers: {"Content-Type": "application/json"},
                            body: JSON.stringify(credentials)
                        })
                    if (response.status !== 200)
                        return null;

                    const user = await response.json();
                    return user;
                }
                })
        ],
    callbacks: {
        async jwt({token,user}){

            if (user){
                token.id = user.id;
                token.email = user.email;
            }

            return token
        },
        async redirect({ url, baseUrl }) {

            if (url.startsWith("/")) return `${baseUrl}${url}`

            else if (new URL(url).origin === baseUrl) return `${baseUrl}/dashboard`
            return baseUrl
        },

        async session({token,session}){

            if(token){
                session.user.id = token.id;
                session.user.email = token.email;
            }
            return session;
        }
    },
    pages: {
        signIn: '/api/auth/signin'
    },
    session: {
        strategy: "jwt",
        maxAge: 24*60*60,
        updateAge: 24*60*60,
    },

    secret: process.env.NEXTAUTH_SECRET
}