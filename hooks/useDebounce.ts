import React, { useEffect, useState } from 'react'

export default function useDebounce<T>(value : T, delay: number = 250) {

    const [debouncedValue, setDebouncedValue] = useState<T>(value)

    useEffect(()=>{
        const delayHandler = setTimeout(()=>{
            setDebouncedValue(value)
        }, delay)

        return ()=>clearTimeout(delayHandler)

    }, [delay, value])

  return debouncedValue
}
