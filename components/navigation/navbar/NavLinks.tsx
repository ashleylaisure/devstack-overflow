'use client'
import { SheetClose } from '@/components/ui/sheet'
import { sidebarLinks } from '@/constants'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'


const NavLinks = ({isMobileNav = false} : {isMobileNav?: boolean}) => {
    const pathname = usePathname()
    const userId = 1 // Replace with actual user ID logic
    return (
        <>
        {sidebarLinks.map((link) => {
            // Check if the current pathname matches the link's route
            // If the link's route is '/profile', append the userId to the route
            // This is to ensure that the profile link points to the correct user's profile
            // The isActive variable is used to determine if the link should be styled as active
            // It checks if the current pathname includes the link's route and if the route length is greater than 1
            // This is to avoid matching the root path '/' which is not a valid link
            // The pathname is compared directly to the link's route for exact matches
            // The cn function is used to conditionally apply classes based on the isActive state
            const isActive = (pathname.includes(link.route) && link.route.length > 1) || pathname === link.route;

            if(link.route === '/profile' ){
                if(userId) link.route = `${link.route}/${userId}`
                else return null
            }

            const LinkComponent = (
                <Link 
                    href={link.route} 
                    key={link.label} 
                    className={cn (
                        isActive
                        ? 'primary-gradient rounded-lg text-light-900' 
                        : 'text-dark300_light900'
                        , 'flex items-center justify-start gap-4 bg-transparent p-4'
                    )}>
                    <Image
                        src={link.imgURL}
                        alt={link.label}
                        width={20}
                        height={20}
                        className={cn(
                            !isActive ? 'invert-colors' : 'invert-colors opacity-60'
                        )}
                    />
                    <p className={cn(
                        isActive ? 'base-bold' : 'base-medium',
                        // hide the text on tablets when its not a mobile nav
                        !isMobileNav && "max-lg:hidden"
                    )}>
                        {link.label}
                    </p>
                </Link>
            )

            // If isMobileNav is true, wrap the LinkComponent in SheetClose
            // This is to ensure that the mobile navigation closes when a link is clicked
            // If isMobileNav is false, return the LinkComponent directly
            return isMobileNav ? (
                <SheetClose asChild key={link.label}>
                    {LinkComponent}
                </SheetClose>
            ) : ( 
                <React.Fragment key={link.label}>
                    {LinkComponent}
                </React.Fragment>
            )
        })}
        </>
    )
}

export default NavLinks
