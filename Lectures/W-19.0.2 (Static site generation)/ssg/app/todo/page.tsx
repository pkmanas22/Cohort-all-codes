import revalidate from "../lib/actions/revalidate";

export default async function Todo() {
    // this is static data
    const res1 = await fetch('https://sum-server.100xdevs.com/todos')

    // Clear cache every 10 seconds
    const res2 = await fetch('https://sum-server.100xdevs.com/todos', {
        next: {
            revalidate: 10
        }
    })

    // Clear cache in a next action
    const res = await fetch('https://sum-server.100xdevs.com/todos', {
        next: {
            tags: ['todos']
        }
    })

    const data = await res.json();
    const todos = data.todos;
    console.log(JSON.stringify(todos))

    revalidate()

    console.log("todos",);
    return <div>
        {todos.map((todo: any) => <div key={todo.id}>
            {todo.title}
            {todo.description}
        </div>)}
    </div>

}