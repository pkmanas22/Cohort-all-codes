"use client"
import { Card } from '@repo/ui/card'
import React, { useState } from 'react'

// Import the enum type definition
import { onRampStatus } from '@prisma/client';

export default function OnRampTransactions({ transactions, title }: {
    transactions: {
        id: string,
        time: Date,
        amount: number,
        // TODO: Can the type of `status` be more specific other than string?
        status: onRampStatus,
        provider: string
    }[],
    title: string
}) {
    const [showAll, setShowAll] = useState(false);

    if (!transactions.length) {
        return <Card title="Recent Transactions">
            <div className="text-center pb-8 pt-8">
                No Recent transactions
            </div>
        </Card>
    }

    function toggleShowAll() {
        setShowAll(!showAll)
    }

    const visibleTransactions = showAll ? transactions : transactions.slice(0, 5);

    return (
        <Card title={title}>
            <div>
                <div className="pt-2">
                    {visibleTransactions.map(t => <div key={t.id} className="flex justify-between">
                        <div>
                            <div className="text-md">
                                Added INR
                            </div>
                            <div className="text-slate-600 text-sm">
                                {formatDate(t.time)}
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
                {transactions.length > 5 && !showAll &&
                    <button onClick={toggleShowAll} className="text-blue-500 mt-2 font-bold">
                        Show More
                    </button>
                }
                {showAll &&
                    <button onClick={toggleShowAll} className="text-blue-500 mt-2 font-bold">
                        Show Less
                    </button>
                }
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

function formatDate(date: Date) {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    let hours = date.getHours();
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    const ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // Handle midnight

    return `${day}/${month}/${year}, ${hours}:${minutes}:${seconds} ${ampm}`;
}
