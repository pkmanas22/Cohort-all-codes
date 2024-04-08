import { useState } from "react";
import BottomWarning from "../components/BottomWarning";
import Button from "../components/Button";
import Heading from "../components/Heading";
import Input from "../components/Input";
import SubHeading from "../components/SubHeading";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import CheckNavigationUrl from "./CheckNavigationUrl";

export default function Signup() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    return (
        <>
            <CheckNavigationUrl navigateUrl={"/signup"} />
            <div className="bg-slate-100 h-screen flex justify-center items-center">
                <div className="w-80 bg-white rounded-xl shadow-2xl p-4">
                    < Heading
                        text={"Sign Up"} />
                    < SubHeading
                        text={"Enter your information to create an account"} />
                    < Input
                        onChangeFn={e => {
                            setFirstName(e.target.value);
                        }}
                        id={"firstName"}
                        label={"First Name"}
                        placeholder={"John"}
                        type={"text"} />
                    < Input
                        onChangeFn={e => {
                            setLastName(e.target.value);
                        }}
                        id={"lastName"}
                        label={"Last Name"}
                        placeholder={"Doe"}
                        type={"text"} />
                    < Input
                        onChangeFn={e => {
                            setUserName(e.target.value);
                        }}
                        id={"userName"}
                        label={"Email"}
                        placeholder={"example@gmail.com"}
                        type={"email"} />
                    < Input
                        onChangeFn={e => {
                            setPassword(e.target.value);
                        }}
                        id={"password"}
                        label={"Password"}
                        placeholder={""}
                        type={"password"} />
                    < Button
                        onClickFn={async () => {
                            axios.post('http://localhost:3000/api/v1/user/signup', {
                                userName,
                                firstName,
                                lastName,
                                password
                            }).then((res) => {
                                // console.log(res.data.token);
                                const token = "Bearer " + res.data.token;
                                localStorage.setItem('token', token);
                                navigate('/dashboard')
                            }).catch((err) => {
                                // const errMsg = err.response.data;
                                alert("Fill all fields with correct format \nPassword should be atleast 6 characters")
                            })
                        }}
                        text={"Sign UP"} />
                    < BottomWarning
                        text={"Already have an account?"}
                        linkText={"Login"}
                        path={"/signin"} />
                </div>
            </div>
        </>
    )
}