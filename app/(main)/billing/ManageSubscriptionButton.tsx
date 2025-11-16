'use client'
import { Button } from '@/components/ui/button'
import useToast from '@/hooks/useToast'
import { CircleDollarSign, Loader2 } from 'lucide-react'
import React, { useState } from 'react'
import { createCustomerPortalSelection } from './action'

export default function ManageSubscriptionButton() {
  const {toast} = useToast()

  const [loading, setLoading] = useState(false)

  async function handleClick(){
    setLoading(true)
      try {
        const redirectUrl = await createCustomerPortalSelection()
        window.location.href = redirectUrl
      } catch (error) {
        console.log('manage sub:', error)
        toast.error('Something went wrong, please try later. Thank You!')
      }
      finally{
        setLoading(false)
      }
  }

  return<>
    <Button variant={'secondary'} disabled={loading}
      onClick={handleClick} className='flex items-center gap-2 cursor-pointer border borderColor'>
          {loading ?
              <Loader2 className='mx-auto my-6 animate-spin'/>
          :    
              <CircleDollarSign className='size-4'/>
          }
          Manage Subscription
    </Button>
  </>

}
