
import { useEffect, useState } from 'react';

function useInterval(callback, time) {

    useEffect(() => {
        const intervalId = setInterval(callback, time * 1000);

        return () => {
            clearInterval(intervalId);
        }
    }, [callback, time])
}

export default function UseIntervalHook() {
    const [count, setCount] = useState(0);

    useInterval(() => {
        setCount(c => c + 1);
    }, 0.5)

    return (
        <>
            Timer is at {count}
        </>
    )
}