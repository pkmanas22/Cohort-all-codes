import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function CheckNavigationUrl({ navigateUrl }) {

    const navigate = useNavigate();

    const loggedInUser = async () => {
        try {
            await axios.get('http://localhost:3000/api/v1/account/balance', {
                headers: {
                    Authorization: localStorage.getItem('token'),
                }
            })
            navigate('/dashboard');
        } catch (error) {
            navigate(navigateUrl);
        }
    }

    useEffect(() => {
        loggedInUser();
    }, [])

    return (
        <div></div>
    )
}