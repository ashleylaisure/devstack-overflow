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
                        !isMobileNav && "max-lg:hidden"
                    )}>
                        {link.label}
                    </p>
                </Link>
            )

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
