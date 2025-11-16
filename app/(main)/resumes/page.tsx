import prisma from '@/lib/prisma'
import { resumeDataInclude } from '@/lib/type'
import { auth } from '@clerk/nextjs/server'
import { Metadata } from 'next'
import ResumeItem from './ResumeItem'
import CreateResumeButton from './CreateResumeButton'
import { getStripeUserSubscription } from '@/lib/subscriptions'
import { canCreateResume } from '@/lib/Permission'

export const metadata : Metadata ={
    title : 'New Resume'
}

export default async function page() {
  const {userId} = await auth()

  if (!userId) return null

  const [allResumes, totalCount, subscriptionLevel] = await Promise.all([
    prisma.resume.findMany({
      where : {userId}, orderBy:{updateAt:'desc'}, include: resumeDataInclude
    }),
    prisma.resume.count({
      where:{userId}
    }),
    getStripeUserSubscription(userId)
  ])
  

  return (
    <section className='container py-8'>
      <CreateResumeButton canCreate={canCreateResume(subscriptionLevel, totalCount)}/>
      <div className='space-y-4 py-8'>
        <div>
          <h1>Your Resumes</h1>
          <p>Your Subscription Type <span className='font-semibold uppercase text-green-500'>
            {subscriptionLevel} </span>  || Total Number of Resumes : {totalCount}</p>
        </div>
          <div className='flex flex-col sm:grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 w-full gap-3'>
            {allResumes.map((item, index)=>(
                <ResumeItem key={index} resume={item}/>
            ))}
          </div>
      </div>
    </section>
  )
}
