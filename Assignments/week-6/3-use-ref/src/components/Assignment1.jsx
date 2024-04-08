import { useEffect, useRef } from "react";

// Create a component with a text input field and a button. When the component mounts or the button is clicked, automatically focus the text input field using useRef.

export function Assignment1() {
    const inputField = useRef();

    // For component mount i.e. when start
    useEffect(() => {
        inputField.current.focus()
    }, []);

    // for clicking
    const handleButtonClick = () => {
        inputField.current.focus()
    };

    return (
        <div>
            <input type="text" ref={inputField} placeholder="Enter text here" />
            <button onClick={handleButtonClick}>Focus Input</button>
        </div>
    );
};
