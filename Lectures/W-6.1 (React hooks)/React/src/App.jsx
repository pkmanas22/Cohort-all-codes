import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import ReduceRerender from './classCode/ReduceRerender'
import UsingMemoization from './classCode/memoization'
import NormalRerendering from './classCode/NormalRerendering'
import TODOAppUsingKeys from './classCode/TODOAppUsingKeys'
import WrapperComponents from './classCode/WrapperComponents'
import UseEffectExample from './classCode/UseEffect'

function App() {

  return (
    <>
      <UseEffectExample />
      <WrapperComponents />
      <TODOAppUsingKeys />
      <NormalRerendering />
      <UsingMemoization />
      <ReduceRerender />
    </>
  )
}

export default App
