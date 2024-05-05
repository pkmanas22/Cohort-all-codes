"use server"

import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import db from "@manaspaytm/db/client"

export const createOnRampTrans = async (provider: string, amount: number) => {
    const session = await getServerSession(authOptions);
    const token = (Math.random() * 10000).toString();

    if (!session?.user || !session.user?.id) {
        return {
            message: "Unauthenticated request"
        }
    }

    try {
        const userId = session?.user.id;
        // console.log(userId)

        await db.$transaction([

            db.onRampTransaction.create({
                data: {
                    status: 'Processing',
                    token,
                    provider,
                    amount,
                    userId,
                    startTime: new Date(),
                }
            }),

            db.balance.updateMany({
                where: {
                    userId,
                },
                data: {
                    locked: {
                        // get amount form db
                        increment: amount
                    }
                }
            })


        ])
        return {
            message: "Done"
        }

    } catch (error) {
        console.log(error);
        return ({      // refund the amount
            message: "Error while updating data"
        })
    }
}