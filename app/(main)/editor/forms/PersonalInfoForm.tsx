'use client'
import { personalInforSchema, PersonalInforSchema } from '@/lib/validation'
import React, { useEffect, useRef } from 'react'
import { useForm } from 'react-hook-form'
import {zodResolver} from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { EditorForProps } from '@/lib/type'
import { Button } from '@/components/ui/button'


export default function PersonalInfoForm({resumeData, setResumeData}: EditorForProps) {
    const form = useForm<PersonalInforSchema>({
            resolver : zodResolver(personalInforSchema),
            defaultValues:{
                firstName : resumeData.firstName || "",
                lastName : resumeData.lastName || "",
                jobtitle : resumeData.jobtitle || "",
                city : resumeData.city || "",
                country : resumeData.country || "",
                phone : resumeData.phone || "",
                email : resumeData.email || "",
            }
    })

    useEffect(() => {
    const subscription = form.watch(async (values, { name }) => {
        if (name === 'phone') {
        await form.trigger('phone') // only validate phone when changed
        }
        setResumeData(prev => ({ ...prev, ...values }))
    })
    return subscription.unsubscribe
    }, [form, setResumeData]) 

    const photoRef = useRef<HTMLInputElement>(null)


  return (
    <div className='mx-w-xl max-auto space-y-6'>
        <div className='text-center'>
            <h2>Personal Information</h2>
            <p>Fill in your details below to see a live preview on the right</p>
        </div>
        <div>
            <Form {...form}>
                <form className='space-y-4'>
                    {/* Image */}
                    <FormField control={form.control} name='photo'
                        render={({field : {value, onChange, ...fieldValues}})=>(
                            <FormItem>
                                <FormLabel>Your Photo</FormLabel>
                                <div className='flex gap-2'>
                                    <FormControl>
                                        <Input {...fieldValues} 
                                        type='file'
                                        ref={photoRef}
                                        accept='image/*'
                                        onChange={(e)=>{
                                            const file = e.target.files?.[0]
                                            onChange(file)
                                        }}
                                        />
                                    </FormControl>
                                    <Button variant={'secondary'} className='hover:bg-red-500 hover:text-white transition-all cursor-pointer'
                                    type='button'
                                    onClick={()=>{
                                        onChange(null)
                                        if (photoRef.current){
                                            photoRef.current.value = ''
                                        }
                                    }}
                                    >
                                        Remove
                                    </Button>
                                </div>
                                <FormMessage/>
                            </FormItem>
                    )}/>

                    {/* First Name and Last Name */}
                    <div className='flex w-full items-center justify-between gap-4'>
                        <div className='w-full'>
                            <FormField control={form.control} name='firstName'
                        render={({field})=>(
                            <FormItem>
                                <FormLabel>First Name</FormLabel>
                                <FormControl>
                                    <Input {...field} placeholder='Enter your first name' autoCapitalize='words' autoFocus/>
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}/>
                        </div>
                        <div className='w-full'>
                            <FormField control={form.control} name='lastName'
                            render={({field})=>(
                                <FormItem>
                                    <FormLabel>Last Name</FormLabel>
                                    <FormControl>
                                        <Input {...field} placeholder='Enter your last name' autoCapitalize='words'/>
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}/>
                        </div>
                    </div>

                    {/* Job title */}
                    <FormField control={form.control} name='jobtitle'
                    render={({field})=>(
                        <FormItem>
                            <FormLabel>Job Title</FormLabel>
                            <FormControl>
                                <Input {...field} placeholder='Your current or last Job title' autoCapitalize='words'/>
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}/>

                    {/* City */}
                    <FormField control={form.control} name='city'
                    render={({field})=>(
                        <FormItem>
                            <FormLabel>City Name</FormLabel>
                            <FormControl>
                                <Input {...field} placeholder='Name of City you live' autoCapitalize='words'/>
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}/>
                    {/* Country */}
                    <FormField control={form.control} name='country'
                    render={({field})=>(
                        <FormItem>
                            <FormLabel>Country</FormLabel>
                            <FormControl>
                                <Input {...field} placeholder='e.g: USA' autoCapitalize='words'/>
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}/>
                    {/* Phone */}
                    <FormField control={form.control} name='phone'
                    render={({field})=>(
                        <FormItem>
                            <FormLabel>Phone Number</FormLabel>
                            <FormControl>
                                <Input {...field} placeholder='e.g: +977-9XXXXXX' autoCapitalize='words'/>
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}/>
                    {/* Phone */}
                    <FormField control={form.control} name='email'
                    render={({field})=>(
                        <FormItem>
                            <FormLabel>Email Address</FormLabel>
                            <FormControl>
                                <Input {...field} placeholder='yours.email_address@gmailc.om' autoCapitalize='words'/>
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}/>

                </form>
            </Form>
        </div>
      
    </div>
  )
}
