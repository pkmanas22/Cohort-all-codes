import { useEffect, useState } from "react";

const useDebounceHook = (inputValue: string): string => {
  const [debounceValue, setDebounceValue] = useState(inputValue);

  const timeOut: number = 0;
  useEffect(() => {
    clearTimeout(timeOut);
    setTimeout(() => {
      setDebounceValue(inputValue)
    }, 800);
  }, [inputValue, timeOut]);

  return debounceValue;
}

export default useDebounceHook;