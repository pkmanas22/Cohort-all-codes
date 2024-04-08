import { useState } from "react";
import axios from 'axios';

export function CreateTodo() {
    // react-query
    const [title, setTitle] = useState("")
    const [desc, setDesc] = useState("")

    return (
        <div>
            <input style={{
                padding: 10,
                margin: 10,
                borderRadius: 5,
            }} onChange={(e) => {
                // console.log(e.target.value);
                setTitle(e.target.value)
            }} type="text" placeholder="Title" /> <br />

            <input style={{
                padding: 10,
                margin: 10,
                borderRadius: 5,
            }} onChange={(e) => {
                // console.log(e.target.value);
                setDesc(e.target.value)
            }} type="text" placeholder="Description" /> <br />

            <button style={{
                padding: 10,
                margin: 10,
                borderRadius: 5,
            }} onClick={ async () => {

                // using axios 
                try {
                    const response = await axios.post('http://localhost:3000/todo', {
                        title, 
                        desc
                    })
    
                    alert(response.data.msg);
                } catch (error) {
                    alert("Error occured. Please recheck the given data.")
                }
                
                /*
                // without axios dummy steps
                fetch('http://localhost:3000/todo', {
                    method: "POST",
                    body: JSON.stringify({
                        title,      // we can use also use title: document.querySelector("#title")
                        desc
                    }),
                    headers: {
                        "Content-Type": "application/json"
                    }
                })
                    .then(async function (res) {
                        const json = await res.json();
                        alert("Todo Crated")
                    })
                */

            }}>Add a TODO</button>
        </div>
    )
}