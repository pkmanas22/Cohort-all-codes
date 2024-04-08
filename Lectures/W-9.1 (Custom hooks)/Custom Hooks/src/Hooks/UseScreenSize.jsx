import { useEffect, useState } from "react";


function useScreenSize() {
    const [size, setSize] = useState({
        width: window.innerWidth,
        height: window.innerHeight,
    });

    const handleScreenSize = () => {
        setSize({
            width: window.innerWidth,
            height: window.innerHeight,
        })
    }

    useEffect(() => {
        window.addEventListener('resize', handleScreenSize);
    }, [])

    return size;
}

export default function UseScreenSizeHook() {
    const screenSize = useScreenSize();

    return (
        <>
            <div>Your screen size is {screenSize.width}px and {screenSize.height}px</div>
        </>
    )
}