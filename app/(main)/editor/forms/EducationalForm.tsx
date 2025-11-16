import CollapseButton from '@/components/CollapseButton'
import { Button } from '@/components/ui/button'
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { EditorForProps } from '@/lib/type'
import { cn } from '@/lib/utils'
import { educationSchema, EducationValues } from '@/lib/validation'
import { arrayMove, SortableContext, sortableKeyboardCoordinates, useSortable } from '@dnd-kit/sortable'
import { zodResolver } from '@hookform/resolvers/zod'
import { ArchiveX, GripHorizontal, PlusSquare } from 'lucide-react'
import React, { useEffect, useRef, useState } from 'react'
import { FormProvider, useFieldArray, useForm, UseFormReturn } from 'react-hook-form'
import {CSS} from '@dnd-kit/utilities'
import { closestCenter, DndContext, DragEndEvent, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core'
import { restrictToVerticalAxis } from '@dnd-kit/modifiers'


export default function EducationalForm({resumeData, setResumeData}: EditorForProps) {

    const form = useForm<EducationValues>({
        resolver : zodResolver(educationSchema),
        defaultValues:{
            educations : resumeData.educations || []
        }
    })

    useEffect(()=>{
        const {unsubscribe} = form.watch(async (values)=>{
            const isValid = await form.trigger()
            setResumeData(prev => ({...prev, educations : values.educations?.filter((exp : any) => exp !== undefined) || []}))
            if(!isValid) return
        })
        return unsubscribe
    },[form, resumeData, setResumeData])

    const {fields, append, remove, move} = useFieldArray({
        control : form.control,
        name : 'educations'
    })

    const sensors = useSensors(
            useSensor(PointerSensor),
            useSensor(KeyboardSensor,{
                coordinateGetter : sortableKeyboardCoordinates
            })
        )
    
        // DragDrop step: 2, function drag and draop event
        const handleDragEvent = (event : DragEndEvent) =>{
            const {active, over} = event
            const newIndex = fields.findIndex(item => item.id === active.id)
            const oldIndex = fields.findIndex(item => item.id === over?.id)
            move(oldIndex, newIndex)
            return arrayMove(fields, oldIndex, newIndex)
        }
    

  return (
    <div>
        <div className='space-y-1.5 text-center pb-4'>
            <h2>Educational Information</h2>
            <p>Degree, University and all educational details.</p>
        </div>
        <FormProvider {...form}>
            <form className='space-y-3'>
                <DndContext sensors={sensors} collisionDetection={closestCenter}
                onDragEnd={handleDragEvent}
                modifiers={[restrictToVerticalAxis]}>
                <SortableContext items={fields}>
                    {fields.map((field, index)=>(
                        <EducationItem
                        id={field.id}
                        key={field.id}
                        form={form}
                        index={index}
                        remove={remove}
                        />
                    ))}
                </SortableContext>
                </DndContext>

                {/* Add Education Button */}
                <div className='flex items-center justify-center'>
                    <Button variant={'default'}
                    type='button' onClick={()=>append({
                        degree : '',
                        school : '',
                        startDate : '',
                        endDate : ''
                    })}
                    >
                        <PlusSquare className='size-4'/>
                        Add Education
                    </Button>
                </div>
            </form>
        </FormProvider>
    </div>
  )
}

interface EducationItemProps{
    id : string
    form : UseFormReturn<EducationValues>
    index : number
    remove : (index: number) => void
}

function EducationItem({id, form, index, remove}:EducationItemProps){
    const {attributes, setNodeRef, listeners, transform, transition, isDragging} = useSortable({id})
    const divRef = useRef<HTMLDivElement>(null)
    const [expand, setExpand] = useState(false)

    const [number, setNumber] = useState(index)

    return (
        <div ref={setNodeRef} className={cn('space-y-3 border p-3 bg-(--background) rounded borderColor',
        isDragging && 'shadow-2xl scale-90 transition-transform relative z-10 cursor-grab break-before-avoid')}
        style={{transform: CSS.Transform.toString(transform), transition}}
        >
            <div className='flex justify-between gap-2'>
                <CollapseButton title={`Educational Degree ${number+1}`} reference={divRef}
                expand={expand} setExpand={setExpand}/>
                <GripHorizontal className='size-4 cursor-grab text-(--muted-foreground) outline-0'
                {...attributes}
                {...listeners}
                />
            </div>
            
            <div ref={divRef} className={'space-y-4 h-0 overflow-hidden'}>
                <FormField
                    control={form.control}
                    name={`educations.${index}.degree`}
                    render={({field})=>(
                        <FormItem>
                            <FormLabel>Course of Study</FormLabel>
                            <FormControl>
                                <Input {...field} autoFocus placeholder='Enter the couse your study. e.g: BSc. Computing'/>
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                )}/>
                <FormField
                    control={form.control}
                    name={`educations.${index}.school`}
                    render={({field})=>(
                        <FormItem>
                            <FormLabel>Name of College / University</FormLabel>
                            <FormControl>
                                <Input {...field} autoFocus placeholder='e.g New York University'/>
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                )}/>
                <div className='space-y-2'>
                    <div className='grid grid-cols-12 gap-4'>
                        <div className='col-span-4'>
                            <FormField
                            control={form.control}
                            name={`educations.${index}.startDate`}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>From</FormLabel>
                                    <FormControl>
                                        <Input type='date'
                                        value={field.value?.slice(0,10)} 
                                        {...field}/>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        </div>
                        <div className='col-span-4'>
                            <FormField
                                control={form.control}
                                name={`educations.${index}.endDate`}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>To</FormLabel>
                                        <FormControl>
                                            <Input type='date'
                                            value={field.value?.slice(0,10)} 
                                            {...field}/>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                    </div>
                    <FormDescription>
                        Leave the <span className='font-semibold'> End Date || To </span> if you are currently working
                    </FormDescription>
                </div>

                <Button variant={'destructive'} type='button' onClick={()=>remove(index)}>
                    <ArchiveX className='size-4'/>
                    Remove
                </Button>
            </div>

        </div>
    )
}
