import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'

export default function page() {
  
  return (
    <div className='container mx-auto py-16 space-y-6 flex items-center justify-center'>
     <div className='space-y-4 grid place-items-center'>
        <div className='text-center'>
          <h1 className='text-green-500'>Billing Success</h1>
          <p>The checkout was successfull and your account is 
            <span className='font-semibold'> {}  activated</span>, Enjoy !</p>
        </div>
        <Button asChild className='w-fit'>
          <Link href={'/editor'}>Lets create resume</Link>
        </Button>
     </div>
    </div>
  )
}
