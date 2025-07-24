import type { Metadata } from "next";
import localFont from "next/font/local";
import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";

import "./globals.css";
import { auth } from "@/auth";
import { Toaster } from "@/components/ui/sonner";
import ThemeProvider from "@/context/Theme";


const inter = localFont({
  src: '../fonts/Inter-VariableFont.ttf',
  variable: "--font-inter",
  weight: "100 200 300 400 500 600 700 800 900",
});

const spaceGrotesk = localFont({
  src: '../fonts/SpaceGrotesk-VariableFont.ttf',
  variable: '--font-space-grotesk',
  weight: '100, 200, 300, 400, 500, 600, 700, 800, 900',
});


export const metadata: Metadata = {
  title: "DevStack Overflow",
  description: "A community-driven platform for asking and answering programming questions. Get help, share knowledge, and collaborate with developers from around the world. Explore topics in web development, mobile app development, algorithms, data structures, and more.",
  icons: {
    icon: "../public/images/site-logo.svg",
  },
};

const RootLayout = async ({ children }: { children: ReactNode }) => {
  const session = await auth();

  return (
    <html lang="en" suppressHydrationWarning>
      <SessionProvider session={session}>
        <body className={`${inter.className} ${spaceGrotesk.variable} antialiased`}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
          <Toaster />
        </body>
      </SessionProvider>
    </html>
  );
};

export default RootLayout;
