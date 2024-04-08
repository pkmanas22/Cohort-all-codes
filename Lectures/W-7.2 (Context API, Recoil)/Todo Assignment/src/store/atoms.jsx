import { atom, selector } from "recoil";

export const todoList = atom({
    key: 'todoLists',
    default: [{
        id: 1,
        title: 'Finish coding assignment',
        desc: 'Write JavaScript code for the assignment',
        isCompleted: false,
    },
    {
        id: 2,
        title: 'Go to the gym',
        desc: 'Work out for an hour',
        isCompleted: true,
    },
    {
        id: 3,
        title: 'Buy groceries',
        desc: 'Buy fruits, vegetables, and milk',
        isCompleted: false,
    },
    {
        id: 4,
        title: 'Read a book',
        desc: 'Read the latest novel from your favorite author',
        isCompleted: false,
    },
    {
        id: 5,
        title: 'Prepare for presentation',
        desc: 'Gather information and create slides for the presentation',
        isCompleted: false,
    },
    {
        id: 6,
        title: 'Call Mom',
        desc: 'Catch up with your mom and ask how she is doing',
        isCompleted: false,
    }]
})

export const todoFilteredState = atom({
    key: 'todoFilteredState',
    default: 'Show All'
})

export const filterSearchState = atom({
    key: 'filterSearchState',
    default: '',
})

export const filteredTodosList = selector({
    key: 'filteredTodosState',
    get: ({ get }) => {
        const filter = get(todoFilteredState);
        const myList = get(todoList);

        const search = get(filterSearchState);
        const list = myList.filter((item) => (item.desc.toLowerCase().includes(search.toLowerCase()) || item.title.toLowerCase().includes(search.toLowerCase())))

        switch (filter) {
            case 'Show Completed':
                return list.filter((item) => item.isCompleted)
            case 'Show Incompleted':
                return list.filter((item) => !item.isCompleted)
            default:
                return list;
        }
    }
})


export const todoListsStatsState = selector({
    key: 'todoListsStats',
    get: ({ get }) => {
        const totalTodos = get(todoList).length;
        const completedTodos = get(todoList).filter(item => item.isCompleted).length;
        const incompletedTodos = totalTodos - completedTodos;
        const percentageCompleted = (totalTodos === 0) ? 0 : (completedTodos / totalTodos) * 100;

        return {
            totalTodos,
            completedTodos,
            incompletedTodos,
            percentageCompleted
        }
    }
})