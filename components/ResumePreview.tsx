'use client'
import useDimensions from '@/hooks/useDimensions'
import { cn } from '@/lib/utils'
import { ResumeValues } from '@/lib/validation'
import { useRef } from 'react'
import PersonalInfoHeader from './resume-preview/PersonalInfoHeader'
import Summary from './resume-preview/Summary'
import WorkExpereince from './resume-preview/WorkExpereince'
import Education from './resume-preview/Education'
import Skills from './resume-preview/Skills'

interface resumePreviewProps{
    resumeData : ResumeValues
    className?: string
    contentRef? : React.Ref<HTMLDivElement>
}

export default function ResumePreview({resumeData, className, contentRef}:resumePreviewProps) {
    
  const containerRef = useRef<HTMLDivElement>(null)

  const {width} = useDimensions(containerRef)

  return (
    <div ref={containerRef} className={cn("bg-white text-black h-fit w-full aspect-210/297 border rounded borderColor py-8 px-6 relative", className)}>
      <div className='previewDiv space-y-4'
      style={{ zoom: (1/794)*width}}
      ref={contentRef}
      id='resumePreviewDiv'>
        <PersonalInfoHeader resumeData={resumeData}/>
        <Summary resumeData={resumeData}/>
        <WorkExpereince resumeData={resumeData}/>
        <Education resumeData={resumeData}/>
        <Skills resumeData={resumeData}/>
      </div>
    </div>
  )
}
