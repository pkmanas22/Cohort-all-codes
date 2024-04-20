
import axios from 'axios';
import React, { useState } from 'react'
import { BACKEND_URL } from '../config';

export default function Signin() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    return (
        <div>
            <div>
                <input type="email" onChange={(e) => {
                    setEmail(e.target.value)
                }} placeholder='Email' />
                <input type="password" onChange={(e) => {
                    setPassword(e.target.value)
                }} placeholder='Password' />
            </div>
            <div>
                <input type="submit" value="Submit" onClick={async() => {
                    await axios.post(`${BACKEND_URL}/signin`, {
                        email,
                        password
                    }, {
                        withCredentials: true
                    }).then(async() => {
                        alert("You are logged in")
                    }).catch(() => alert("something happens"))
                }} />
            </div>
        </div>
    )
}
