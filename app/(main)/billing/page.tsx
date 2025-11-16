import prisma from '@/lib/prisma'
import Stripe from 'stripe'
import { auth } from '@clerk/nextjs/server'
import { formatDate } from 'date-fns'
import { Metadata } from 'next'
import GetSubscriptionButton from './GetSubscriptionButton' 
import ManageSubscriptionButton from './ManageSubscriptionButton'
import stripe from '@/lib/stripe'


export const metadata : Metadata={
  title: 'Billing'
}

export default async function Page() {
  const {userId} = await auth()

  if(!userId) return null

  const subscription = await prisma.userSubscription.findUnique({
    where :{userId}
  })

  const priceInfo = subscription ? await stripe.prices.retrieve(subscription.stripePriceId,{
    expand:['product']
  }) : null

  // console.log(subscription?.stripeCurrentPeriodEnd)
  // const expireDateObj = new Date(subscription?.stripeCurrentPeriodEnd)

  // expireDateObj.setDate(expireDateObj.getDate()+1)

  // const ExpireDate = formatDate(expireDateObj, 'MMM d, yyyy')

  console.log(subscription)

  return (
    <main className='container mx-auto space-y-4 pt-8'>
        <div>
          <h1 className='uppercase'>Manage Your Subscription</h1>
          <p className='pb-4'>Choose the plan that suits you best. Upgrade, downgrade, or cancel anytime. All payments are securely processed via Stripe.</p>
          <hr className='borderColor'/>
        </div>
        <div>
          <h2>Subscription Plan Selected</h2>
          <p>You are currently on the <strong className='font-semibold text-black'>{priceInfo ? (priceInfo.product as Stripe.Product).name : 'free'}</strong> plan.
          </p>
          {/* <p>Your next billing date: <strong className='font-semibold text-black'>{ExpireDate}</strong>.</p> */}
        </div>
        {subscription ? (
          <>
            {subscription.stripeCurrentPeriodEnd && (
              <p className='text-red-500'>
                Your subscription will be cancel on {formatDate(subscription.stripeCurrentPeriodEnd, "MMMM dd, yyyy")}
              </p>
            )}
            <ManageSubscriptionButton/>
          </>
        ) : (
          <GetSubscriptionButton/>
        )}
    </main>
  )
}
