"use client"

import React from 'react'
import {
    Dialog,
    DialogDescription,
    DialogTitle,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTrigger,
} from "./ui/dialog"
import { BsFileEarmarkPlus } from "react-icons/bs"
import { ImSpinner2 } from "react-icons/im"
import { Button } from './ui/button'
import * as z from "zod"
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { log } from 'console'
const formSchama = z.object({
    name: z.string().min(4),
    description: z.string().optional()
})

type formSchemaType = z.infer<typeof formSchama>
function CreateFormbtn() {
    const form = useForm<z.infer<typeof formSchama>>({
        resolver: zodResolver(formSchama)
    })
    function onSubmit(values: formSchemaType) {
        console.log(values)

    }
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button>Create new form</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        Create form
                    </DialogTitle>
                    <DialogDescription>
                        Create a new form to start collecting responses
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}
export default CreateFormbtn


