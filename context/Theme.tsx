'use client'
// Theme Provider that'll wrap the whole application and allow for theme switching
// This is specifically for Next.js applications using the next-themes package
// It provides a context for theme management and allows components to access the current theme
// and switch between light and dark modes. (a global context API for themes)
import { ThemeProvider as NextThemesProvider } from 'next-themes'
import { ThemeProviderProps } from 'next-themes'
import React from 'react'


const ThemeProvider = ({ children, ...props }: ThemeProviderProps) => {
    return (
        // Wrap the children with NextThemesProvider to provide theme context
        // This allows any component within the application to access the theme context
        // and switch themes as needed.
        // allow acces to the props allowing to check which theme is currently active
        <NextThemesProvider {...props}>
            {children}
        </NextThemesProvider>
    )
}

export default ThemeProvider
