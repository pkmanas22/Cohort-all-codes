
import React from 'react'
import SendMoneyCard from '../../../components/SendMoneyCard'
import BalanceCard from '../../../components/BalanceCard'
import { useGetBalance } from '../../../hooks/useGetBalance'
import { useGetP2PTransactions } from '../../../hooks/useGetP2PTransactions'
import P2PTransferTransactions from '../../../components/P2PTransfer'
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
            <div className="text-4xl text-[#6a51a6] pt-8 mb-8 font-bold">
                P2P Transfer
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 p-4">
                <div>
                    < SendMoneyCard />
                </div>
                <div>
                    <BalanceCard amount={balance.amount} locked={balance.locked} />
                    <div className="pt-4">
                        < P2PTransferTransactions title='Recent Transactions' userId={session.user.id} transactions={transactions} />
                    </div>
                </div>
            </div>
        </div>
    )
}
