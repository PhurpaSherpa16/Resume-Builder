import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { EditorForProps } from '@/lib/type'
import { summarySchema, SummaryValues } from '@/lib/validation'
import { zodResolver } from '@hookform/resolvers/zod'
import { GripHorizontal } from 'lucide-react'
import React, { useEffect } from 'react'
import { FormProvider, useForm } from 'react-hook-form'

export default function SummaryForm({resumeData, setResumeData}:EditorForProps) {
    const form = useForm<SummaryValues>({
        resolver : zodResolver(summarySchema),
        defaultValues : {
            summary : resumeData.summary || ''
        }
    })

    useEffect(()=>{
        const {unsubscribe} = form.watch(async (values) =>{
            const isValid = await form.trigger()
            if (!isValid) return
            setResumeData((prev)=>({ ...prev, ...values}))
        })
    },[form, resumeData, setResumeData])


  return (
    <div>
        <div className='space-y-1.5 text-center pb-4'>
            <h2>Summary</h2>
            <p>Describe yourself, with goals, plan, strength, pitch your words.</p>
        </div>
        <FormProvider {...form}>
            <form className='space-y-3'>
                <FormField
                control={form.control}
                name='summary'
                render={({ field }) => (
                    <FormItem>
                        <FormLabel className='sr-only'>Summary</FormLabel>
                        <FormControl>
                            <Textarea {...field} autoFocus placeholder='Add your brief description.'/>
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
            </form>
        </FormProvider>
    </div>
  )
}
