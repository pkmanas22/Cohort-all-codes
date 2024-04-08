import { useState } from "react"

// Initial global ID for todos
let globalId = 4;

// Component for managing TODO app using keys
export default function TODOAppUsingKeys() {
    // State to manage todos
    const [todos, setTodos] = useState([
        {
            id: 1,
            title: "Gym",
            description: "At 7 PM",
        },
        {
            id: 2,
            title: "fdfds",
            description: "At 9 PM",
        },
        {
            id: 3,
            title: "fferer",
            description: "At 3 PM",
        },
    ]);

    // Function to add a new todo
    function addTodo() {
        // Incrementing globalId
        console.log(globalId);
        // Adding new todo to todos array
        setTodos([...todos, {
            id: globalId + 1,
            title: "fffdfefewerer",
            description: "At 0 PM",
        }]);
        // Incrementing globalId for next todo
        globalId++;
    }

    return (
        <div>
            {/* Button to add a new todo */}
            <button onClick={addTodo}>Add TODO</button>
            {/* Rendering todos */}
            {todos.map(todo => <TODO key={todo.id} title={todo.title} description={todo.description} />)}
        </div>
    );
}

// Component for rendering an individual TODO
function TODO({ title, description }) {
    return (
        <>
            <h1>{title}</h1>
            <p>{description}</p>
        </>
    );
}
