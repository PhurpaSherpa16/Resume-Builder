import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'
import { steps } from './Steps'
import { FileUpIcon, PenLineIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

interface FooterProps{
    currentStep : string
    setCurrentStep : (step : string) => void
    showResumePreview : boolean
    setShowSmResumePreview : (show : boolean) => void
    isSaving : boolean
}

export default function Footer({currentStep, setCurrentStep, showResumePreview, setShowSmResumePreview, isSaving}: FooterProps) {
    const prevStep = steps.find(
        (_, index) => steps[index + 1]?.key === currentStep
    )?.key
    const nextStep = steps.find(
        (_, index)=> steps[index - 1]?.key === currentStep
        )?.key

  return (
    <footer className='w-full border-t borderColor'>
    <div className='flex container flex-wrap py-4 items-center justify-between'>
        <div className='flex items-center gap-4'>
        <Button variant={'secondary'} className='hover:cursor-pointer disabled:cursor-not-allowed'
        onClick={prevStep ? ()=> setCurrentStep(prevStep) : undefined}
        disabled = {!prevStep}
        >
            Previous Step
        </Button>
        <Button variant={'default'} className='hover:cursor-pointer disabled:cursor-not-allowed'
        onClick={nextStep ? ()=> setCurrentStep(nextStep) : undefined}
        disabled = {!nextStep}>
            Next Step
        </Button>
        </div>
        <Button variant={'outline'} type='button' size={'icon'}
        onClick={()=> setShowSmResumePreview(!showResumePreview)}
        className='md:hidden'
        title={showResumePreview ? 'Show PDF Preview' : 'Show Editor'}
        >
            {showResumePreview ? <PenLineIcon/> : <FileUpIcon/>}
        </Button>
        <div className='flex items-center gap-3'>
        <Button variant={'secondary'} className='cursor-pointer'>
            <Link href={"/resumes"}>Close</Link>
        </Button>
        <span className={cn('opacity-0 text-[#737373]', isSaving && 'opacity-100')}>Saving...</span>
        </div>
    </div>
    </footer>
  )
}
