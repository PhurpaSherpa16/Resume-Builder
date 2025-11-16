import React from 'react'
import Navbar from './components/Navbar'
import PremiumModal from '@/components/premium/PremiumModal'
import { auth } from '@clerk/nextjs/server'
import { getStripeUserSubscription } from '@/lib/subscriptions'
import SubscriptionLevelProvider from './SubscriptionLevelProvider'

export default async function Layout({children} : {children : React.ReactNode}) {
  const {userId} = await auth()

  if(!userId) return null

  const userSubscriptionLvel = await getStripeUserSubscription(userId)

  return (
    <SubscriptionLevelProvider userSubscriptionLvel={userSubscriptionLvel}>
      <div>
        <Navbar/>
          {children}
        <PremiumModal/>
      </div>
    </SubscriptionLevelProvider>
  )
}
