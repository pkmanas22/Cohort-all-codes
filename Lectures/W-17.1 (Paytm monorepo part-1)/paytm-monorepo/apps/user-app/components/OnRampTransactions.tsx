
import { Card } from '@repo/ui/card'
import React from 'react'

// Import the enum type definition
import { onRampStatus } from '@prisma/client';

export default function OnRampTransactions({ transactions }: {
    transactions: {
        time: Date,
        amount: number,
        // TODO: Can the type of `status` be more specific other than string?
        status: onRampStatus,
        provider: string
    }[]
}) {

    if (!transactions.length) {
        return <Card title="Recent Transactions">
            <div className="text-center pb-8 pt-8">
                No Recent transactions
            </div>
        </Card>
    }

    return (
        <Card title="Recent Transactions">
            <div className="pt-2">
                {transactions.map(t => <div className="flex justify-between">
                    <div>
                        <div className="text-sm">
                            Received INR
                        </div>
                        <div className="text-slate-600 text-xs">
                            {t.time.toLocaleString()}
                        </div>
                    </div>
                    <div className="flex flex-col justify-center">
                        + Rs {t.amount / 100}
                    </div>
                </div>)}
            </div>
        </Card>
    )
}
