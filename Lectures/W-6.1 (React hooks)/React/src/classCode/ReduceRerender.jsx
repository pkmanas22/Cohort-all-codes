import { useState } from 'react'

// Main component for demonstrating reducing rerenders
export default function ReduceRerender() {
    return (
        <>
            {/* Render HeaderWithBtn component */}
            <HeaderWithBtn />

            {/* Render multiple Header components */}
            <Header count={"Ramans"}></Header>
            <Header count={"Ramans1"}></Header>
            <Header count={"Ramans2"}></Header>
            <Header count={"Ramans3"}></Header>
            <Header count={"Ramans4"}></Header>
        </>
    )
}

// Component with a button to update the name
function HeaderWithBtn() {
    // State for managing the count/name
    const [count, setCount] = useState("manas")

    // Function to update the name
    function updateName() {
        setCount(Math.random()) // Change the count with a random value
    }

    return (
        <div>
            {/* Button to trigger the update */}
            <button onClick={updateName}>Click to change name</button>
            {/* Render Header component with the updated count */}
            <Header count={count}></Header>
        </div>
    )
}

// Header component to display the name/count
function Header({ count }) {
    return (
        <>
            {/* Display the count */}
            <p>MY name is {count}</p>
        </>
    )
}
