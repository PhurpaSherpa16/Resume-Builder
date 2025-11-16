'use client'
import ThemeToggle from '@/components/ThemeToggle'
import { UserButton } from '@clerk/nextjs'
import { CreditCard } from 'lucide-react'
import { useTheme } from 'next-themes'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import {dark} from "@clerk/themes"

export default function Navbar() {
  const {theme} = useTheme()

  return (
    <header className='shadow border-b border-(--borderColor)'>
      <div className='container mx-auto py-3 px-4 xl:px-0 flex justify-between items-center'>
        <Link href={'/resumes'} >
          <Image src={'/ghost.png'} alt='logo' height={32} width={32}/>
          <span className='font-bold'>Resume Builder</span>
        </Link>
        <div className='flex gap-4 items-center justify-center'>
          <ThemeToggle/>
          <UserButton appearance={{
            theme: theme === 'dark' || theme === 'system' ? dark : undefined,
            elements: {
              avatarBox:{
                width: 32, height: 32
              }
            }
          }}>
            <UserButton.MenuItems>
              <UserButton.Link
              href='/billing'
              label='Billing'
              labelIcon={<CreditCard className='size-4'/>}
              />
            </UserButton.MenuItems>
          </UserButton>
        </div>
      </div>
    </header>
  )
}
