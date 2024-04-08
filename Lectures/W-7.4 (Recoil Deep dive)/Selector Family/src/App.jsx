import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { RecoilRoot, useRecoilState } from 'recoil'
import { todosAtomFamily } from './atoms'

function App() {
  const [count, setCount] = useState(0)

  return (
    <RecoilRoot>
      <Todo id={1} />
      <Todo id={2} />
      <Todo id={3} />
      <Todo id={2} />
      <Todo id={2} />
    </RecoilRoot>
  )
}

function Todo({ id }) {
  const [todo, setTodo] = useRecoilState(todosAtomFamily(id));

  return (
    <>
      <h1>{todo.title}</h1>
      <p>{todo.description}</p>
    </>
  )
}

export default App
