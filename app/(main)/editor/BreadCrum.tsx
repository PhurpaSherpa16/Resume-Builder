import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb'
import React from 'react'
import { steps } from './Steps'

interface BreadcrumbsProps{
    currentStep: string
    setCurrentStep : (step : string) => void
}

export default function BreadCrum({currentStep, setCurrentStep} : BreadcrumbsProps) {
  return (
    <div className='flex items-center justify-center'>
      <Breadcrumb>
        <BreadcrumbList>
            {steps.map((step)=>(
                <React.Fragment key={step.key}>
                    <BreadcrumbItem className='cursor-pointer'> 
                        {step.key === currentStep ? (
                            <BreadcrumbPage>{step.title}</BreadcrumbPage>
                        ):(
                        <BreadcrumbLink onClick={() => setCurrentStep(step.key)}>
                                {step.title}                          
                        </BreadcrumbLink>)}
                    </BreadcrumbItem>
                    <BreadcrumbSeparator className='last:hidden'/>
                </React.Fragment>
            ))}
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  )
}
