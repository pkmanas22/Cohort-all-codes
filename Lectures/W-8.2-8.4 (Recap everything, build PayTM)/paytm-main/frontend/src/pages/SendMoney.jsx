import { useNavigate, useSearchParams } from "react-router-dom";
import Button from "../components/Button";
import Heading from "../components/Heading";
import Input from "../components/Input";
import ProfileLogo from "../components/ProfileLogo";
import { useState } from "react";
import axios from "axios";

export default function SendMoney() {
    const [amount, setAmount] = useState(0);

    const [searchParams] = useSearchParams();

    const navigate = useNavigate();

    const firstName = searchParams.get('firstName');
    const lastName = searchParams.get('lastName');
    const to = searchParams.get('toId');

    // console.log(amount);
    return (
        <div className="bg-slate-100 h-screen flex justify-center items-center">
            <div className="w-80 bg-white rounded-xl shadow-2xl p-4">
                < Heading text={"Send Money"} />
                <div className="mt-8 mb-3">
                    < ProfileLogo
                        firstName={firstName}
                        lastName={lastName} />
                </div>
                <Input
                    onChangeFn={(e) => {
                        setAmount(e.target.value)
                    }}
                    label={"Amount (in Rs.)"}
                    id={"amount"}
                    placeholder={"Enter amount"}
                    type={"Number"} />
                <div className="mt-5">
                    <Button
                        onClickFn={() => {
                            if (amount <= 0) {
                                alert('Enter valid amount')
                            } else {
                                axios
                                    .post('http://localhost:3000/api/v1/account/transfer', {
                                        to,
                                        amount
                                    }, {
                                        headers: {
                                            Authorization: localStorage.getItem('token'),
                                        }
                                    })
                                    .then((res) => {
                                        // console.log(res.data.message);
                                        alert(res.data.message);
                                        navigate('/dashboard')
                                    })
                                    .catch((err) => {
                                        // console.log(err.response.data.message);
                                        alert(err.response.data.message);
                                    })

                            }
                        }
                        }
                        text={"Initiate Transfer"} />
                </div>
            </div>
        </div>
    )
}