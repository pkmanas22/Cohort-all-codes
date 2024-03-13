import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [name, setName] = useState('')
  const [isWish, setIsWish] = useState(false)

  let timeOut;
  function handleName(e) {
    clearTimeout(timeOut)
    timeOut = setTimeout(() => {
      setName(e.target.value)
    }, 1000);
  }

  function showWishes() {
    setIsWish(true)
  }

  // console.log(name);

  return (
    <>
      <div className='inputDiv'>
        <h1>Enter your name</h1>
        <input onChange={handleName} type="text" placeholder='Enter your name' />
        <br />
        <button onClick={showWishes}>Done</button>
      </div>

      {isWish ? < BirthdayWishCard name={name} /> : "Enter name first"}

    </>
  )
}

function BirthdayWishCard({ name }) {
  const birthdayWishes = [
    "Happy Birthday, {name}! May your day be filled with joy and laughter.",
    "Wishing you, {name}, a fantastic birthday filled with love and happiness.",
    "Sending warm wishes to {name} on their special day. Happy Birthday!",
    "May this year be the best one yet for {name}! Happy Birthday!",
    "Here's to another year of amazing adventures for {name}. Happy Birthday!",
    "May {name}'s birthday be as wonderful as they are. Happy Birthday!",
  ];



  return (
    <>
      {birthdayWishes.map((wish, index) => (
        <div key={index} className='wishCard'>
          {wish.replace('{name}', name)}
        </div>
      ))}
    </>
  )
}

export default App
