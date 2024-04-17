import { useState } from "react"
import { InputComp } from "./InputComp"
import { useNavigate } from "react-router-dom"
import useDebounceHook from "../utils/debounceHook"
import { signUpType, signupSchema } from "@manaskp/commonmedium";
import axios from "axios";
import { backendUrl } from "../utils/backendUrl";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoadingBtn } from "../utils/loadingBtn";

export const SignUpComp = () => {
    const [serverError, setServerError] = useState(null);
    const [tempEmail, setTempEmail] = useState("")
    const [tempName, setTempName] = useState("")
    const [tempPassword, setTempPassword] = useState("")
    const navigate = useNavigate();
    const [btnLoading, setBtnLoading] = useState(false);

    const name = useDebounceHook(tempName);
    const email = useDebounceHook(tempEmail);
    const password = useDebounceHook(tempPassword);

    const signupBody: signUpType = {
        name,
        email,
        password
    }

    const {
        register,
        handleSubmit,
        formState: { errors },
        // setError,
    } = useForm<signUpType>({
        resolver: zodResolver(signupSchema)
    });


    const handleFormSubmit = async () => {
        setBtnLoading(true);

        setServerError(null);

        setTimeout(() => {
            axios.post(`${backendUrl}/users/signup`, signupBody)
                .then((response) => {
                    // console.log(response.data);
                    const token = "Bearer " + response.data.token;
                    localStorage.setItem('token', token);
                    navigate("/");
                })
                .catch((err) => {
                    // console.log(err.response.data);
                    setServerError(err.response.data.msg)
                })
                setBtnLoading(false);
        }, 1000);

    }


    return (
        <form onSubmit={handleSubmit(handleFormSubmit)} className="flex flex-col justify-center items-center gap-3">
            <div className="lg:text-5xl text-4xl font-bold text-green-700">
                Create an Account
            </div>
            <div className="text-lg font-semibold">
                Already have an account ?
                <span onClick={() => {
                    navigate("/signin")
                }}
                    className="italic underline hover:text-blue-700 cursor-pointer mx-1 text-xl text-gray-700">
                    Signin
                </span>
            </div>

            < InputComp
                id="name"
                label="Your name"
                type="text"
                placeholder="Enter your name"
                register={register}
                error={errors.name}
                onChangeFn={(e) => {
                    setTempName(e.target.value)
                }} />

            < InputComp
                id="email"
                label="Your email"
                type="email"
                placeholder="Enter your email"
                register={register}
                error={errors.email}
                onChangeFn={(e) => {
                    setTempEmail(e.target.value)
                }} />

            < InputComp
                id="password"
                label="Your password"
                type="password"
                placeholder="Enter your password"
                register={register}
                error={errors.password}
                onChangeFn={(e) => {
                    setTempPassword(e.target.value)
                }} />

            {serverError && <span className="font-bold text-red-800 rounded-lg bg-red-50">
                {serverError}</span>}
            {
                btnLoading ?
                    <LoadingBtn /> :
                    <button type="submit"
                        className="w-[50%] text-white outline bg-black opacity-90 hover:opacity-100 font-medium rounded-full px-4 py-1.5 text-center cursor-pointer">
                        Sign up
                    </button>
            }
        </form>
    )
}
