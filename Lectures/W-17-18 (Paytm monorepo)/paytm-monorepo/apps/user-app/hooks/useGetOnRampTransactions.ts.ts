
import db from '@manaspaytm/db/client'
import { useGetSession } from "./useGetSession";

export async function useGetOnRampTransactions() {
  try {
    const session = await useGetSession()

    const txns = await db.onRampTransaction.findMany({
      where: {
        userId: session?.user.id,
      },
      orderBy: {
        startTime: 'desc'
      }
    });

    return txns.map(t => ({
      id: t.id,
      time: t.startTime,
      amount: t.amount,
      status: t.status,
      provider: t.provider,
    }))
  } catch (error) {
    console.log(error)
  }
}