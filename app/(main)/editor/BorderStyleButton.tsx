import { Button } from '@/components/ui/button'
import { Circle, Square, Squircle } from 'lucide-react'
import React from 'react'
import { useSubscriptionLvel } from '../SubscriptionLevelProvider'
import usePremiumModal from '@/hooks/usePremiumModal'
import { canUseCustomization } from '@/lib/Permission'

interface BorderStyleProps{
    borderStyle : string | undefined
    onChange : (borderStyle: string) => void
}


export const BorderStyles = {
    Square : 'square',
    Circle : 'circle',
    SQuicle : 'squircle'
}

const borderStyles = Object.values(BorderStyles)

export default function BorderStyleButton({borderStyle, onChange}:BorderStyleProps) {

    const subscriptionLevel = useSubscriptionLvel()
    const premiumModal = usePremiumModal()

    const handleClick = () =>{
        if(!canUseCustomization(subscriptionLevel)){
            premiumModal.setOpen(true)
            return
        }
        const currentIndex = borderStyle ? borderStyles.indexOf(borderStyle) : 0
        const nextIndex = (currentIndex + 1) % borderStyles.length
        onChange(borderStyles[nextIndex])
    }

    const Icon = borderStyle === 'square' ? Square 
                : borderStyle === 'circle' ? Circle
                : Squircle



  return (
    <Button variant={'outline'} size={'icon'} title='Change border style' 
    onClick={handleClick} className='cursor-pointer hover:bg-blue-100'>
        <Icon className='size-4'/>
    </Button>
  )
}
