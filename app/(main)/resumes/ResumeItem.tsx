'use client'
import ResumePreview from '@/components/ResumePreview'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import useToast from '@/hooks/useToast'
import { ResumeServerData } from '@/lib/type'
import { maptToResumeValues } from '@/lib/utils'
import { DropdownMenuContent, DropdownMenuItem } from '@radix-ui/react-dropdown-menu'
import { formatDate } from 'date-fns'
import { Loader2, MoreVertical, Printer, Trash, X} from 'lucide-react'
import Link from 'next/link'
import React, { useRef, useState, useTransition } from 'react'
import { DeleteResume } from './actions'
import { Dialog, DialogClose, DialogFooter, DialogHeader } from '@/components/ui/dialog'
import { DialogDescription, DialogTitle } from '@radix-ui/react-dialog'
import {useReactToPrint} from 'react-to-print'

interface ResumeItemProps{
    resume : ResumeServerData
}

export default function ResumeItem({resume} : ResumeItemProps) {
    const contentRef = useRef(null)

    const reactToPrint = useReactToPrint({
        contentRef, 
        documentTitle: resume.firstName || "Resume"
    })

    const wasUpdatedAt = resume.updateAt !== resume.createdAt

  return (
    <div className='group border borderColor p-4 rounded bg-(--secondary) space-y-4'>
        <div>
            <div className='flex items-start justify-between'>
                <div>
                    <span className='font-semibold uppercase'>{resume.firstName}</span> ||
                    <span className='font-semibold uppercase'>{ resume.title}</span>
                </div>
                <MoreMenu resumeId={resume.id} onPrintClick={reactToPrint}/>
            </div>
            <p className='text-sm'>{wasUpdatedAt ? 'Updated' : 'Created'} on {' '}
                {formatDate(resume.updateAt, 'MMM d, yyyy h:mm a')}
            </p>
        </div>
        <Link href={`/editor?resumeId=${resume.id}`} className='relative overflow-hidden flex w-full items-center justify-center gap-2'>
            <ResumePreview resumeData={maptToResumeValues(resume)} contentRef={contentRef}
            className='overflow-hidden group-hover:shadow-lg transition-all'/>
              <div className="absolute bottom-0 inset-x-0 h-40 bg-linear-to-t from-white to-transparent z-10" />
        </Link>

    </div>
  )
}

interface MoreMenuProps{
    resumeId : string
    onPrintClick : ()=> void
}

function MoreMenu({resumeId, onPrintClick}:MoreMenuProps){
    const [showDeleteConfirmation, setShowDeleDonfirm] = useState(false)

    return(
        <>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant={'ghost'} size={'icon'}
                    className='cursor-pointer relative opacity-100 transition-all bg-(--primary)/10 outline-none'>
                        <MoreVertical className='size-4'/>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className='relative z-20 bg-white outline-none border borderColor rounded'>
                    <DropdownMenuItem className='flex items-center outline-none gap-2 cursor-pointer bg-(--popover) px-2 py-1 rounded
                    relative z-20 hover:bg-red-500 hover:text-white transition-all'
                    onClick={()=>setShowDeleDonfirm((p)=>!p)}>
                        <Trash className='size-4'/>
                        Delete
                    </DropdownMenuItem>
                    <DropdownMenuItem className='flex items-center outline-none gap-2 cursor-pointer bg-(--popover) px-2 py-1 rounded
                    relative z-20 hover:bg-(--secondary) transition-all'
                    onClick={onPrintClick}>
                        <Printer className='size-4'/>
                        Print
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
            {showDeleteConfirmation && 
                    <div className='bg-black/40 backdrop-blur-2xl fixed top-0 left-0 h-screen w-screen z-40 flex items-center justify-center'>
                        <div className='bg-white p-8 rounded w-120'>
                            <DeleteConfDialog resumeId={resumeId} open={showDeleteConfirmation}
                            openChange={setShowDeleDonfirm}/>
                        </div>
                    </div>
            }
        </>
    )
}

interface DeleteProps{
    resumeId :string
    open : boolean
    openChange : (open : boolean) => void
}

function DeleteConfDialog({resumeId, open, openChange}: DeleteProps){

    const {toast} = useToast()
    const [loading, setLoading] = useState(false)
    const [isPending, startTransiton] = useTransition()

    async function handleDelete(){
        setLoading(true)
        startTransiton(async ()=>{
            try {
                await DeleteResume(resumeId)
                setLoading(false)
                openChange(false)
            } catch (error) {
                console.log('error on delete,', error)
                toast.error('Something went wrong, Please try again.')
            }
        })
    }

    return (
        <Dialog open={open} onOpenChange={openChange}>
            <DialogHeader className='pb-4'>
                <DialogTitle>Delete Resume?</DialogTitle>
                <DialogDescription>
                    This will permenatly delet this resume. Are you sure, you want to delete this resume?
                </DialogDescription>
            </DialogHeader>
            <DialogFooter className='flex gap-8'>
                <Button variant={'destructive'} disabled={loading}
                onClick={handleDelete} className='flex items-center gap-2 cursor-pointer border borderColor'>
                    {loading ?
                        <Loader2 className='mx-auto my-6 animate-spin'/>
                    :    
                        <Trash className='size-4'/>
                    }
                    Delete
                </Button>
                <DialogClose asChild>
                    <Button variant="secondary" onClick={()=>openChange(false)} className='flex items-center gap-2 cursor-pointer border borderColor'> 
                        <X className='size-4'/>
                        Cancel</Button>
                </DialogClose>
            </DialogFooter>
        </Dialog>
    )
    
}
