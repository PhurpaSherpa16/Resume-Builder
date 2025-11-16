import React, { useEffect, useState } from 'react'

export default function useDimensions(containerRef: React.RefObject<HTMLElement>) {

    const [dimesion, setDimension] = useState({width: 0, height: 0})

    useEffect(()=>{
        const currentRef = containerRef.current
        function getDimesions(){
            return{
                width : currentRef?.offsetWidth || 0,
                height : currentRef?.offsetHeight || 0
            }
        }

        const resizeObserver = new ResizeObserver((entries)=>{
            const entry = entries[0]
            if(entry){
                setDimension(getDimesions())
            }
        })

        if (currentRef){
            resizeObserver.observe(currentRef)
            setDimension(getDimesions())
        }

        return ()=>{
            if(currentRef){
                resizeObserver.unobserve(currentRef)
            }
            resizeObserver.disconnect()
        }
    }, [containerRef])

  return dimesion
}
