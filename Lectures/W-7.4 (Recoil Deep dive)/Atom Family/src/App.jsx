import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { RecoilRoot, useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import { todosAtomFamily } from './atoms'

function App() {
  const [count, setCount] = useState(0)

  return (
    <RecoilRoot>
      <UpdaterComponent />
      <Todos id={2} />
      <Todos id={2} />
      <Todos id={1} />
      <Todos id={2} />
      <Todos id={1} />
      <Todos id={1} />
    </RecoilRoot>
  )
}

function UpdaterComponent() {
  // const updateTodo = useRecoilValue(todosAtomFamily(2));    // does not work as it does not set the value of todo
  // const updateTodo = useSetRecoilState(todosAtomFamily(2));    // it works  
  const [,updateTodo] = useRecoilState(todosAtomFamily(2));     // it also work

  useEffect(() => {
    setTimeout(() => {
      updateTodo({
        id: 1,
        title: "new one",
        description: "new one"
      })
    }, 5000);
  })
}

function Todos({ id }) {
  // const [todo, setTodo] = useRecoilState(todosAtomFamily(id));
  const todo = useRecoilValue(todosAtomFamily(id));
  // both are working 

  return (
    <>
      <h2>{todo.title}</h2>
      <p>{todo.description}</p>
    </>
  )
}

export default App
