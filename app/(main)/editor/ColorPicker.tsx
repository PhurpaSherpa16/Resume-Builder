import { Button } from '@/components/ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { PaletteIcon } from 'lucide-react'
import React, { useState } from 'react'
import {BlockPicker, Color, ColorChangeHandler } from 'react-color'
import { useSubscriptionLvel } from '../SubscriptionLevelProvider'
import usePremiumModal from '@/hooks/usePremiumModal'
import { canUseCustomization } from '@/lib/Permission'

interface ColorPickerProps{
    color : Color | undefined
    onChange : ColorChangeHandler
}

export default function ColorPicker({color, onChange}:ColorPickerProps) {

    const subscriptionLevel = useSubscriptionLvel()

    const premiumModal = usePremiumModal()

    const [showPopOver, setPopOver] = useState(false)

  return (
    <Popover open={showPopOver} onOpenChange={setPopOver}>
        <PopoverTrigger asChild>
            <Button variant={'outline'} size={'icon'} title='Change Color'
            onClick={()=>{ 
                if(!canUseCustomization(subscriptionLevel)){
                    premiumModal.setOpen(true)
                    return
                }
                else{
                    setPopOver(false)
                }
            }} className='cursor-pointer hover:bg-blue-100'>
                <PaletteIcon className='size-4'/>
            </Button>
        </PopoverTrigger>
        <PopoverContent className='bg-transparent border-0 p-0 shadow-none'>
            {canUseCustomization(subscriptionLevel) &&
            <BlockPicker color={color} onChange={onChange} triangle='hide'/>
            }
        </PopoverContent>
    </Popover>
  )
}
