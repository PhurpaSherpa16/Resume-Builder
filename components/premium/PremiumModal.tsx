'use client'
import { Dialog, DialogHeader } from '../ui/dialog'
import { DialogDescription, DialogTitle } from '@radix-ui/react-dialog'
import { Button } from '../ui/button'
import { Check, X } from 'lucide-react';
import usePremiumModal from '@/hooks/usePremiumModal';
import useToast from '@/hooks/useToast';
import { useState } from 'react';
import createCheckoutSession from './actions';
import { env } from '@/env';

export default function PremiumModal() {

    const premiumFeatures = [
        "All templates",
        "Unlimited downloads",
        "Custom fonts & styling",
        "AI summary suggestions",
        "No watermark",
        "Multiple resume saving",
        "Cover letter builder"
        ];
    
    const premiumPlusFeatures = [
        "Everything in Premium",
        "AI auto-generate resume",
        "ATS score check",
        "Job-specific optimization",
        "Cloud backup",
        "Resume version history",
        "Custom portfolio link",
        ];
        
    const {open, setOpen} = usePremiumModal()

    const {toast} = useToast()

    const [loading, setLoading] = useState(false)

    async function handlePremiumClick(priceId: string){
        setLoading(true)
        try {
            const redirectUrl = await createCheckoutSession(priceId)
            window.location.href = redirectUrl
            setOpen(false)
        } catch (error) {
            toast.error('Something went wrong, please try again later.')
            console.log('Subscription error:  ', error)
        }
        finally{
            setLoading(false)
        }
    }



  return (
    <>
    {open && <div className='h-screen w-screen absolute inset-0 flex items-center z-20 justify-center bg-(--foreground)/40 backdrop-blur'>
        <div className='relative h-fit bg-(--background) border borderColor rounded p-6 w-150'>
            <Button variant={'ghost'} size={'icon'} className='absolute right-2 top-2 hover:text-red-600'
            onClick={()=>setOpen(false)}
            >
                <X className='size-4'/>
            </Button>
            <Dialog>
                <DialogHeader className='pb-4'>
                    <DialogTitle>Subscribe for Premimum Features.</DialogTitle>
                    <DialogDescription>Subscribe to receive feature updates, helpful resources, 
                        and early access to new tools. No spam — only value.
                    </DialogDescription>
                </DialogHeader>
                <div className='space-y-4'>
                    <div className='flex h-full'>
                        <div className='w-1/2 space-y-2 h-full'>
                            <h3 className='text-lg font-semibold text-center'>Premium</h3>
                            <ul className='list-inside space-y-1 pb-4'>
                                {
                                premiumFeatures.map((item, index)=>(
                                    <li key={index} className='text-sm flex items-center gap-3'>
                                        <Check className='size-4 text-green-500'/>
                                        {item}
                                    </li>
                                    ))
                                }
                            </ul>
                            <Button className='relative bottom-0 w-full'
                            onClick={()=>handlePremiumClick(env.NEXT_PUBLIC_STRIPE_PRICE_ID_PRO_MONTHLY)}
                            disabled={loading}>
                                Get Premium Plus
                            </Button>
                        </div>
                        <div className='border mx-6 borderColor rounded-full'/>
                        <div className='w-1/2 space-y-2 h-full'>
                            <h3 className='text-lg font-semibold text-center bg-linear-to-r from-green-600 to-green-400 bg-clip-text text-transparent'>Premium Plus</h3>
                            <ul className='list-inside space-y-1 pb-4'>
                                {
                                premiumPlusFeatures.map((item, index)=>(
                                    <li key={index} className='text-sm flex items-center gap-3'>
                                        <Check className='size-4 text-green-500'/>
                                        {item}
                                    </li>
                                    ))
                                }
                            </ul>
                            <Button variant={'premiumPlus'}
                            onClick={()=>handlePremiumClick(env.NEXT_PUBLIC_STRIPE_PRICE_ID_PREMIUM_MONTHLY)}
                            disabled={loading}>
                                Get Premium Plus
                            </Button>
                        </div>
                    </div>
                </div>
            </Dialog>
        </div>
    </div>}
    </>
  )
}
