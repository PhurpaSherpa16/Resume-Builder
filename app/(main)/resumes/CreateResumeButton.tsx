'use client'
import { Button } from '@/components/ui/button'
import usePremiumModal from '@/hooks/usePremiumModal'
import { PlusSquare } from 'lucide-react'
import Link from 'next/link'

interface CreateResumeButtonProps{
    canCreate : boolean
}

export default function CreateResumeButton({canCreate}:CreateResumeButtonProps) {

    const premiumModal = usePremiumModal()
    
    if(canCreate) return(
        <Button variant={'default'} className='cursor-pointer' asChild>
        <Link href={"/editor"}>
            <PlusSquare className='size-4'/>
            New Resume
        </Link>
    </Button>
    )
    
  return (
    <>
      <Button variant={'default'} className='cursor-pointer'
      onClick={()=>premiumModal.setOpen(true)}>
        <PlusSquare className='size-4'/>
        New Resume
      </Button>
    </>
  )
}
