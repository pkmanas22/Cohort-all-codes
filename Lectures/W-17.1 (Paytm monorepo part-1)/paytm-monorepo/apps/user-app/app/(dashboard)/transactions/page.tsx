
import React from 'react'
import { useGetP2PTransactions } from '../../../hooks/useGetP2PTransactions'
import P2PTransferTransactions from '../../../components/P2PTransfer'
import { useGetSession } from '../../../hooks/useGetSession'
import OnRampTransactions from '../../../components/OnRampTransactions'
import { useGetOnRampTransactions } from '../../../hooks/useGetOnRampTransactions.ts'

export default async function page() {

  const session = await useGetSession();
  const p2pTransactions = await useGetP2PTransactions();
  const onRampTransactions = await useGetOnRampTransactions();

  if (!p2pTransactions || !session || !onRampTransactions) {
    return <div>
      Bad request  !!!! Try logout and then login again
    </div>
  }

  return (
    <div className="w-screen">
      <div className="text-4xl text-[#6a51a6] pt-8 mb-8 font-bold underline italic">
        Transaction History
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 p-4">
        <div>
          < P2PTransferTransactions title='P2P Transactions' userId={session.user.id} transactions={p2pTransactions} />
        </div>
        <div>
          < OnRampTransactions title='Top up history' transactions={onRampTransactions} />
        </div>
      </div>
    </div>
  )
}
