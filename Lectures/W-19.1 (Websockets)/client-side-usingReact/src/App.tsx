import { useEffect, useState } from 'react'
import './App.css'

// For next project the component should be client side. "use client"

/*
function App() {
  const [socket, setSocket] = useState<null | WebSocket>(null);
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState<string[]>([]);

  useEffect(() => {
    const socket = new WebSocket('ws://localhost:8080');

    socket.onerror = (e: any) => {
      console.log(e)
    }

    socket.onopen = () => {
      // console.log('connected');
      // socket.send("Hello from server");
      setSocket(socket);
    }

    socket.onmessage = (msg) => {
      // console.log(msg.data);
      setChat(chat => [...chat, msg.data])
    }

    return () => {
      socket.close()
    }
  }, [])

  if (!socket) {
    return (
      <div>
        Connecting to server...
      </div>
    )
  }
  console.log(chat)

  return (
    <div>
      <div>
        {chat.map((msg, index) => {
          return <div key={index}>{msg}</div>
        })}
      </div>
      <div>
        <input type="text" onChange={(e) => {
          setMessage(e.target.value)
        }} />
        <button onClick={() => {
          socket.send(message)
        }}>Send</button>
      </div>
    </div>
  )
}

export default App
*/


// using custom hook useSocket()
function useSocket () {
  const [socket, setSocket] = useState<null | WebSocket>(null);

  useEffect(() => {
    const socket = new WebSocket('ws://localhost:8080');

    socket.onerror = (e: any) => {
      console.log(e)
    }

    socket.onopen = () => {
      // console.log('connected');
      // socket.send("Hello from server");
      setSocket(socket);
    }

    return () => {
      socket.close()
    }
  }, [])

  return socket;
}

function App() {
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState<string[]>([]);

  const socket = useSocket();
  
  useEffect(() => {
    if (!socket) return;

    socket.onmessage = (msg) => {
      // console.log(msg.data);
      setChat(chat => [...chat, msg.data])
    }

    return  () => {
      socket.onmessage = null;
    }
  }, [socket])

  if (!socket) {
    return (
      <div>
        Connecting to server...
      </div>
    )
  }
  console.log(chat)

  return (
    <div>
      <div>
        {chat.map((msg, index) => {
          return <div key={index}>{msg}</div>
        })}
      </div>
      <div>
        <input type="text" onChange={(e) => {
          setMessage(e.target.value)
        }} />
        <button onClick={() => {
          socket.send(message)
        }}>Send</button>
      </div>
    </div>
  )
}

export default App


