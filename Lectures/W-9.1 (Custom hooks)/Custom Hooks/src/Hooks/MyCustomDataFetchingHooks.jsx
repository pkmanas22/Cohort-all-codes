import axios from "axios";
import { useEffect, useState } from "react";

// Hooks that you create yourself, so other people can use them are called custom hooks.
// A custom hook is effectively a function, but with the following properties -  Uses another hook internally (useState, useEffect, another custom hook)
// Starts with use
function useTodos(n) {
    const [todos, setTodos] = useState([])
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const interval = setInterval(() => {
            axios.get('https://sum-server.100xdevs.com/todos')
                .then((res) => {
                    setTodos(res.data.todos);
                    setLoading(false)
                })
        }, n * 1000);

        // this is for first n seconds
        axios.get('https://sum-server.100xdevs.com/todos')
            .then((res) => {
                setTodos(res.data.todos);
                setLoading(false)
            })
            
        return () => {
            clearInterval(interval);       // This return will only be executed when useEffect() runs more than once. The code inside the return block will execute during the cleanup phase of the first execution, and subsequent executions will occur during the second iteration of useEffect.
        }
    }, [n])         

    return { todos, loading };
}

export default function UseTodosCreation() {
    const { todos, loading } = useTodos(3);

    return (
        <>
            {(loading) ? <div>Loading...</div> : todos.map(todo => <Todo title={todo.title} desc={todo.description} />)}
        </>
    )
}

function Todo({ title, desc }) {

    return (
        <div>
            <h1>{title}</h1>
            <p>{desc}</p>
        </div>
    )
}

