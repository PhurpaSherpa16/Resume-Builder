'use client'
import { useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { steps } from './Steps'
import BreadCrum from './BreadCrum'
import Footer from './Footer'
import { ResumeValues } from '@/lib/validation'
import ResumePreviewSection from './ResumePreviewSection'
import { cn, maptToResumeValues } from '@/lib/utils'
import useUnloadWarning from '@/hooks/useUnloadWarning'
import useAutoSave from '@/hooks/useAutoSave'
import { ResumeServerData } from '@/lib/type'

interface ResumeEditorProps{
  resumeIdEdit : ResumeServerData | null
}

export default function ResumeEditor({resumeIdEdit} : ResumeEditorProps) {
  const searchParams = useSearchParams()
  const [resumeData, setResumeData] = useState<ResumeValues>(resumeIdEdit ? maptToResumeValues(resumeIdEdit) : {})
  const [showResumePreview, setShowSmResumePreview] = useState(false)
  const {isSaving, unSavedChanges} = useAutoSave(resumeData)





  const currentStep = searchParams.get('step') || steps[0].key

  function setStep(key:string){
    const newSearchParams = new URLSearchParams(searchParams)
    newSearchParams.set('step', key)
    window.history.pushState(null, '', `?${newSearchParams.toString()}`)
  }

  const FormComponent = steps.find(step => step.key === currentStep)?.component
  useUnloadWarning(unSavedChanges)

  return (
    <div className='flex grow flex-col min-h-[90vh]'>
      <header className='space-y-1.5 px-4 py-4 text-center '>
        <h1 className='h1'>Design your resume</h1>
        <p className='p'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Commodi, labore!</p>
      </header>
      <main className='relative grow border-t borderColor h-[70vh]'>
        <div className='grid grid-cols-12 container h-full'>
          <div className={cn('md:block col-span-12 md:col-span-6 h-full overflow-y-auto md:border-r borderColor pr-4 py-4 px-4',
            showResumePreview && "hidden" 
          )}>
              <BreadCrum currentStep={currentStep} setCurrentStep={setStep}/>
              {FormComponent && <FormComponent resumeData={resumeData} setResumeData={setResumeData}/>}
          </div>
          <div className='col-span-12 md:col-span-6 p-4 overflow-y-auto'>
            <ResumePreviewSection resumeData={resumeData} setResumeData={setResumeData}
            className={cn(showResumePreview && 'flex')}
            />
          </div>
        </div>
      </main>
      <Footer currentStep={currentStep} setCurrentStep={setStep} isSaving={isSaving}
      showResumePreview={showResumePreview} setShowSmResumePreview={setShowSmResumePreview}/>
    </div>
  )
}
