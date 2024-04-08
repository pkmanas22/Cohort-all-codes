import React, { Suspense, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom'
// import Dashboard from './components/Dashboard'
// import Landing from './components/Landing'
import Topbar from './components/Topbar'

// Lazy loading
const Dashboard = React.lazy(() => import('./components/Dashboard'))
const Landing = React.lazy(() => import('./components/Landing'))

// Main App component
function App() {

  // for using lazy loading we have ot call suspense API i.e. asynchronous data fetching
  return (
    <>
      {/* Rendering Topbar component */}
      <Topbar />
      {/* <button onClick={() => {
        window.location.href = '/'
      }}>Landing page</button>

      <button onClick={() => {
        window.location.href = '/dashboard'
      }}>Dashboard page</button> */}

      {/* Client side routing using BrowserRouter */}
      <BrowserRouter>
        {/* Rendering Appbar component for navigation */}
        <Appbar />        {/* must be inside <BrowserRouter>*/}

        {/* Defining routes */}
        <Routes>
          <Route path='/dashboard' element={<Suspense fallback={"Loading..."}><Dashboard /></Suspense>} />
          <Route path='/' element={<Suspense fallback={"Loading..."}><Landing /></Suspense>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

// Appbar component for navigation
function Appbar() {
  // Using useNavigate for navigation
  const navigate = useNavigate();
  return (
    <div>
      <button onClick={() => {
        navigate("/")
      }}>Landing page</button>
      <button onClick={() => {
        navigate('/dashboard')
      }}>Dashboard page</button>
    </div>
  )
}

// Exporting the main App component
export default App
