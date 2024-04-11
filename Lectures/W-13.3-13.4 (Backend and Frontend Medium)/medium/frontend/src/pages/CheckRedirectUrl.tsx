
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const CheckRedirectUrl = () => {
    const navigate = useNavigate();

    const loggedInUser = async () => {
        try {
            // await axios.get('http://localhost:3000/api/v1/account/balance', {
            //     headers: {
            //         Authorization: localStorage.getItem('token'),
            //     }
            // })
            navigate('/dashboard');
        } catch (error) {
            navigate('/blogs');
        }
    }

    useEffect(() => {
        loggedInUser();
    }, [])

    return (
        <div></div>
    )
}
