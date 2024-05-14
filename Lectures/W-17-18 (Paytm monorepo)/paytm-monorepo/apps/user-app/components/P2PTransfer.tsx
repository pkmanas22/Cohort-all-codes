"use client"
import { Card } from '@repo/ui/card'
import React, { useState } from 'react'

export default function P2PTransferTransactions({ transactions, title, userId }: {
    transactions: {
        id: string,
        time: Date,
        amount: number,
        fromAcc: string,
        toAcc: string;
    }[],
    title: string,
    userId: string
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
            <div className="pt-2">
                {visibleTransactions.map(t => <div key={t.id} className="flex justify-between">
                    <div>
                        <div className="text-md">
                            {t.toAcc === userId ? "Received INR" : "Sent INR"}
                        </div>
                        <div className="text-slate-600 text-sm">
                            {formatDate(t.time)} {/* Using custom formatDate function */}
                        </div>
                    </div>
                    <div className="flex flex-col items-end font-semibold">
                        <div >
                            {t.toAcc === userId ? "+ " : "- "}Rs {(t.amount / 100).toFixed(2)}
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
        </Card>
    )
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
