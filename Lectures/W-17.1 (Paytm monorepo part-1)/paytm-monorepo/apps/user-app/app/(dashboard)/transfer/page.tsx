
import React from 'react'
import { getServerSession } from 'next-auth'
import { authOptions } from '../../lib/auth'
import db from "@manaspaytm/db/client";
import AddMoneyCard from '../../../components/AddMoneyCard';
import BalanceCard from '../../../components/BalanceCard';
import OnRampTransactions from '../../../components/OnRampTransactions';

async function getBalance() {
  try {
    const session = await getServerSession(authOptions);

    const balance = await db.balance.findFirst({
      where: {
        userId: session?.user?.id,
      }
    })

    return {
      amount: balance?.amount || 0,
      locked: balance?.locked || 0,
    }
  } catch (error) {
    console.log(error)
  }
}

async function getOnRampTransactions() {
  try {
    const session = await getServerSession(authOptions);

    const txns = await db.onRampTransaction.findMany({
      where: {
        userId: session?.user.id,
      },
      orderBy: {
        startTime: 'asc'
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

export default async function page() {
  const balance = await getBalance();
  const transactions = await getOnRampTransactions();

  if (!balance || !transactions) {
    return <div>
      Bad request
    </div>
  }

  return (
    <div className="w-screen">
      <div className="text-4xl text-[#6a51a6] pt-8 mb-8 font-bold">
        Transfer
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 p-4">
        <div>
          < AddMoneyCard />
        </div>
        <div>
          <BalanceCard amount={balance.amount} locked={balance.locked} />
          <div className="pt-4">
            < OnRampTransactions transactions={transactions} />
          </div>
        </div>
      </div>
    </div>
  )
}