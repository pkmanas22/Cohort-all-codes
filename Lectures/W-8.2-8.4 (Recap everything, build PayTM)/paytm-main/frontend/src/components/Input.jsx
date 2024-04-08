

export default function Input({ id, label, placeholder, type, onChangeFn }) {
    return (
        <div className="my-1">
            <label className="text-gray-800 font-semibold text-lg w-full" htmlFor={id}>{label}</label>
            <input
                className="text-lg border-2 w-full px-2 py-1 text-black font-normal rounded-lg"
                type={type}
                id={id}
                onChange={onChangeFn}
                placeholder={placeholder} />
        </div>
    )
}