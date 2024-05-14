
import db from '@manaspaytm/db/client'
import { useGetSession } from "./useGetSession";

export async function useGetP2PTransactions() {
    try {
        const session = await useGetSession()

        const txns = await db.p2PTransfer.findMany({
            where: {
                OR: [
                    {
                        fromUserId: session?.user.id,
                    },
                    {
                        toUserId: session?.user.id,
                    }
                ]
            },
            orderBy: {
                timestamp: 'desc'
            }
        });

        return txns.map(t => ({
            id: t.id,
            time: t.timestamp,
            amount: t.amount,
            fromAcc: t.fromUserId,
            toAcc: t.toUserId,
        }))
    } catch (error) {
        console.log(error)
    }
}