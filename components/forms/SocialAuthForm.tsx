'use client'
import React from 'react'
import { Button } from '../ui/button'
import Image from 'next/image'
import { toast } from 'sonner'
import { signIn } from 'next-auth/react'
import ROUTES from '@/constants/routes'

const SocialAuthForm = () => {

    const handleSignIn = async (provider: "github" | 'google') => {
        try {
            // throw new Error("Sign-in not implemented yet");
            await signIn(provider, {
                callbackUrl: ROUTES.HOME,
            })
        } catch (error) {
            console.log("Error during sign-in:", error);
            // Display a toast notification with the error message
            toast.error("Sign in failed", {
                description:
                    error instanceof Error
                        ? error.message
                        : "An error occured while signing in",
            });
        }
    }

    return (
        <div className='mt-10 flex flex-wrap gap-2.5'>
            <Button className="button-primary" onClick={() => handleSignIn("github")}>
                <Image 
                    src="/icons/github.svg"
                    alt="GitHub Logo"
                    width={20}
                    height={20}
                    className='invert-colors mr-2.5 object-contain'
                />
                <span>Log in with GitHub</span>
            </Button>

            <Button className="button-primary" onClick={() => handleSignIn("google")}>
                <Image
                    src="/icons/google.svg"
                    alt="Google Logo"
                    width={20}
                    height={20}
                    className='mr-2.5 object-contain'
                />
                <span>Log in with Google</span>
            </Button>
            
        </div>
    )
}

export default SocialAuthForm
