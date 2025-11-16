'use client'
import { generalInforSchema, GeneralInfoValues } from '@/lib/validation'
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import {zodResolver} from "@hookform/resolvers/zod"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { EditorForProps } from '@/lib/type'

export default function GeneralInforForms({resumeData, setResumeData}: EditorForProps) {
    const form = useForm<GeneralInfoValues>({
        resolver : zodResolver(generalInforSchema),
        defaultValues : {
            title : resumeData.title || "",
            description : resumeData.description || ""
        }
    })

    useEffect(()=>{
        const {unsubscribe} = form.watch(async (values)=>{
            const isValid = await form.trigger()
            if (!isValid) return
            setResumeData(prev => ({ ...prev, ...values }))
        })
        return unsubscribe
    },[form, resumeData, setResumeData])


  return (
    <div className='max-w-xl mx-auto space-y-6'>
      <div className='text-center'>
        <h2>General Info</h2>
        <p>Fill in your details below to see a live preview on the right</p>
      </div>
      <div>
        <Form {...form}>
            <form className='grid gap-4'>
                <FormField control={form.control}
                name="title"
                render={({field})=>(
                    <FormItem>
                        <FormLabel>Project Name</FormLabel>
                        <FormControl>
                            <Input {...field} placeholder='Enter Project title' autoFocus autoCapitalize="sentences"/>
                        </FormControl>
                        <FormMessage/>
                    </FormItem>
                )}/>
                <FormField control={form.control}
                name="description"
                render={({field})=>(
                    <FormItem>
                        <FormLabel>Project Description</FormLabel>
                        <FormControl>
                            <Textarea {...field} placeholder='Add your roles, responsiblity and achivements.' autoCapitalize="sentences"/>
                        </FormControl>
                        <FormDescription>
                            Wite down how your key selling points.
                        </FormDescription>
                    </FormItem>
                )}/>
            </form>
        </Form>
      </div>
    </div>
  )
}
