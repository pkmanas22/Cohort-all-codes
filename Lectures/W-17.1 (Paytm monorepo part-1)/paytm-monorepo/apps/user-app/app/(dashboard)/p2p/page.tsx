
import React from 'react'
import SendMoneyCard from '../../../components/SendMoneyCard'

export default function page() {
    return (
        <div className="w-screen">
            <div className="text-4xl text-[#6a51a6] pt-8 mb-8 font-bold">
                P2P Transfer
            </div>
            <div className="grid grid-cols-1 ">
                <div>
                    < SendMoneyCard />
                </div>
                {/* <div>
                    <BalanceCard amount={balance.amount} locked={balance.locked} />
                    <div className="pt-4">
                        < OnRampTransactions transactions={transactions} />
                    </div>
                </div> */}
            </div>
        </div>
    )
}
