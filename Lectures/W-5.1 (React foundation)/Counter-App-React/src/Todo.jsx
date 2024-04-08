import { useState } from "react";

let todoData = [
    {
        "title": "Go to Gym",
        "desc": "Go to gym at 7 PM",
        "isCompleted": false,
    },
    {
        "title": "Do React revision",
        "desc": "React revision at 9 PM",
        "isCompleted": false,
    },
    {
        "title": "Go to College",
        "desc": "Go to college at 9 AM",
        "isCompleted": true,
    }
]

function Todo(params) {
    const [todos, setTodos] = useState(todoData)


    function addTodo() {
        const title = prompt("Enter title")
        const desc = prompt("Enter description")

        setTodos([{
            title,
            desc,
            isCompleted: false
        }, ...todos])
    }

    function updateTodo(index) {
        setTodos(prevTodos => {
            // console.log(prevTodos);
            const updatedTodos = [...prevTodos];
            updatedTodos[index].isCompleted = true;
            return updatedTodos;
        })
    }

    return (
        <>
            <h1>Todo App</h1>
            <button onClick={addTodo}>Add Todo</button>
            {todos.map((todo, index) => (
                <MyTodo
                    key={index}
                    title={todo.title}
                    desc={todo.desc}
                    isCompleted={todo.isCompleted}
                    onUpdate={() => { updateTodo(index) }} />
            ))}

        </>
    )
}


function MyTodo(props) {

    return (
        <div>
            <h3>{props.title}</h3>
            <p>{props.desc}</p>
            <button onClick={props.onUpdate}>{props.isCompleted ? "Done" : "Mark as done"}</button>
        </div>
    )
}

export default Todo;