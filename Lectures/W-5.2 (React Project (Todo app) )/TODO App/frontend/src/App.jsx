import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { CreateTodo } from './components/CreateTodo'
import { Todos } from './components/Todos'

function App() {
  const[todos, setTodos] = useState([]);

  // This approach tend to fetch multiple times
  fetch("http://localhost:3000/todos")
    .then( async function(res) {
      const jsonData = await res.json();
      // console.log(jsonData);
      setTodos(jsonData.allTodos)
    })



  return (
    <div>
      <CreateTodo />
      <Todos todos={todos} />
    </div>
  )
}

export default App
