import { Button } from '@/components/ui/button'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { EditorForProps } from '@/lib/type'
import { SkillSchema, SkillValues } from '@/lib/validation'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect } from 'react'
import { useForm} from 'react-hook-form'

export default function SkillForm({resumeData, setResumeData}: EditorForProps) {
    const form = useForm<SkillValues>({
        resolver : zodResolver(SkillSchema),
        defaultValues:{
            skills : resumeData.skills || []
        }
    })

    useEffect(()=>{
        const {unsubscribe} = form.watch(async (values) =>{
            const isValid = await form.trigger()
            if(!isValid) return
            setResumeData({
                ...resumeData,
                skills : values.skills?.filter((skill)=> skill !== undefined)
                .map((skill) => skill.trim())
                .filter((skill)=> skill !== "") || []
            })
        })
        return unsubscribe
    }, [form, resumeData, setResumeData])

  return (
    <div>
      <div className='space-y-1.5 text-center pb-4'>
        <h2>Skills</h2>
        <p>Place your Skill from Strong to Weak</p>
      </div>

        <Form {...form}>
            <form className='space-y-3'>
                <FormField
                control={form.control}
                name={`skills`}
                render={({ field }) => (
                    <FormItem>
                        <FormLabel className='sr-only'>Skills</FormLabel>
                        <FormControl>
                            <Textarea {...field} autoFocus placeholder='e.g. Next, React, Tailwind, Python'
                            onChange={(e)=>{
                                const skills = e.target.value.split(',')
                                field.onChange(skills)
                            }}
                            /> 
                        </FormControl>
                        <FormDescription>Seprate each skill with <span className='font-semibold'>(,) </span> for sepration.</FormDescription>
                        <FormMessage />
                    </FormItem>
                )}
                />
            </form>
        </Form>
    </div>
  )
}


