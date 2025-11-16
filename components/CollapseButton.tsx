import { ChevronDown } from 'lucide-react'
import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'

interface CollapseButtonProps{
    title : string
    reference : React.RefObject<HTMLDivElement>
    expand : boolean
    setExpand: React.Dispatch<React.SetStateAction<boolean>>
}

export default function CollapseButton({ title, reference, expand, setExpand}: CollapseButtonProps) {

    const arrowRef = useRef(null)

    useEffect(()=>{
        gsap.to(reference.current,{
            height: expand ? 'auto' : 0,
            duration: 0.3,
            ease: 'elastic.inOut'
        })
        gsap.to(arrowRef.current,{
            rotate: expand ? 180 : 0,
            duration: 0.3
        })
    },[expand, reference])


  return (
      <div className='flex items-center gap-4'>
        <span className='font-semibold'>{title}</span>
        <ChevronDown ref={arrowRef} className='size-4 cursor-pointer'
         onClick={()=>setExpand((prev) => !prev)}/>
    </div>
  )
}
