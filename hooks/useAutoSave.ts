'use client'
import { ResumeValues } from '@/lib/validation'
import { useEffect, useState } from 'react'
import useDebounce from './useDebounce'
import { useSearchParams } from 'next/navigation'
import useToast from './useToast'
import SaveResume from '@/app/(main)/editor/SaveResume'
import { FileReplacer } from '@/lib/utils'


export default function useAutoSave(resumeData:ResumeValues) {

    const searchParams = useSearchParams()
    
    const {toast} = useToast()

    const debouncedResumeData = useDebounce(resumeData, 1500)

    const [resumeId, setResumeId] = useState(resumeData.id)
    
    const [lastSave, setLastSave] = useState(structuredClone(resumeData))

    const [isSaving, setIsSaving] = useState(false)
    const [isError, setError] = useState(false)

    useEffect(()=>{
        setError(false)
    }, [debouncedResumeData])



    useEffect(()=>{
        async function save(){
            try{
                setIsSaving(true)
                setError(false)
                const newData = structuredClone(debouncedResumeData)

                // we use that SaveResume those validation and all backend logic
                const updatedResume = await SaveResume({
                     ...newData,
                     ...(JSON.stringify(lastSave.photo, FileReplacer) === JSON.stringify(newData.photo, FileReplacer) && {
                        photo : undefined
                     }),
                     id: resumeId
                })

                setResumeId(updatedResume.id)
                setLastSave(newData)

                // now put resumeId to url if new
                if(searchParams.get('resumeId') !== updatedResume.id){
                    const newSearchParams = new URLSearchParams(searchParams)
                    newSearchParams.set('resumeId', updatedResume.id)
                    window.history.replaceState(
                        null, '', `?${newSearchParams.toString()}`
                    )
                }
                
            }catch(error){
                setError(true)
                console.log('failed to saved',error)
                toast.error("Failed to save", {
                    description: "Please try later, saving failed",
                    action: {
                        label: "Try Again",
                        onClick: () => save(),
                    },
                })
            }
            finally{
                setIsSaving(false)
            }
        }

        // console.log('Debounced ',JSON.stringify(debouncedResumeData, FileReplacer))
        // console.log('last saved ',JSON.stringify(lastSave, FileReplacer))

        const unSavedChanges = JSON.stringify(debouncedResumeData, FileReplacer) !== JSON.stringify(lastSave, FileReplacer)
        if(unSavedChanges && debouncedResumeData && !isSaving && !isError) {
            save()
        }


    }, [debouncedResumeData, isSaving, lastSave, isError, resumeId, searchParams, toast])

  return {
    isSaving, 
    unSavedChanges : JSON.stringify(resumeData) !== JSON.stringify(lastSave)
  }
}
