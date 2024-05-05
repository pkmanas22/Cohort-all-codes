"use client"

import React, { useEffect, useState } from 'react'
import { Card } from '@repo/ui/card'
import { TextInput } from '@repo/ui/text-input'
import { Button } from '@repo/ui/button'
import p2pTransfer from '../app/lib/action/p2pTransfer'
import { getNumbersList } from '../app/lib/action/getNumbersList'
import { DropDown } from '@repo/ui/drop-down'

export default function SendMoneyCard() {
    const [number, setNumber] = useState<string>('');
    const [amount, setAmount] = useState<number>();

    const [numberList, setNumberList] = useState<{ number: string, name: string}[]>()

    useEffect(() => {
        if (number.length >= 3) {
            const numbers = getNumbersList(number);
            numbers.then((data) => {
                setNumberList(data)
            })
        } else {
            setNumberList([])
        }
    }, [number])

    // console.log(numberList)

    function handleSelectElement(num: string) {
        setNumber(num);
    }

    return (
        <div className='w-full'>
            {/* <Center> */}
            <Card title="Send Money">
                <div className='flex flex-col gap-3 items-center w-full'>
                    <div className="w-full">
                        < TextInput
                            id='mobile'
                            label="Mobile No."
                            type='number'
                            value={number}
                            placeholder='9999999999'
                            onChange={(e) => {
                                setNumber(e)
                            }} />

                        <span className='text-sm text-red-600'>(Start typing 3 digits for auto suggestion)</span>
                    </div>


                    {numberList && < DropDown listItems={numberList} onSelect={handleSelectElement} />}

                    <div className="w-full">
                        < TextInput
                            id='amount'
                            label="Amount (in RS.)"
                            type='number'
                            value={amount}
                            placeholder='9.99'
                            onChange={(e) => {
                                setAmount(parseFloat(e))
                            }} />

                        <span className='text-sm text-red-600'>(The amount should be more than 1)</span>
                    </div>


                    <Button onclick={async () => {
                        try {
                            if (!amount || amount < 1) {
                                alert("Error: Please enter valid input")
                            } else {
                                const result = await p2pTransfer(number, amount * 100);
                                console.log(result)
                                if (result && result.message === "Transfer successful") {
                                    await alert("Transfer successful");
                                    location.reload();
                                } else {
                                    await alert("Error: " + (result && result.message ? result.message : "Unknown error"));
                                }
                            }
                        } catch (error) {
                            console.log(error)
                        }
                    }}>
                        Send
                    </Button>

                </div>
            </Card>
            {/* </Center> */}
        </div>
    )
}
