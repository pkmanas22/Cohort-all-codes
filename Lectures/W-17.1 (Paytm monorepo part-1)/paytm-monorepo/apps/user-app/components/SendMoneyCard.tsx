"use client"

import React, { useEffect, useState } from 'react'
import { Card } from '@repo/ui/card'
import { TextInput } from '@repo/ui/text-input'
import { Button } from '@repo/ui/button'
import { Center } from '@repo/ui/center'
import p2pTransfer from '../app/lib/action/p2pTransfer'
import { getNumbersList } from '../app/lib/action/getNumbersList'
import { DropDown } from '@repo/ui/drop-down'

export default function SendMoneyCard() {
    const [number, setNumber] = useState<string>('');
    const [amount, setAmount] = useState<number>(0);

    const [numberList, setNumberList] = useState([])

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
        <div>
            <Center>
                <Card title="Send Money">
                    <div className='flex flex-col gap-3 items-center'>
                        < TextInput
                            id='mobile'
                            label="Mobile No."
                            type='number'
                            value={number}
                            placeholder='9999999999'
                            onChange={(e) => {
                                setNumber(e)
                            }} />

                        < DropDown listItems={numberList} onSelect={handleSelectElement} />

                        < TextInput
                            id='amount'
                            label="Amount (in RS.)"
                            type='number'
                            value={amount}
                            placeholder='9.99'
                            onChange={(e) => {
                                setAmount(parseInt(e))
                            }} />

                        <Button onclick={async () => {
                            try {
                                if (amount > 0 && number) {
                                    const result = await p2pTransfer(number, amount * 100);
                                    console.log(result)
                                    if (result && result.message === "Transfer successful") {
                                        alert("Transfer successful");
                                    } else {
                                        alert("Error: Some error occured");
                                    }
                                } else {
                                    alert('Error: Please enter valid input');
                                }
                            } catch (error) {
                                console.log(error)
                            }
                        }}>
                            Send
                        </Button>

                    </div>
                </Card>
            </Center>
        </div>
    )
}
