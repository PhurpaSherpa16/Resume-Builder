'use client'

import { Button } from '@/components/ui/button'
import usePremiumModal from '@/hooks/usePremiumModal'
import React from 'react'

export default function GetSubscriptionButton() {

    const premiumModal = usePremiumModal()

  return (
    <div className='w-fit'>
      <Button onClick={()=>premiumModal.setOpen(true)} variant={'premiumPlus'}>
      Get Premium subscription
    </Button>
    </div>
  )
}
