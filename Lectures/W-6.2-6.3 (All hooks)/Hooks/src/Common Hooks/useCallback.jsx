import { memo, useCallback, useState } from "react";

export default function UseCallback() {
  const [count, setCount] = useState(0);

  // useCallback hook is used to memoize a function, preventing it from being recreated
  // on each render unless its dependencies change.
  const onClick = useCallback(() => {
    console.log("child clicked");
  }, []); // Empty dependency array means the function doesn't depend on any external value.

  return (
    <div>
      {/* Child component is rendered here */}
      <Child onClick={onClick} />

      {/* Button to increment count */}
      <button
        onClick={() => {
          setCount(count + 1);
        }}
      >
        Click me {count}
      </button>
    </div>
  );
}

// Child component is memoized using React.memo to prevent unnecessary re-renders.
const Child = memo(({ onClick }) => {
  console.log("child render");

  return (
    <div>
      {/* Button with onClick handler passed from the parent */}
      <button onClick={onClick}>Button clicked</button>
    </div>
  );
});
