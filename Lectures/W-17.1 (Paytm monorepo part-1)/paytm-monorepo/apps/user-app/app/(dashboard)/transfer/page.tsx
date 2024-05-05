
import React from 'react'
import AddMoneyCard from '../../../components/AddMoneyCard';
import BalanceCard from '../../../components/BalanceCard';
import OnRampTransactions from '../../../components/OnRampTransactions';
import { useGetBalance } from '../../../hooks/useGetBalance';
import { useGetOnRampTransactions } from '../../../hooks/useGetOnRampTransactions.ts';

export default async function page() {
  const balance = await useGetBalance();
  const transactions = await useGetOnRampTransactions();

  if (!balance || !transactions) {
    return <div>
      Bad request !!!! Try logout and then login again
    </div>
  }

  return (
    <div className="w-screen">
      <div className="text-4xl text-[#6a51a6] pt-8 mb-8 font-bold">
        Add Money
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 p-4">
        <div>
          < AddMoneyCard />
        </div>
        <div>
          <BalanceCard amount={balance.amount} locked={balance.locked} />
          <div className="pt-4">
            < OnRampTransactions title='Recent Transactions' transactions={transactions} />
          </div>
        </div>
      </div>
    </div>
  )
}