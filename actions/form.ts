"use server"

import prisma from "@/lib/prisma"
import { currentUser } from "@clerk/nextjs/server"
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