import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { size } from "zod"
import { ResumeServerData } from "./type"
import { ResumeValues } from "./validation"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function FileReplacer(key: unknown, value: unknown){
  return value instanceof File ? 
  {
    name : value.name,
    size : value.size,
    type : value.type,
    lastModified : value.lastModified
  } :  value
}

export function maptToResumeValues(data: ResumeServerData) : ResumeValues{
  return{
    id : data.id,
    title : data.title || undefined,
    description : data.description || undefined,
    photo : data.photoURL || undefined,
    firstName : data.firstName || undefined,
    lastName : data.lastName || undefined,
    jobtitle : data.jobtitle || undefined,
    city : data.city || undefined,
    country : data.country || undefined,
    phone : data.phone || undefined,
    email : data.email || undefined,
    workExperiences : data.workExpereince.map((item)=>({
      position : item.position || undefined,
      company : item.company || undefined,
      description : item.description || undefined,
      startDate : item.startDate?.toISOString().split("T")[0],
      endDate : item.endDate?.toISOString().split("T")[0],
    })),
    educations : data.educations.map((item)=>({
      degree : item.degree || undefined,
      school : item.school || undefined,
      startDate : item.startDate?.toISOString().split("T")[0],
      endDate : item.endDate?.toISOString().split("T")[0],
    })),
    skills : data.skills,
    borderStyle : data.borderStyle,
    colorHex : data.colorHex,
    summary : data.summary || undefined
  }
}