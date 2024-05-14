
import React from 'react'
import { useGetBalance } from '../../../hooks/useGetBalance'
import { useGetP2PTransactions } from '../../../hooks/useGetP2PTransactions'
import { useGetSession } from '../../../hooks/useGetSession'

export default async function page() {
  const session = await useGetSession();
  const balance = await useGetBalance();
  const transactions = await useGetP2PTransactions();

  if (!balance || !transactions || !session) {
    return <div>
      Bad request  !!!! Try logout and then login again
    </div>
  }

  return (
    <div className="w-screen">
      <div className="text-4xl text-[#6a51a6] pt-8 mb-8 font-bold italic">
        Welcome <span className=''>{session.user.name}</span>
      </div>
      <p className="text-lg mb-6">Here's a quick overview of your account:</p>
      <div className='w-full text-center text-xl font-semibold mb-2'>
        <h2>Available Balance
          <span className="text-xl font-bold italic">  Rs {(balance.amount / 100).toFixed(2)}</span>
        </h2>
        <h2>Locked Balance
          <span className="text-xl font-bold italic">  Rs {(balance.locked / 100).toFixed(2)}</span>
        </h2>
        <h2>Total Balance
          <span className="text-xl font-bold italic">  Rs {((balance.locked + balance.amount) / 100).toFixed(2)}</span>
        </h2>
      </div>
    </div>
  )
}
