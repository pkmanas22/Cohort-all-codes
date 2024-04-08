import { useRecoilValue } from "recoil";
import { todoListsStatsState } from "../store/atoms";

export default function TodoListsStats() {

    const allValue = useRecoilValue(todoListsStatsState);
    return (
        <div>
            <p>Total : {allValue.totalTodos}</p>
            <p>Completed : {allValue.completedTodos}</p>
            <p>Incompleted : {allValue.incompletedTodos}</p>
            <p>Percentage : {allValue.percentageCompleted.toFixed(2)}%</p>
        </div>
    )
}