import { useCallback, useEffect, useRef, useState } from 'react'


export default function UseRefExample() {
    const divRef = useRef()

    useEffect(() => {
        setTimeout(() => {
            divRef.current.innerHTML = 10
        }, 5000);
    }, [])

    const incomeTax = 20000;

    return (
        <div>
            <h2>UseRef</h2>
            hi there, your income tax returns are <div ref={divRef}>{incomeTax}</div>
        </div>
    )
}


// ugly way
/*export default function UseRefExample() {

    useEffect(() => {
        setTimeout(() => {
            document.getElementById('incValue').innerHTML = 20
        }, 5000);
    }, [])

    const incomeTax = 20000;

    return (
        <div>
            <h2>UseRef</h2>
            hi there, your income tax returns are <div id='incValue'>{incomeTax}</div>
        </div>
    )
}*/