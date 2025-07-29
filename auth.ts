import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github"
import Google from "next-auth/providers/google"
import { createSupabaseServerClient } from "@/lib/supabase"

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [GitHub, Google],
    callbacks: {
        async signIn({ user, account, profile }) {
            // Optional: Save user to Supabase on sign in
            if (user.email) {
                try {
                    const supabase = createSupabaseServerClient()
                    
                    // Insert or update user in Supabase
                    const { error } = await supabase
                        .from('users')
                        .upsert({
                            id: user.id,
                            email: user.email,
                            name: user.name,
                            image: user.image,
                            provider: account?.provider,
                            provider_account_id: account?.providerAccountId,
                            updated_at: new Date().toISOString()
                        })
                    
                    if (error) {
                        console.error('Error saving user to Supabase:', error)
                        // Don't block sign in if Supabase fails
                    }
                } catch (error) {
                    console.error('Error connecting to Supabase:', error)
                }
            }
            return true
        },
        async session({ session, token }) {
            // Add user ID to session
            if (session.user) {
                session.user.id = token.sub!
            }
            return session
        },
        async jwt({ token, user, account }) {
            // Persist the OAuth provider and account info
            if (account) {
                token.provider = account.provider
                token.providerAccountId = account.providerAccountId
            }
            return token
        }
    },
    session: {
        strategy: "jwt"
    }
})