import { useEffect, useState } from 'react'
import axios from "axios";

export default function UseEffect() {
    // State to store the fetched todos
    const [todos, setTodos] = useState([])

    // useEffect hook to fetch todos when the component mounts
    useEffect(() => {
        axios.get('https://sum-server.100xdevs.com/todos')
            .then(function (response) {
                // Update the todos state with the fetched data
                setTodos(response.data.todos)
            })
    }, []) // Empty dependency array ensures the effect runs only once on component mount

    return (
        <>
            <h1>All todos</h1>
            {/* Map over the fetched todos to render each todo */}
            {todos.map(todo =>
                (<Todo key={todo.id} title={todo.title} description={todo.description} />)
            )}
        </>
    )
}

// Component to display individual todo
function Todo({ title, description }) {
    return (
        <div>
            {/* Render the title and description of the todo */}
            <h1>{title}</h1>
            <p>{description}</p>
        </div>
    )
}
