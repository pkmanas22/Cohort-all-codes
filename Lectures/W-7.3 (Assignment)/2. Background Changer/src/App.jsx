import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [color, setColor] = useState('')

  useEffect(() => {
    document.body.style.background = color;
  }, [color])
  
  const changeBG = (e) => {
    setColor(e.target.innerText.toLowerCase())
  }

  return (
    <div className='spanContainer'>
      <span onClick={changeBG}>Red</span>
      <span onClick={changeBG}>Yellow</span>
      <span onClick={changeBG}>Purple</span>
      <span onClick={changeBG}>Green</span>
      <span onClick={changeBG}>Blue</span>
      <span onClick={changeBG}>Orange</span>
    </div>
  )
}

export default App
