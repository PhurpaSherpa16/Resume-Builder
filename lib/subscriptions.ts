import { cache } from "react";
import prisma from "./prisma";
import { env } from "process";

export type SubscriptionLevel = "free" | 'pro' | 'premium'

export const getStripeUserSubscription = cache(
    async (userId : string) : Promise<SubscriptionLevel> =>{
        const subscription = await prisma.userSubscription.findUnique({
            where : {userId}
        })
        if(!subscription || subscription.stripeCurrentPeriodEnd < new Date()) return "free"

        if(subscription.stripePriceId === env.NEXT_PUBLIC_STRIPE_PRICE_ID_PRO_MONTHLY) return 'pro'

        if(subscription.stripePriceId === env.NEXT_PUBLIC_STRIPE_PRICE_ID_PREMIUM_MONTHLY) return 'premium'
        
        throw new Error('Invalid subscription')
    }
)

// after this make context provide use in main/layout so that it avaibale to all child component.
//  its a server rendering so it can;t be used in Client side