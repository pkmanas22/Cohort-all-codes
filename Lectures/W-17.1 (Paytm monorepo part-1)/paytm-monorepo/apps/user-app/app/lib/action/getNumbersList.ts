"use server"

import db from '@manaspaytm/db/client'

export async function getNumbersList(number: string): Promise<{ number: string; }[]> {
    const numbersList = await db.user.findMany({
        where: {
            number: {
                contains: number
            }
        },
        select: {
            number: true
        }
    })

    return numbersList;
}