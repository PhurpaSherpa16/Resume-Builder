'use client'
import { SubscriptionLevel } from '@/lib/subscriptions'
import { createContext, ReactNode, useContext } from 'react'

const SubscriptionLvelContext = createContext<SubscriptionLevel | undefined>(undefined)

interface SubscriptionLevelProviderProps{
    children : ReactNode
    userSubscriptionLvel : SubscriptionLevel
}


export default function SubscriptionLevelProvider({children, userSubscriptionLvel}: SubscriptionLevelProviderProps) {



  return <SubscriptionLvelContext.Provider value={userSubscriptionLvel}>
    {children}
  </SubscriptionLvelContext.Provider>
}

export function useSubscriptionLvel(){
    const context = useContext(SubscriptionLvelContext)
    if(context === undefined) throw new Error('useSubscriptionLevel used.')
    
    return context
}

// then move to main Layout and use this context