import axios from "axios";
import BottomWarning from "../components/BottomWarning";
import Button from "../components/Button";
import Heading from "../components/Heading";
import Input from "../components/Input";
import SubHeading from "../components/SubHeading";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CheckNavigationUrl from "./CheckNavigationUrl";

export default function Signin() {
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    return (<>
        <CheckNavigationUrl navigateUrl={"/signin"} />
        <div className="bg-slate-100 h-screen flex justify-center items-center">
            <div className="w-80 bg-white rounded-xl shadow-2xl p-4">
                < Heading
                    text={"Sign In"} />
                < SubHeading
                    text={"Enter your credentials to access your account"} />
                < Input
                    onChangeFn={e => {
                        setUserName(e.target.value);
                    }}
                    id={"email"}
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
                        axios.post('http://localhost:3000/api/v1/user/signin', {
                            userName,
                            password
                        }).then((res) => {
                            // console.log(res.data.token);
                            const token = "Bearer " + res.data.token;
                            localStorage.setItem('token', token);
                            navigate('/dashboard')
                        }).catch((err) => {
                            console.log(err);
                            const errMsg = err.response.data.message;
                            alert(errMsg);
                        })
                    }}
                    text={"Sign In"} />
                < BottomWarning
                    text={"Don't have an account?"}
                    linkText={"Register"}
                    path={"/signup"} />
            </div>
        </div>
    </>)
}