import { ResumeValues } from '@/lib/validation'
import React from 'react'
import { Badge } from '../ui/badge'
import { BorderStyles } from '@/app/(main)/editor/BorderStyleButton'

interface ResumeDataProps{
    resumeData : ResumeValues
}

export default function Skills({resumeData}:ResumeDataProps) {
    const {skills, colorHex, borderStyle} = resumeData

    if(!skills?.length) return null

  return (
    <>
    <hr className='borderColor'/>
        <div className='space-y-3'>
            <h2 style={{color: colorHex}}>SKill & Techical Knowldege</h2>
            <div className='flex flex-wrap gap-2'>
                {skills.map((item, index)=>(
                <Badge key={index} className='px-3 text-white'
                style={{borderRadius: borderStyle === BorderStyles.Square ? '0px'
                        : borderStyle === BorderStyles.Circle ? '1000px'
                        : '10px', backgroundColor: colorHex }}>
                    <span className='text-sm'>{item}</span>
                </Badge>
            ))}
            </div>
        </div>
    </>
  )
}
