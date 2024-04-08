import { useEffect, useState } from 'react'
import axios from "axios";

// Custom hook for fetching todos from an API
function useMyTodos() {                          // always starts with use* for better naming convention
    // State to store the fetched todos
    const [todos, setTodos] = useState([])

    // useEffect hook to perform side effects (fetching todos) when the component mounts
    useEffect(() => {
        // Axios GET request to fetch todos from the API
        axios.get('https://sum-server.100xdevs.com/todos')
            .then(function (response) {
                // Update the todos state with the fetched data
                setTodos(response.data.todos)
            })
    }, []) // Empty dependency array ensures the effect runs only once on component mount

    // Return the fetched todos
    return todos;
}

// Component to display todos fetched using the custom hook
export default function CustomHooks() {
    // Call the custom hook to fetch todos
    const allTodos = useMyTodos();

    return (
        <>
            <h1>Custom Hooks</h1>
            {/* Map over the fetched todos to render each todo */}
            {allTodos.map(todo =>
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
