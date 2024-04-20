
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { BACKEND_URL } from '../config';

export default function User() {
    const [userId, setUserId] = useState('');

    useEffect(() => {
        axios.get(`${BACKEND_URL}/user`, {
            withCredentials: true
        }).then((res) => {
            // console.log(res);
            setUserId(res.data.userId)
        }).catch((err) => {
            alert("Error")
        })
    }, [])

    return (
        <div>
            User id is {userId}
            <br />

            <button onClick={() => {
                axios.post(`${BACKEND_URL}/logout`, {}, {
                    withCredentials: true
                }).then(() => {
                    alert("Logged out successfully")
                }).catch(() => {
                    alert("Error while logout")
                })
            }}>Logout</button>
        </div>
    )
}
