
export default function ProfileLogo({ firstName, lastName }) {

    return <div className="flex items-center">
        <div className="w-15 h-15 bg-green-700 rounded-full flex items-center justify-center text-xl font-semibold text-white p-2">
            {firstName.charAt(0) + lastName.charAt(0)}
        </div>
        <div className="text-xl ml-3 font-semibold">
            {`${firstName} ${lastName}`}
        </div>
    </div>

}