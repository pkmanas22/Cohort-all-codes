import { useEffect, useState } from "react";


function useMousePointer() {
    const [position, setPosition] = useState({x:0, y:0});

    const handleMouseMove = (e) => {
        setPosition({ x: e.clientX, y: e.clientY })
    }

    useEffect(() => {
        window.addEventListener('mousemove', handleMouseMove);
    }, [])

    return position;
}

export default function UseMousePointerHook() {
    const mousePointer = useMousePointer();

    return (
        <>
            {/* <div style={{ width: '20px', height: '20px', backgroundColor: 'red', position: 'absolute', top: mousePointer.y, left: mousePointer.x }}></div> */}
            <div>Your mouse position is {mousePointer.x} and {mousePointer.y}</div>
        </>
    )
}