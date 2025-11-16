// this will check the permisson of user like subs level and other
import {SubscriptionLevel} from './subscriptions'

export function canCreateResume(
    subscriptionLevel : SubscriptionLevel,
    currentResumeCount : number
){
    const maxResumeMap : Record<SubscriptionLevel, number> ={
        free : 1,
        pro : 3,
        premium : Infinity
    }
    const maxResumes = maxResumeMap[subscriptionLevel]

    return currentResumeCount < maxResumes 
}

export function canUseAITools(subscriptionLevel: SubscriptionLevel){
    return subscriptionLevel !== 'free'
}

export function canUseCustomization(subscriptionLevel : SubscriptionLevel){
    return subscriptionLevel === 'premium'
}