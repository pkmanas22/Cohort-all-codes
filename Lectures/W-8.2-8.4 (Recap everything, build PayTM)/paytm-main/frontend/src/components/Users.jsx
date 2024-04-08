import { useEffect, useState } from "react";
import Input from "../components/Input";
import ProfileLogo from "./ProfileLogo";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Users({ id }) {
    const [users, setUsers] = useState([])
    const [filter, setFilter] = useState('');

    // debouncing
    let timeOut;
    const filteredText = (e) => {
        clearTimeout(timeOut);
        timeOut = setTimeout(() => {
            setFilter(e.target.value)
        }, 800);
    }

    useEffect(() => {
        axios.get('http://localhost:3000/api/v1/user/bulk?filter=' + filter)
            .then((res) => {
                // console.log(res.data.user);
                setUsers(res.data.user)
            })
            .catch((err) => {
                setUsers([])
            })
    }, [filter])

    // console.log(filter);
    // console.log(users);

    return (
        <div className="p-3 md:px-14">
            <div className="font-semibold text-3xl my-2">
                Users
            </div>
            <div className="my-5 px-3">
                < Input
                    onChangeFn={filteredText}
                    id={""}
                    label={""}
                    placeholder={"Search Users"}
                    type={"text"} />
            </div>
            <div className="my-4">
                <hr />
            </div>
            <div>
                {users
                    .filter(user => user.id !== id)
                    .map(user => (
                        <User
                            key={user.id}
                            id={user.id}
                            firstName={user.firstName}
                            lastName={user.lastName} />
                    ))
                }
            </div>
        </div>
    )
}

function User({ id, firstName, lastName }) {
    const navigate = useNavigate();

    return (
        <div className="flex items-center justify-between p-2 rounded-lg shadow-md my-2 pb-5">
            <ProfileLogo
                firstName={firstName}
                lastName={lastName} />
            <div
                className="text-xl font-semibold bg-blue-600 text-white px-3 py-1 rounded-md cursor-pointer hover:bg-blue-700 shadow-xl"
                onClick={() => {
                    navigate('/send?toId=' + id + "&firstName=" + firstName + "&lastName=" + lastName)
                }}
            >
                Send Money
            </div>

        </div>
    )
}
