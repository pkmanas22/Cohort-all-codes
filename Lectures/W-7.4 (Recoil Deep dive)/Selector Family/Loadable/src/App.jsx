import { Suspense, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { RecoilRoot, useRecoilState, useRecoilStateLoadable, useRecoilValue, useRecoilValueLoadable } from 'recoil'
import { todosAtomFamily } from './atoms'

function App() {

  // another is using suspense
  /*return (
    <RecoilRoot>
      <Suspense fallback="loading...">
        <SuspenseTodo id={1} />
        <SuspenseTodo id={2} />
        <SuspenseTodo id={1} />
      </Suspense>
    </RecoilRoot>
  )*/

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
  const [todo,] = useRecoilStateLoadable(todosAtomFamily(id));     // useRecoilStateLoadable()
  // const todo = useRecoilValueLoadable(todosAtomFamily(id));     // useRecoilValueLoadable()

  /*{
    console.log(todo);
    contents :  Promise {<fulfilled>: {…}} || {id: 2, title: 'Todo 2', description: 'This is todo 2', completed: false}
    state :  "loading" || "hasValue"
  }*/

  if (todo.state === 'loading') {
    return <div>Loading...</div>
  }
  if (todo.state === 'hasValue') {
    return (
      <>
        <h1>{todo.contents.title}</h1>
        <p>{todo.contents.description}</p>
      </>
    )
  }
  if (todo.state === 'hasError') {
    return <div>Unable to fetch from server</div>
  }
}


function SuspenseTodo({ id }) {
  const todo = useRecoilValue(todosAtomFamily(id));
  return (
    <>
      <h1>{todo.title}</h1>
      <p>{todo.description}</p>
    </>
  )
}

export default App
