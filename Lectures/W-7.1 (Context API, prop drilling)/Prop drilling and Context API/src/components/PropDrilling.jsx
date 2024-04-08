import { useState } from 'react'

// Main App component
function PropDrilling() {
    // State for count
    const [count, setCount] = useState(0)

    // Rendering Count component with count state and setCount function as props
    return (
        <div>
            <Count count={count} setCount={setCount} />
        </div>
    )
}

// Count component responsible for displaying the count and rendering Buttons component
// Prop drilling: Passing down setCount function from App component to Buttons component through Count component
function Count({ count, setCount }) {
    return (
        <div>
            {/* Displaying the current count */}
            {count}
            {/* Rendering Buttons component with count state and setCount function */}
            <Buttons count={count} setCount={setCount} />
        </div>
    )
}

// Buttons component for increasing and decreasing count
function Buttons({ count, setCount }) {
    return (
        <div>
            {/* Button to increase count */}
            <button onClick={() => {
                setCount(count + 1)
            }}>Increase</button>
            {/* Button to decrease count */}
            <button onClick={() => {
                setCount(count - 1)
            }}>Decrease</button>
        </div>
    )
}

// Exporting the main App component
export default PropDrilling;
