"use server"

import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import db from '@manaspaytm/db/client'

export default async function p2pTransfer(toAccNum: string, amount: number) {
    const session = await getServerSession(authOptions);
    const fromAcc = session?.user.id;

    if (!fromAcc) {
        return {
            message: "Error while sending"
        }
    }

    const toUser = await db.user.findFirst({
        where: {
            number: toAccNum
        }
    })

    if (!toUser) {
        return {
            message: "Account not found"
        }
    }

    if (fromAcc === toUser.id) {
        return {
            message: "lol !!! Can't transfer into own account"
        }
    }

    try {
        await db.$transaction(async (tx) => {
            await tx.$queryRaw`SELECT * FROM "Balance" WHERE "userId" = ${fromAcc} FOR UPDATE`; // this is for the locking of rows

            const fromBalance = await tx.balance.findFirst({
                where: {
                    userId: fromAcc,
                }
            })

            if (!fromBalance || fromBalance?.amount < amount) {
                console.log("Insufficient balance")
                throw new Error("Insufficient balance");
            }
            // await new Promise(r => setTimeout(r, 4000))
            await tx.balance.update({
                where: {
                    userId: fromAcc
                },
                data: {
                    amount: {
                        decrement: amount
                    }
                }
            })

            await tx.balance.update({
                where: {
                    userId: toUser.id
                },
                data: {
                    amount: {
                        increment: amount
                    }
                }
            })

            await tx.p2PTransfer.create({
                data: {
                    amount,
                    timestamp: new Date(),
                    fromUserId: fromAcc,
                    toUserId: toUser.id
                }
            })
        })
        return {
            message: "Transfer successful"
        }
    } catch (error: any) {
        console.log(error)
        return {
            message: error.message
        }
    }
}