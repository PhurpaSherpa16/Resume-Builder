import { ResumeValues } from '@/lib/validation'
import React from 'react'
interface ResumeSectionProps{
  resumeData : ResumeValues
}

export default function Summary({resumeData}:ResumeSectionProps) {
    const {summary, colorHex} = resumeData
    if(!summary) return null
  return (
    <>
    <hr className='borderColor'/>
    <div className='space-y-2 break-inside-avoid'>
        <h2 style={{color: colorHex}}>Professional Profile</h2>
        <div className='whitespace-pre-line'>
            <p>{summary}</p>
        </div>
    </div>
    </>
  )
}
