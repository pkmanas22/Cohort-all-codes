import axios from "axios";
import { atomFamily, selectorFamily } from "recoil";

// Returns a function that returns a read-only RecoilValueReadOnly or writeable RecoilState selector.

/*export const todosAtomFamily = atomFamily({
    key: 'todosAtomFamily',
    default: selectorFamily({
        key: 'selector family',
        get: (id) => async ({ get }) => {
            const res = await axios.get('https://sum-server.100xdevs.com/todo?id=' + id);
            return res.data.todo;
        }
    })
})*/

// easier way to understand
export const todosAtomFamily = atomFamily({
    key: 'todosAtomFamily',
    default: selectorFamily({
        key: 'selector family',
        get: function (id) {
            return async function () {
                const res = await axios.get('https://sum-server.100xdevs.com/todo?id=' + id);
                return res.data.todo;
            }
        }
        // this return an async functin which return todo json data
    })
})