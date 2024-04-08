
import { useSetRecoilState } from 'recoil'
import { useState } from 'react';
import { todoList } from '../store/atoms';

export default function TodoItemCreator() {
    const [title, setTitle] = useState('');
    const [desc, setDesc] = useState('');

    const setTodoLists = useSetRecoilState(todoList)

    function addTodo() {
        setTodoLists((oldLists) => [
            ...oldLists,
            {
                id: getId(),
                title,
                desc,
                isCompleted: false,
            }
        ]);
        setTitle('');
        setDesc('');
    }

    return (
        <>
            <input type="text" placeholder='Title' value={title} onChange={(e) => setTitle(e.target.value)} />
            <input type="text" placeholder='Description' value={desc} onChange={(e) => setDesc(e.target.value)} />
            <button onClick={addTodo}>Add TODO</button>
        </>
    )
}

let id = 0;
function getId() {
    return id++;
}