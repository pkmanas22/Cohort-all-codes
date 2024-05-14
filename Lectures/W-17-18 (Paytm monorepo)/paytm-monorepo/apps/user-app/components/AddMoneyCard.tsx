"use client"

import { Button } from '@repo/ui/button';
import { Card } from '@repo/ui/card';
import { Select } from '@repo/ui/select';
import { TextInput } from '@repo/ui/text-input';
import React, { useState } from 'react'
import { createOnRampTrans } from '../app/lib/action/createOnRampTrans';

const SUPPORTED_BANKS = [{
    name: "HDFC Bank",
    redirectUrl: "https://netbanking.hdfcbank.com"
}, {
    name: "Axis Bank",
    redirectUrl: "https://www.axisbank.com/"
}];


export default function AddMoneyCard() {
    const [redirectUrl, setRedirectUrl] = useState(SUPPORTED_BANKS[0]?.redirectUrl)
    const [amount, setAmount] = useState<number>();
    const [provider, setProvider] = useState(SUPPORTED_BANKS[0]?.name || "");

    return (
        <Card title='Add Money'>
            <div className="w-full">
                <TextInput
                    id='amount'
                    label='Amount (in RS)'
                    type='number'
                    value={amount}
                    placeholder='Amount'
                    onChange={(e) => {
                        // console.log(amount)
                        setAmount(parseFloat(e))
                    }} />

                <div className="py-4 text-left">
                    Bank
                </div>

                <Select
                    onSelect={(value) => {
                        setRedirectUrl(SUPPORTED_BANKS.find(x => x.name === value)?.redirectUrl)
                        setProvider(SUPPORTED_BANKS.find(x => x.name === value)?.name || "")
                    }}
                    options={
                        SUPPORTED_BANKS.map(x => ({
                            key: x.name,
                            value: x.name,
                        }))
                    } />

                <div className="flex justify-center pt-4">
                    <Button
                        onclick={async () => {
                            // window.location.href = redirectUrl || ""
                            if (!amount ||amount < 1 || !redirectUrl) {
                                alert("please enter valid amount")
                            } else {
                                const intAmount = generateIntAmount(amount);
                                await createOnRampTrans(provider, intAmount)
                                await alert(`Successfully added ${intAmount / 100}`)
                                location.reload()
                            }
                        }}>
                        Add Money
                    </Button>
                </div>
            </div>
        </Card>
    )
}

function generateIntAmount(amount: number): number {
    const stringAmount = amount.toString();
    const arr = stringAmount.split('.');
    let finalAmount = Number(arr[0]) * 100;

    if (!arr[1]) {
        return finalAmount;
    } else {
        const decimalValue = arr[1];

        if (decimalValue.length === 1) {
            return finalAmount + (Number(decimalValue.charAt(0)) * 10);
        } else {
            return finalAmount + Number(decimalValue.charAt(0) + decimalValue.charAt(1));
        }
    }
}
