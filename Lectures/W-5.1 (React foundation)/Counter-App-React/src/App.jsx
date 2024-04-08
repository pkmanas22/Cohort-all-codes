import { useState } from "react"


function App() {
  const [count, setCount] = useState(0);
  // console.log(count);
  // console.log(setCount);

  function increaseCount() {
    setCount(count + 1)
  }
  return (
    <div>
      <button onClick={increaseCount}>Counter {count}</button>
      <button onClick={function () { setCount(count + 1) }}>Counter {count}</button>
      <h2>Custom Button</h2>
      <CustomButton count={count} setCount={setCount}></CustomButton>
      <CustomButton count={count+10} setCount={setCount}></CustomButton>
      <CustomButton count={count-10} setCount={setCount}></CustomButton>
      <CustomButton count={count*10} setCount={setCount}></CustomButton>
      <h2>Different Button</h2>
      <DifferentButton />
      <DifferentButton />
      <DifferentButton />
    </div>
  )
}

// Component
function CustomButton(props) {
  function increaseCount() {
    props.setCount(props.count + 1)
  }
  return (
    <div>
      <button onClick={increaseCount}>Counter {props.count}</button>
    </div>
  )
}

// another component
function DifferentButton() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <button onClick={() => { setCount(count + 1) }}>Counter {count}</button>
    </div>
  )
}


export default App
