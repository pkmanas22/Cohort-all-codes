import { useRecoilState, useSetRecoilState } from "recoil";
import { filterSearchState, todoFilteredState, todoList } from "../store/atoms";


export default function FilteredTodos() {
    const setTodoLists = useSetRecoilState(todoList);
    const [filterSelect, setFilterSelect] = useRecoilState(todoFilteredState)

    const setFilterSearch = useSetRecoilState(filterSearchState);

    function updateFilter(e) {
        // console.log(e.target.value);
        setFilterSelect(e.target.value)
    }

    function updateSearchFilter(e) {
        setFilterSearch(e.target.value);
    }

    return (
        <div>
            <select value={filterSelect} onChange={updateFilter}>
                <option value="Show All">All</option>
                <option value="Show Completed">Completed</option>
                <option value="Show Incompleted">Incompleted</option>
            </select>

            <input type="text" onChange={updateSearchFilter} placeholder="search"/>
        </div>
    )

}