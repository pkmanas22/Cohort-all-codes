import { atomFamily } from "recoil";
import { TODOS } from "./todos";

// Returns a function that returns a writeable RecoilState atom.
export const todosAtomFamily = atomFamily({
    key: 'todosFamily',
    default: id => {            // takes id as input
        // return TODOS.find(todo => todo.id === id);
        let foundTodo = null;
        for (let i = 0; i < TODOS.length; i++) {
            if (TODOS[i].id == id) {
                foundTodo = TODOS[i];
            }
        }
        return foundTodo;
    }
})