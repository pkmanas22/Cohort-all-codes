import { memo } from "react"
import { useState } from "react"

// Component demonstrating the usage of memoization
export default function UsingMemoization() {
    // State for managing the name
    const [name, setName] = useState("xxx")

    // Function to update the name
    function updateName() {
        setName(Math.random()) // Change the name with a random value
    }

    return (
        <div>
            {/* Button to trigger the update */}
            <button onClick={updateName}>Using memoization</button>
            {/* Render multiple MyTag components */}
            <MyTag name={name} />
            <MyTag name={"manas"} />
            <MyTag name={"manas"} />
            <MyTag name={"manas"} />
            <MyTag name={"manas"} />
            <MyTag name={"manas"} />
        </div>
    )
}

// Memoized component to display a tag with a name
const MyTag = memo(function ({ name }) {
    return (
        <>
            {/* Display the name */}
            <h2>my name is {name} </h2>
        </>
    )
})
