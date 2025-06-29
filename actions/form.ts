"use server"

import prisma from "@/lib/prisma"
import { formSchema, formSchemaType } from "@/schemas/form"
import { currentUser } from "@clerk/nextjs/server"
import { log } from "console"
class UserNotFoundErr extends Error {
}

export async function GetFormStats() {
    const user = await currentUser()
    if (!user) {
        throw new UserNotFoundErr()
    }
    const stats = await prisma.form.aggregate({
        where: {
            userId: user.id
        },
        _sum: {
            visits: true,
            subbmissions: true
        }
    })



    const visits = stats._sum.visits || 0
    const submissions = stats._sum.subbmissions || 0
    let subbmissionRate = 0
    if (visits > 0) {
        subbmissionRate = Math.round((submissions / visits) * 100)
    }
    const bounceRate = 100 - subbmissionRate
    return {
        visits,
        submissions,
        subbmissionRate,
        bounceRate
    }
}

export async function CreateForm(data: formSchemaType) {
    const validation = formSchema.safeParse(data)
    if (!validation.success) {
        throw new Error("Form not vaild")
    }
    const user = await currentUser()
    if (!user) {
        throw new UserNotFoundErr()
    }
    const { name, description } = data
    const form = await prisma.form.create({
        data: {
            userId: user.id,
            name: data.name,
            description: data.description,
        }
    })
    if (!form) {
        throw new Error("Form not created")
    }
    return form.id
}

export async function GetForms() {
    const user = await currentUser()
    if (!user) {
        throw new UserNotFoundErr()
    }
    return await prisma.form.findMany({
        where: {
            userId: user.id
        },
        orderBy: {
            createAt: "desc"
        }
    })
}