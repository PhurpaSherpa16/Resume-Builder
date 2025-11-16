import { Metadata } from 'next'
import React from 'react'
import ResumeEditor from './ResumeEditor'
import { auth } from '@clerk/nextjs/server'
import prisma from '@/lib/prisma'
import { resumeDataInclude } from '@/lib/type'

interface PageProps {
  searchParams : Promise<{resumeId ?: string}>
}

export const metadata : Metadata = {
    title : 'Design resume'
}

export default async function page({searchParams}:PageProps){

  const {resumeId} = await searchParams 
  const {userId} = await auth()

  if(!userId) return null

  const resumeIdEdit = resumeId ? await prisma.resume.findUnique({
    where : {id: resumeId, userId},
    include : resumeDataInclude
  })
  : null

  return <ResumeEditor resumeIdEdit={resumeIdEdit}/> 
}
