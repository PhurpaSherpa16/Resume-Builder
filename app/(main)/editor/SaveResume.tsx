'use server'
import { canCreateResume, canUseCustomization } from '@/lib/Permission'
import prisma from '@/lib/prisma'
import { getStripeUserSubscription } from '@/lib/subscriptions'
import { resumeSchema, ResumeValues } from '@/lib/validation'
import { auth } from '@clerk/nextjs/server'
import {del, put} from '@vercel/blob'

// photos and other files are being upload in prisma and vercel storage.

export default async function SaveResume(values:ResumeValues) {

    const {id} = values

    console.log('receved values, ', values)

    // resumeValues is remaning values. 
    const {photo, educations, workExperiences, ...resumeValues} = resumeSchema.parse(values)

    const {userId} = await auth()

    if(!userId){
        throw new Error('User not authenciated')
    }

    const subscriptionLevel = await getStripeUserSubscription(userId)

    if(!id){
        const resumeCount = await prisma.resume.count({where:{userId}})
        if (!canCreateResume(subscriptionLevel, resumeCount)){
            throw new Error('Maximium number of resume creating is reached, Upgrade for more creation!')
        }
    }

    const existingResume = id ? await prisma.resume.findUnique({where: {id, userId}}) : null


    if(id && !existingResume) {
        throw new Error('Resume not found')
    }

    const hasCustomizations = (resumeValues.borderStyle && resumeValues.borderStyle !== existingResume?.borderStyle) 
    || (resumeValues.colorHex && resumeValues.colorHex !== existingResume?.colorHex)

    if(hasCustomizations && !canUseCustomization(subscriptionLevel)){
        throw new Error('Customization not allowrd for free subscrition.')
    }

    // Image upload process
    // undefined means no photo uploaded, null means delete
    let newPhotoUrl : string | undefined | null = undefined
    if (photo instanceof File){
        if(existingResume?.photoURL){
            await del(existingResume.photoURL)
        }

        const blob = await put(`resume_photo/${photo.name}`, photo, {
            access: 'public',
            allowOverwrite: true
        })

        newPhotoUrl = blob.url
    }
    else if(photo === null){
        if(existingResume?.photoURL){
            await del(existingResume.photoURL)
        }
        newPhotoUrl = null
    }

    // data are updating
    // it check it id is present then it need to update or else create new one
    // affter this changes do in next config file.
    // then autoSave
    // in root folder too using toaster for error message handling.
    if(id){
        return prisma.resume.update({
            where : {id},
            data:{
                ...resumeValues,
                photoURL : newPhotoUrl,
                workExpereince:{
                    deleteMany :{},
                    create : workExperiences?.map(item=>({
                        ...item,
                        startDate : item.startDate ? new Date(item.startDate) : undefined,
                        endDate : item.endDate ? new Date(item.endDate) : undefined,
                    }))
                },
                educations:{
                    deleteMany :{},
                    create : educations?.map(item=>({
                        ...item,
                        startDate : item.startDate ? new Date(item.startDate) : undefined,
                        endDate : item.endDate ? new Date(item.endDate) : undefined,
                    }))
                },
                updateAt : new Date()
            }
        })
    }
    else{
        return prisma.resume.create({
            data:{
                ...resumeValues,
                userId,
                photoURL : newPhotoUrl,
                workExpereince:{
                    create : workExperiences?.map(item=>({
                        ...item,
                        startDate : item.startDate ? new Date(item.startDate) : undefined,
                        endDate : item.endDate ? new Date(item.endDate) : undefined,
                    }))
                },
                educations:{
                    create : educations?.map(item=>({
                        ...item,
                        startDate : item.startDate ? new Date(item.startDate) : undefined,
                        endDate : item.endDate ? new Date(item.endDate) : undefined,
                    }))
                }
            }
        })
    }
}
