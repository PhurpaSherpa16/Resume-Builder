'use c'
import { Loader2 } from 'lucide-react'

export default function Loading() {
  return (
    <div className='h-screen w-screen justify-center items-center flex'>
        <div>
            <span className='flex gap-2 items-center'>Loading please wait... 
                <Loader2 className='mx-auto my-6 animate-spin'/>
            </span>
        </div>
    </div>
  )
}
