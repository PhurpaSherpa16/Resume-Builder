import { BorderStyles } from "@/app/(main)/editor/BorderStyleButton"
import { ResumeValues } from "@/lib/validation"
import Image from "next/image"
import { useEffect, useState } from "react"
import { boolean } from "zod"

interface ResumeSectionProps{
  resumeData : ResumeValues
}


export default function PersonalInfoHeader({resumeData}:ResumeSectionProps){
  const {photo, firstName, lastName, phone, jobtitle, city, country, email, colorHex, borderStyle} = resumeData

  const [photoSrc, setPhotoSrc] = useState(photo instanceof File ? '': photo)

  useEffect(()=>{
    const objectUrl = photo instanceof File ? URL.createObjectURL(photo) : ''
    if (objectUrl) setPhotoSrc(objectUrl)
    if (photo === null) setPhotoSrc("")
    return () => URL.revokeObjectURL(objectUrl)
  },[photo])

  return (
    <div className='flex items-center gap-6 w-full'>
      <div className='w-full'>
          <div className="flex justify-between w-full items-center">
            <div>
                <h1 style={{color: colorHex}}>{firstName} {lastName}</h1>
                <span style={{color: colorHex}} className="text-black text-lg">{jobtitle}</span>
                <div className="grid">
                    <p>
                        {phone && email ? [phone, email].filter(boolean).join(' • ') : phone}
                    </p>
                    <p>
                        {city}
                        {city && country ? ', ' : ''}
                        {country}
                    </p>
                </div>
            </div>
            <div>
                {photoSrc && <Image
                style={{
                  borderRadius: borderStyle === BorderStyles.Square ? '0px'
                      : borderStyle === BorderStyles.Circle ? '1000px'
                      : '10px' 
                }}
                src={photoSrc} height={100} width={100} alt='Author Photo'
                className='object-cover rounded-full h-25'
                />}
            </div>
          </div>
      </div>
    </div>
  )
}