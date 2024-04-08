import { useEffect, useState } from 'react'
import axios from "axios";

export default function TaskUseEffect() {
    const [btnId, setBtnId] = useState(1)

    return (
        <div>
            {/* Buttons to select task IDs */}
            <button onClick={() => { setBtnId(1) }}>1</button>
            <button onClick={() => { setBtnId(2) }}>2</button>
            <button onClick={() => { setBtnId(3) }}>3</button>
            <button onClick={() => { setBtnId(4) }}>4</button>
            <button onClick={() => { setBtnId(5) }}>5</button>

            {/* Render Todo component based on selected task ID */}
            <Todo id={btnId} />
        </div>
    )
}

function Todo({ id }) {
    // State to store title and description of the todo
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")

    // useEffect hook to fetch todo details when id changes
    useEffect(() => {
        axios.get(`https://sum-server.100xdevs.com/todo?id=${id}`)
            .then((response) => {
                // Update title and description state with fetched data
                setTitle(response.data.todo.title);
                setDescription(response.data.todo.description);
            })
    }, [id]) // id given so that if id changes then todos data will be updated. if we didnot send anything in dependencies then data is not being update       

    return (
        <div>
            {/* Render the title and description */}
            <h1>{title}</h1>
            <p>{description}</p>
        </div>
    )
}
