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
import { Form, FormControl, FormField, FormItem, FormLabel } from './ui/form'
import { Input } from './ui/input'
import { Textarea } from './ui/textarea'
import { toast } from 'sonner'
import { formSchema, formSchemaType } from '@/schemas/form'
import { CreateForm } from '@/actions/form'

function CreateFormbtn() {
    const form = useForm<formSchemaType>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            description: "",
        },
    })
    async function onSubmit(values: formSchemaType) {
        try {
            const formId = await CreateForm(values)
            toast('title:Success,description:Form created successfully')
            console.log(formId);

        } catch (error) {
            toast("Error", {
                description: "Something went wrong,please try again",
            })
        }
    }
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant={"outline"} className='group border border-primary/20 h-[190px] items-center justify-center flex flex-col hover:border-primary hover:cursor-pointer border-dashed gap-4 bg-background'>
                <BsFileEarmarkPlus className='h-8 w-8 text-muted-foreground group-hover:text-primary'/>
                    <p className='font-bold text-xl text-muted-foreground group-hover:text-primary'>Create new form</p></Button>

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
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>name</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>description</FormLabel>
                                    <FormControl>
                                        <Textarea rows={5} {...field} />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                    </form>
                </Form>
                <DialogFooter>
                    <Button
                        onClick={form.handleSubmit(onSubmit)}
                        disabled={form.formState.isSubmitting} className='w-full mt-4'>
                        {!form.formState.isSubmitting && <span>Save</span>}
                        {form.formState.isSubmitting && <ImSpinner2 className='animate-spin' />}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
export default CreateFormbtn


