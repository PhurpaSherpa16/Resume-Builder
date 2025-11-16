import ResumePreview from '@/components/ResumePreview'
import { ResumeValues } from '@/lib/validation'
import React, { useRef } from 'react'
import ColorPicker from './ColorPicker'
import BorderStyleButton from './BorderStyleButton'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Printer } from 'lucide-react'
import { useReactToPrint } from 'react-to-print'

interface ResumePreviewSectionProps{
    resumeData : ResumeValues
    setResumeData: (data : ResumeValues) => void;
    className?:string
}

export default function ResumePreviewSection({resumeData, setResumeData, className}:ResumePreviewSectionProps) {

  const contentRef = useRef(null)

  const reactToPrint = useReactToPrint({
    contentRef,
    documentTitle : resumeData.firstName || 'Resume'
  })


  return (
    <div className={cn('group relative hidden md:flex w-full justify-center', className)}>
      <div className='opacity-20 group-hover:opacity-100 transition-opacity
      absolute z-10 left-0 top-0 flex gap-4'>
        <ColorPicker color={resumeData.colorHex} 
        onChange={(item)=>setResumeData({...resumeData, colorHex: item.hex})}/>
        <BorderStyleButton borderStyle={resumeData.borderStyle} 
        onChange={(borderStyle)=>setResumeData({...resumeData, borderStyle})}/>
        <Button title='PDF print' variant={'outline'} size={'icon'} className='cursor-pointer'
          onClick={reactToPrint}>
          <Printer className='size-4'/>
        </Button>
      </div>
      <div className='relative w-full md:flex flex-col justify-center'>
        <div className='text-center'>
          <h2>Resume Preview</h2>
          <p>View Live changes</p>
        </div>
        <div className='flex w-full justify-center overflow-y-auto'>
            <ResumePreview contentRef={contentRef} resumeData={resumeData} className='max-w-2xl shadow-lg'/>
        </div>
    </div>
    </div>
  )
}

