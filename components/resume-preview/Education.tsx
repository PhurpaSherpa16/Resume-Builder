import { ResumeValues } from '@/lib/validation'
import { formatDate } from 'date-fns'
import React from 'react'

interface ResumeDataProps{
    resumeData : ResumeValues
}

export default function Education({resumeData}:ResumeDataProps) {

    const {educations, colorHex} = resumeData

    const educationNotEmpty = educations?.filter((item)=>Object.values(item).filter(Boolean).length > 0)

    if (!educationNotEmpty?.length) return null

  return (
    <>
      <hr className='borderColor'/>
        <div className='space-y-3'>
        <h2 style={{color: colorHex}}>Educational Details</h2>
        {educationNotEmpty.map((item, index)=>(
            <div key={index} className='break-after-avoid'>
                {item.degree && <span className='jobtitle' style={{color: colorHex}}> {`• ${item.degree}`}</span> }
                <div>
                    <span>
                        {item.school}
                    </span>
                    <span>{item.school && item.startDate ? " • " : ''}</span>
                    {item.startDate && (
                    <span>{formatDate(item.startDate, "MM/yyyy")} -{" "}
                    {item.endDate ? formatDate(item.endDate, "MM/yyyy") : 'Present' }
                    </span>
                    )}
                </div>
            </div>
        ))}
    </div>
    </>
  )
}
