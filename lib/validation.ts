import {z} from 'zod'

export const optionalString = z.string().trim().optional().or(z.literal(""))
const phoneRegex = /^\+?[0-9\-().\s]{7,20}$/
export const optionalPhone = z.string().regex(phoneRegex, "Invalid phone").optional();

export const generalInforSchema = z.object({
    title : optionalString,
    description : optionalString
})

export type GeneralInfoValues = z.infer<typeof generalInforSchema>

export const personalInforSchema = z.object({
    firstName : optionalString,
    lastName  : optionalString,
    jobtitle : optionalString,
    city : optionalString,
    country : optionalString,
    phone : optionalString,
    email : optionalString,
    photo : z.custom<File | undefined>()
            .refine((file)=>!file || (file instanceof File && file.type.startsWith("image/")),
        "Must be an image file.")
        .refine((file)=> !file || file.size <= 1024 * 1024 * 4, "Image should be less than 4MB.")
})

export type PersonalInforSchema = z.infer<typeof personalInforSchema>

export const workExperienceSchema = z.object({
    workExperiences : z.array(
        z.object({
            position : optionalString,
            company : optionalString,
            startDate : optionalString,
            endDate : optionalString,
            description : optionalString,
        })
    ).optional()
})

export type WorkExperienceValues = z.infer<typeof workExperienceSchema>

export const educationSchema = z.object({
    educations : z.array(
        z.object({
            degree : optionalString,
            school : optionalString,
            startDate : optionalString,
            endDate : optionalString,
        })
    ).optional()
})

export type EducationValues = z.infer<typeof educationSchema>

export const SkillSchema = z.object({skills : z.array(z.string().trim()).optional()})

export type SkillValues = z.infer<typeof SkillSchema>

export const summarySchema = z.object({summary: optionalString})

export type SummaryValues = z.infer<typeof summarySchema>


export const resumeSchema = z.object({
    ...generalInforSchema.shape,
    ...personalInforSchema.shape,
    ...workExperienceSchema.shape,
    ...educationSchema.shape,
    ...SkillSchema.shape,
    ...summarySchema.shape,
    colorHex : optionalString,
    borderStyle : optionalString
})


export type ResumeValues = Omit<z.infer<typeof resumeSchema>,"photo"> & {
    id?: string
    photo?: File | string | null
}

export const generateSummarySchema = z.object({
    jobTitle : optionalString,
    ...workExperienceSchema.shape,
    ...educationSchema.shape,
    ...SkillSchema.shape
})

export type GenerateSmmaryInput = z.infer<typeof generateSummarySchema> 