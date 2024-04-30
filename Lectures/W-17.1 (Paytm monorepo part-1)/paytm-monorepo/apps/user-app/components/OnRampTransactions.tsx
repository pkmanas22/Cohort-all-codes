
import { Card } from '@repo/ui/card'
import React from 'react'

// Import the enum type definition
import { onRampStatus } from '@prisma/client';

export default function OnRampTransactions({ transactions }: {
    transactions: {
        id: string,
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
                {transactions.map(t => <div key={t.id} className="flex justify-between">
                    <div>
                        <div className="text-md">
                            Received INR
                        </div>
                        <div className="text-slate-600 text-sm">
                            {t.time.toLocaleString()}
                        </div>
                    </div>
                    <div className="flex flex-col items-end font-semibold">
                        <div >
                            Rs {(t.amount / 100).toFixed(2)}
                        </div>
                        <div className={getStatusColour(t.status)}>
                            {getStatus(t.status)}
                        </div>
                    </div>
                </div>)}
            </div>
        </Card>
    )
}

function getStatusColour(status: onRampStatus) {
    switch (status) {
        case 'Success':
            return 'text-green-600'
        case 'Failure':
            return 'text-red-600'
        case 'Processing':
            return 'text-orange-600'
        default:
            return 'text-slate-600'
    }
}

function getStatus(status: onRampStatus) {
    switch (status) {
        case 'Success':
            return 'Success'
        case 'Failure':
            return 'Failed'
        case 'Processing':
            return 'Pending'
        default:
            return ''
    }
}