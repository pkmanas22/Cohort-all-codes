import React from "react"
import { FieldError, UseFormRegister } from "react-hook-form"

type inputType = {
    id: string,
    placeholder: string,
    label: string,
    register: UseFormRegister<FormData>,
    error: FieldError | undefined,
    type: string,
    onChangeFn: (e: React.ChangeEvent<HTMLInputElement>) => void
}
export const InputComp = ({
    id,
    placeholder,
    label,
    register,
    error,
    type,
    onChangeFn
}: inputType) => {
    return (
        <div className="w-[300px]">
            <label
                className="block text-gray-700 font-bold "
                htmlFor={id}>
                {label}
            </label>
            <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight font-bold focus:outline-none focus:shadow-outline"
                id={id}
                type={type}
                placeholder={placeholder}
                {...register(id)}
                onChange={onChangeFn} />
            {error && <span className="font-bold text-red-800 rounded-lg bg-red-50">
                <svg className="flex-shrink-0 inline w-4 h-4 me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                </svg>
                {error.message}</span>}
        </div>
    )
}
