/* eslint-disable react/jsx-key */

import axios from 'axios';

/*
todos = [
    {
        title: ,
        desc: ,
    },
    {
        title: ,
        desc: ,
    }
]
*/
//  give todos as object destructing
export function Todos({todos}) {
    const myTodos = todos.slice().reverse()
    return(
        <div>
            {myTodos.map(function (todo) {
                return <div>
                    <h1>{todo.title}</h1>
                    <p>{todo.desc}</p>
                    <button onClick={ async () => {
                        /*
                        fetch('http://localhost:3000/completed', {
                            method: "PUT",
                            body: JSON.stringify({
                                id: todo._id
                            }),
                            headers: {
                                "Content-Type": "application/json"
                            }
                        })
                        */

                        // axios
                        const response = await axios.put('http://localhost:3000/completed', {
                            id: todo._id
                        })
                        alert(response.data.msg);

                    }}>{todo.isCompleted ? "Completed" : "Mark as Complete"}</button>
                </div>
            })}
        </div>
    )
}