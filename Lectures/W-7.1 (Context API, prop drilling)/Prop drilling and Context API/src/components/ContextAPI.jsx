import { useState } from "react"
import { CountContext } from "./context";
import { useContext } from "react";

export default function ContextAPI() {
    const [count, setCount] = useState(0)

    // Context API Doesn’t fix re-rendering, only fixes prop drilling
    // wrap anyone that wants to use the teleported value
    return (
        <div>
            <CountContext.Provider value={count}>   {/* 1st part */}
                <Count count={count} setCount={setCount} />
            </CountContext.Provider>
        </div>
    )
}

function Count({setCount }) {
    return (
        <div>
            <CountRenderer />
            <Buttons setCount={setCount} />
        </div>
    )
}

function CountRenderer() {
    const count = useContext(CountContext);     // 2nd part

    return (
        <div>
            {count}
        </div>
    )
}

function Buttons({ setCount }) {
    const count = useContext(CountContext);
    return (
        <div>
            <button onClick={() => {
                setCount(count + 1)
            }}>Increase</button>
            <button onClick={() => {
                setCount(count - 1)
            }}>Decrease</button>
        </div>
    )
}