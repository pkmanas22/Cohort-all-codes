import axios from "axios";
import Balance from "../components/Balance";
import NavBar from "../components/NavBar";
import Users from "../components/Users";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
    const [userName, setUserName] = useState('');
    const [userId, setUserId] = useState('');
    const [amount, setAmount] = useState(0);

    const navigate = useNavigate();

    const loggedInUser = async () => {
        try {
            const response = await axios.get('http://localhost:3000/api/v1/account/balance', {
                headers: {
                    Authorization: localStorage.getItem('token'),
                }
            })

            setUserId(response.data.userId);
            setUserName(response.data.firstName);
            setAmount(response.data.balance);
        } catch (error) {
            console.log("error");
            navigate('/signin')
        }
    }

    useEffect(() => {
        loggedInUser();
    })

    return (
        <div>
            < NavBar userName={userName} />
            < Balance amount={amount} />
            < Users id={userId} />
        </div>
    )
}