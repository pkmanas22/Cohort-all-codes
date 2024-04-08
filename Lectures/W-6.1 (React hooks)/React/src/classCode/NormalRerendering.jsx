import { memo } from "react"
import { useState } from "react"

// Component for demonstrating normal rerendering behavior
export default function NormalRerendering() {
    // State for managing the name
    const [name, setName] = useState("xxx")

    // Function to update the name
    function updateName() {
        setName(Math.random()) // Change the name with a random value
    }

    return (
        <div>
            {/* Button to trigger the update */}
            <button onClick={updateName}>Normal rerendering</button>
            {/* Render multiple MyTag components */}
            <MyTag name={name} />
            <MyTag name={"manas"} />
            <MyTag name={"manas"} />
        </div>
    )
}

// Component to display a tag with a name
function MyTag({ name }) {
    return (
        <>
            {/* Display the name */}
            <h2>my name is {name} </h2>
        </>
    )
}
