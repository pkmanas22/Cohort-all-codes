import React, { useEffect, useState } from 'react';

function useDebounce(value, time) {
    const [newValue, setNewValue] = useState(value)

    useEffect(() => {
        let timeOutId = setTimeout(() => {
            setNewValue(value);
        }, time);
        
        return () => clearTimeout(timeOutId)
    },[value, time])

    return newValue;
}

export const UseDebouncingHook = () => {
    const [inputValue, setInputValue] = useState('');
    const debouncedValue = useDebounce(inputValue, 1000); // 500 milliseconds debounce delay

    // Use the debouncedValue in your component logic, e.g., trigger a search API call via a useEffect

    return (
        <>
            Debounced value is {debouncedValue}
            <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Search..."
            />
        </>
    );
};