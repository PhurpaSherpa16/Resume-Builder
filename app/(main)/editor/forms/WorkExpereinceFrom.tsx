import { Button } from '@/components/ui/button'
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { EditorForProps } from '@/lib/type'
import { workExperienceSchema, WorkExperienceValues } from '@/lib/validation'
import { zodResolver } from '@hookform/resolvers/zod'
import { ArchiveX, ArrowDown, ArrowDown10Icon, ChevronDown, GripHorizontal, PlusSquare } from 'lucide-react'
import { RefObject, useEffect, useRef, useState } from 'react'
import { FormProvider, useFieldArray, useForm, UseFormReturn } from 'react-hook-form'
import {closestCenter, DndContext, DragEndEvent, KeyboardSensor, PointerSensor, useSensor, useSensors} from "@dnd-kit/core"
import {arrayMove, SortableContext, sortableKeyboardCoordinates, useSortable, verticalListSortingStrategy} from "@dnd-kit/sortable"
import {restrictToVerticalAxis} from '@dnd-kit/modifiers'
import {CSS} from '@dnd-kit/utilities'
import { cn } from '@/lib/utils'
import CollapseButton from '@/components/CollapseButton'

  
export default function WorkExpereinceFrom({resumeData, setResumeData}: EditorForProps) {

    const form = useForm<WorkExperienceValues>({
        resolver : zodResolver(workExperienceSchema),
        defaultValues:{
            workExperiences : resumeData.workExperiences || []
        }
    })

    useEffect(()=>{
        const {unsubscribe} = form.watch(async (values) =>{
            const isValid = await form.trigger()
            if(!isValid) return
            setResumeData(({...resumeData,
                workExperiences : values.workExperiences?.filter((exp : any) => exp !== undefined) || [], 
            }))
        })
        return unsubscribe
    },[form, resumeData, setResumeData])

    const {fields, append, remove, move} = useFieldArray({
        control : form.control,
        name : 'workExperiences'
    })

    // DragDrop step: 1 , create move var too in useFieldArray
    // some of import may be manual 
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
    <div className=''>
      <div className='space-y-1.5 text-center pb-4'>
        <h2>Work Expereince</h2>
        <p>Add as many work expereinces as you like</p>
      </div>
      <FormProvider {...form}>
            <form className='space-y-3'>
                {/* DragDrop step 3, add Dnd Content and props */}
                <DndContext sensors={sensors} collisionDetection={closestCenter}
                onDragEnd={handleDragEvent}
                modifiers={[restrictToVerticalAxis]}>
                    {/* DragDrop step 4 */}
                    <SortableContext items={fields}
                    strategy={verticalListSortingStrategy}>
                        {
                            fields.map((field, index) =>(
                                <WorkExperienceItem key={field.id}
                                id={field.id}
                                index={index}
                                form={form}
                                remove={remove}
                                />
                            ))
                        }
                    </SortableContext>
                </DndContext>
                <div className='flex items-center justify-center'>
                    <Button variant={'default'}
                        type='button'
                        onClick={()=>append({
                            position:'',
                            company: '',
                            startDate: '',
                            endDate: '',
                            description: ''
                        })}>
                        <PlusSquare className='size-4'/>
                        Add Work Experience
                    </Button>
                </div>
            </form>
      </FormProvider>
    </div>
  )
}

interface WorkExpItemProps{
    id: string
    form: UseFormReturn<WorkExperienceValues>
    index: number
    remove: (index: number) => void
}

function WorkExperienceItem({id, form, index, remove}: WorkExpItemProps){
    // DragDrop step 5, make new props (id), because this we are using for old and new inder
    // comparison and all the attributes like below
    // attributes and listner grad div
    // setNodeRed tell which div to drag and drop
    // transform, transiton and isDraggning is about Styling
    const {attributes, setNodeRef, listeners, transform, transition, isDragging} = useSortable({id})
    const divRef = useRef<HTMLDivElement>(null)
    const [expand, setExpand] = useState(false)

    const [number, setNumber] = useState(index)

    return (
        <div ref={setNodeRef} className={cn('border p-3 bg-(--background) rounded borderColor',
            isDragging && 'shadow-2xl scale-90 transition-transform relative z-10'
        )}
        style={{transform: CSS.Transform.toString(transform), transition}}
        >
            <div className='flex justify-between gap-2'>
                <CollapseButton title={`Work expereince ${number+1}`} reference={divRef}
                expand={expand} setExpand={setExpand}/>
                {/* DragDrop Step  {...attributes} {...listeners} is resopnsible for drag and drop, 
                dont need to add onClick and all, inbuild Function */}
                <GripHorizontal className='size-4 cursor-grab text-(--muted-foreground) outline-0'
                {...attributes} {...listeners}/>
            </div>

            <div ref={divRef} className={'space-y-4 h-0 overflow-hidden'}>
                <FormField
                control={form.control}
                name={`workExperiences.${index}.position`}
                    render={({ field }) => (
                        <FormItem className='pt-3'>
                            <FormLabel>Job Title</FormLabel>
                            <FormControl>
                                <Input {...field} autoFocus placeholder='Enter your job title'/>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name={`workExperiences.${index}.company`}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Company Name</FormLabel>
                            <FormControl>
                                <Input {...field} placeholder='Company Name'/>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div className='space-y-2'>
                    <div className='grid grid-cols-12 gap-4'>
                        <div className='col-span-4'>
                            <FormField
                            control={form.control}
                            name={`workExperiences.${index}.startDate`}
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
                                name={`workExperiences.${index}.endDate`}
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
                        Leave the 
                        <span className='font-semibold'> End Date || To </span> if you are currently working
                    </FormDescription>
                </div>
                <FormField
                    control={form.control}
                    name={`workExperiences.${index}.description`}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Job Description</FormLabel>
                            <FormControl>
                                <Textarea {...field} placeholder='Roles and Responsibility you performed.'/>
                            </FormControl>
                            <FormMessage />
                            <FormDescription>Place the roles, activites and good points about you.</FormDescription>
                        </FormItem>
                    )}/>
                
                <Button variant={'destructive'} type='button'
                onClick={()=>remove(index)}>
                    <ArchiveX className='size-4'/>
                    Remove
                </Button>
            </div>


        </div>
    )
}