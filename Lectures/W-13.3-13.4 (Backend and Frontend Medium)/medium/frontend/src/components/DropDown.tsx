import { useNavigate } from "react-router-dom";


export default function DropDown() {
    const navigate = useNavigate();

    return (
        <div className='absolute right-7 text-lg font-semibold italic outline outline-1 rounded-xl bg-slate-100 outline-slate-400 cursor-pointer '>

            < DropDownOption label={"My Blogs"} onClickFn={() => {
                navigate('/my-blogs')
            }} />

            < DropDownOption label={"Profile"} onClickFn={() => {
                alert('Profile')
            }} />

            < DropDownOption label={"Logout"} onClickFn={() => {
                localStorage.removeItem('token');
                navigate('/signin')
            }} />
        </div>
    )
}

function DropDownOption({ label, onClickFn }: {
    label: string,
    onClickFn: () => void
}) {
    return <div onClick={onClickFn} className='px-4 py-1 hover:bg-slate-300'>
        {label}
    </div>
}
