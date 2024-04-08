import { useContext, useMemo, useState } from "react"
import { CountContext } from "./context";
import { RecoilRoot, useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { countAtom, evenSelector } from "./store/atoms/count";    // my atom

function App() {

  return (
    <div>
      <RecoilRoot>    {/* RecoilRoot is mandatory*/}
        <Count />
      </RecoilRoot>
    </div>
  )
}

function Count() {
  console.log("count"); // log only once
  return (
    <div>
      <CountRenderer />
      <Buttons />
      <EvenCounteRenderer />
    </div>
  )
}

// useRecoilValue()
function CountRenderer() {
  const count = useRecoilValue(countAtom);    // only when we require count

  return (
    <div>
      {count}
    </div>
  )
}

// useRecoilState()
/*
function Buttons() {
  const [count, setCount] = useRecoilState(countAtom);    // when we require both count and setcount

  return (
    <div>
      <button onClick={() => {
        setCount(count + 1)
      }}>Increase</button>
      <button onClick={() => {
        setCount(count - 1)
      }}>Decrease</button>
    </div>
  )
}
*/

// useSetRecoilState()
function Buttons() {
  const setCount = useSetRecoilState(countAtom);    // when we don't have count but require setCount
  
  console.log("button re-rendered");
  return (
    <div>
      <button onClick={() => {
        setCount(count => count + 1)
      }}>Increase</button>
      <button onClick={() => {
        setCount(count => count - 1)
      }}>Decrease</button>
    </div>
  )
}

// Normal approach
/*
function EvenCounteRenderer() {
  const count = useRecoilValue(countAtom);
  const isEven = useMemo(() => {
    return count % 2 == 0
  }, [count])
  return (
    isEven ? <div>Number is even</div> : <div></div>
  )
}
*/

// selctor
function EvenCounteRenderer() {
  const isEven = useRecoilValue(evenSelector)

  return (
    isEven ? <div>Number is even</div> : <div></div>
  )
}

export default App