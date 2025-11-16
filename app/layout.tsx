import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "./theme.css";
import {ClerkProvider} from "@clerk/nextjs"
import {ThemeProvider} from "next-themes"
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({subsets: ['latin']})

export const metadata: Metadata = {
  title: {
    template: "%s - Resume Builder",
    absolute : "Resume Builder"
  },
  icons: '/ghost.png',
  description: "Professional online Resume Builder to create, customize, and download resumes for free. Fast, simple, and ideal for students and job seekers.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body className={inter.className}>
          <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange>
            {children}
            <Toaster/>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
