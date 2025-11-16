import { ResumeValues } from '@/lib/validation'
import React from 'react'
import {formatDate, formatDistance, formatDistanceToNow} from 'date-fns'

interface ResumeDataProps{
    resumeData : ResumeValues
}

export default function WorkExpereince({resumeData}:ResumeDataProps) {
    const {workExperiences, colorHex} = resumeData

    const workExpereincesNotEmpty = workExperiences?.filter(
        (exp) => Object.values(exp).filter(Boolean).length > 0
    )

    if(!workExpereincesNotEmpty?.length) return null // if workExpereincesNotEmpty.length === 0 or undefined

  return (
    <>
        <hr className='borderColor'/>
        <div className='space-y-3'>
            <h2 style={{color: colorHex}}>Work Expereinces</h2>
            {workExpereincesNotEmpty.map((item, index)=>(
                <div key={index} className='break-after-avoid'>
                    {item.position && <span className='jobtitle' style={{color: colorHex}}> {`• ${item.position}`}</span> }
                    <div>
                        <span>
                            {item.company}
                        </span>
                        <span>{item.company && item.startDate ? " • " : ''}</span>
                        {item.startDate && (
                        <span>{formatDate(item.startDate, "MM/yyyy")} -{" "}
                        {item.endDate ? formatDate(item.endDate, "MM/yyyy") : 'Present' }
                        </span>
                        )}
                        <span>{item.startDate ? " " : ''}</span>
                        {item.startDate && item.endDate ? 
                        <span>({formatDistance(new Date(item.startDate),new Date(item.endDate))})</span> 
                        : item.startDate ? <span>({formatDistanceToNow(new Date(item.startDate))})</span> : ''}
                    </div>
                    <p className='whitespace-pre-line'>
                        {item.description}
                    </p>
                </div>
            ))}
        </div>
    </>
  )
}
