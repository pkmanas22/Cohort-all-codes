import { useEffect, useState } from "react"

export default function UseEffectExample() {
    const [todos, setTodos] = useState([])

    // This useEffect hook fetches todos data from the server every 3 seconds
    // The dependency array [todos] ensures it runs whenever the todos state changes
    useEffect(() => {
        setTimeout(() => {
            fetch('https://sum-server.100xdevs.com/todos')
                .then(async (res) => {
                    const data = await res.json()
                    setTodos(data.todos)
                })
        }, 3 * 1000);
    }, [todos])
    
    // Both can work 

    // useEffect(() => {
    //     setInterval(() => {
    //         fetch('https://sum-server.100xdevs.com/todos')
    //             .then(async (res) => {
    //                 const data = await res.json()
    //                 setTodos(data.todos)
    //             })
    //     }, 5 * 1000);
    // }, [])


    return <div>
        {
            todos.map(todo => <Todos key={todo.id} title={todo.title} description={todo.description} />)
        }
    </div>
}

function Todos({ title, description }) {

    return <div>
        <h2>{title}</h2>
        <p>{description}</p>
    </div>
}
