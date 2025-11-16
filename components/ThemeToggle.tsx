'use client'
import { useTheme } from 'next-themes'
import React from 'react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu'
import { Button } from './ui/button'
import { Moon, Sun } from 'lucide-react'

export default function ThemeToggle() {
    const {theme, setTheme} = useTheme()

  return (
    <>
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant={'ghost'} size={'icon'}>
                    {
                        theme === 'dark' ? 
                        <Moon className='size-5 absolute rotate-0 scale-100 transition-all'/>
                        :
                        theme === 'system' ? <Moon className='size-5 absolute rotate-0 scale-100 transition-all'/> :
                        <Sun className='size-5 rotate-0 scale-100 transition-all'/>

                    }
                    <span className='sr-only'>Toggle theme</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end' className='border border-(--borderColor) p-0'>
                <DropdownMenuItem onClick={() => setTheme('light')}
                    className={`${theme === 'light' ? 'bg-red-300': 'hover:bg-gray-100/40'} rounded-none`}
                    >
                    Light
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme('dark')}
                    className={`${theme === 'dark' ? 'bg-red-300': 'hover:bg-gray-100/40'} rounded-none`}
                    >
                    Dark
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme('system')}
                    className={`${theme === 'system' ? 'bg-red-300': 'hover:bg-gray-100/40'} rounded-none`}
                    >
                    System
                </DropdownMenuItem>
            </DropdownMenuContent>
            </DropdownMenu>
    </>
  )
}
