'use server'
import prisma from '@/lib/prisma'
import { auth } from '@clerk/nextjs/server'
import { del } from '@vercel/blob'
import { revalidatePath } from 'next/cache'

export async function DeleteResume(id: string) {
    const {userId} = await auth()

    if(!userId) {
        throw new Error('User not Authenciated')
    }

    const resume = await prisma.resume.findUnique({where:{id, userId}})

    if(!resume){
        throw new Error('resume not found') 
    }
    if(resume.photoURL){
        await del(resume.photoURL)
    }
    await prisma.resume.delete({where:{id}})

    revalidatePath('/resume')
}
