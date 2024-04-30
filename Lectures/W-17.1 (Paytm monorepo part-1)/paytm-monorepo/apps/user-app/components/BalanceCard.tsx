
import { Card } from '@repo/ui/card'
import React from 'react'

export default function BalanceCard({ amount, locked }: {
    amount: number,
    locked: number
}) {
    return (
        <Card title='Balance'>
            <div className="flex justify-between border-b border-slate-300 pb-2">
                <div>
                    Unlocked Balance
                </div>
                <div>
                    {(amount / 100).toFixed(2)} INR
                </div>
            </div>

            <div className="flex justify-between border-b border-slate-300 pb-2">
                <div>
                    Locked balance
                </div>
                <div>
                    {(locked / 100).toFixed(2)} INR
                </div>
            </div>

            <div className="flex justify-between border-b font-semibold border-slate-300 pb-2">
                <div>
                    Total balance
                </div>
                <div>
                    {((locked + amount) / 100).toFixed(2)} INR
                </div>
            </div>

        </Card>
    )
}