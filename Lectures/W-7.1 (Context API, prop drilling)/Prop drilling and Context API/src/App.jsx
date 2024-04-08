import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import PropDrilling from './components/PropDrilling'
import ContextAPI from './components/ContextAPI'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <PropDrilling />
      <ContextAPI />
    </div>
  )
}

export default App
