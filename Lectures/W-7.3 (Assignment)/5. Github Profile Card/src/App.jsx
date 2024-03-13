import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import GithubCard from './GithubCard'
import { useRecoilState } from 'recoil'
import { userAtom } from './atom'
import axios from 'axios'

function App() {
  const [userName, setUserName] = useState('')

  const [user, setUser] = useRecoilState(userAtom);

  let timeOut;
  const changeInput = (e) => {
    clearTimeout(timeOut);
    timeOut = setTimeout(() => {
      setUserName(e.target.value)
    }, 1000);
  }

  console.log("Outside function");

  async function generateUser() {
    setUser({})
    try {
      const res = await axios.get(`https://api.github.com/users/${userName}`);
      setUser(res.data);
    } catch (error) {
      // alert("Error while fetching data")
      // console.error("Error fetching user data:", error);
    }
  }
  console.log(user);


  return (
    <>
      <h1>Github Profile Card Generator</h1>
      <div>
        <input type="text" onChange={changeInput} placeholder='Enter your github user ID' />
        <button onClick={generateUser} >Generate Profile</button>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '20px' }}>
        {< GithubCard user={user} />}
      </div>
    </>
  )
}



export default App
