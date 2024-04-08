import { useEffect, useMemo, useState } from "react"

// best solution
// using memoization technique
export default function UseMemoQuestion() {
    const [num, setNum] = useState(0);
    const [count, setCount] = useState(0);

    // useMemo
    const sum = useMemo(() => {
        let s = 0;
        for (let i = 0; i <= num; i++) {
            s += i;
        }
        return s;
    }, [num])

    const handleNumChange = (e) => setNum(e.target.value)

    return (
        <div>
            <input type="number" onChange={handleNumChange} />
            <p>Sum is {sum}</p>
            <button onClick={() => setCount(count + 1)}>Count {count}</button>
        </div>
    )
}

// better sollution
/*export default function UseMemoQuestion() {
    const [num, setNum] = useState(0);
    const [sum, setSum] = useState(0);
    const [count, setCount] = useState(0);

    // useEffect
    useEffect(() => {
        let s = 0;
        for (let i = 0; i <= num; i++) {
            s += i;
        }
        setSum(s)
    }, [num])

    const handleNumChange = (e) => setNum(e.target.value)

    return (
        <div>
            <input type="number" onChange={handleNumChange} />
            <p>Sum is {sum}</p>
            <button onClick={() => setCount(count + 1)}>Count {count}</button>
        </div>
    )
}*/


// good solution
/*export default function UseMemoQuestion() {
    const [num, setNum] = useState(0);
    const [count, setCount] = useState(0);

    let sum = 0;
    for (let i = 0; i <= num; i++) {
        sum += i;
    }

    const handleNumChange = (e) => setNum(e.target.value)

    return (
        <div>
            <input type="number" onChange={handleNumChange} />
            <p>Sum is {sum}</p>
            <button onClick={() => setCount(count + 1)}>Count {count}</button>
        </div>
    )
}*/