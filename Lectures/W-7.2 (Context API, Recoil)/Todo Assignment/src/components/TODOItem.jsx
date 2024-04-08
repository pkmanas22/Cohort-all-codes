import { useRecoilState } from "recoil"
import { todoList } from "../store/atoms"


export default function TODOItem({ todo }) {
    const [todoLists, setTodoLists] = useRecoilState(todoList);

    const index = todoLists.findIndex(listItem => listItem === todo);

    function deleteItem() {
        setTodoLists(() => {
            return [...todoLists.slice(0, index), ...todoLists.slice(index + 1)]
        })
    }

    function toggleItem() {
        const newItem = {
            ...todo,
            isCompleted: !todo.isCompleted,
        }
        setTodoLists(() => {
            return [...todoLists.slice(0, index), newItem, ...todoLists.slice(index + 1)]
        })
    }

    return (
        <div style={{ padding: '15px', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px' }}>
            <div style={{ border: '1px solid black', padding: '5px', width: '500px' }}>
                <h3>{todo.title}</h3>
                <p>{todo.desc}</p>
            </div>
            <input type="checkbox" onChange={toggleItem} checked={todo.isCompleted} name="" id="" />
            <button onClick={deleteItem}>X</button>
        </div>
    )
}