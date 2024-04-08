import ProfileSettingDropDown from "./ProfileSettingDropDown";

export default function NavBar({ userName }) {
    return (
        <>
            <div className="flex w-screen justify-between items-center p-3 md:px-10 bg-gray-300">
                <div className="font-bold text-2xl">
                    ManasPe
                </div>
                <div className="flex font-semibold items-center text-xl">
                    <div className="italic mr-3">
                        Hello, {userName}
                    </div>

                    < ProfileSettingDropDown userName={userName} />
                </div>
            </div>

        </>
    )
} 