'use server'
import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
const authOptions = {
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: "Email", type: "text", placeholder: "Enter your email" },
                password: { label: "Password", type: "text", placeholder: "Enter your Password" }
            },
            async authorize(credentials, req) {
                const email = credentials?.email;
                const password = credentials?.password;
                if(!email || !password){
                    return null;
                }
                const cookieStore = cookies();
                const supabase = createServerComponentClient({ cookies: () => cookieStore });
                const res = await supabase.from('users').select('*').match({ email: email});
                if(res?.data?.[0].password===password){
                    return res.data[0];
                }
                return null;
            }
        })
    ],
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: "/signIn"
    }
}

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };