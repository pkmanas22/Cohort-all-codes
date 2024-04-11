
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Signup } from './pages/Signup';
import { Signin } from './pages/Signin';
import { Blogs } from './pages/Blogs';
import { Blog } from './pages/Blog';
import { CreatePost } from "./pages/CreatePost";

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/signup' element={< Signup />} />
          <Route path='/signin' element={< Signin />} />
          <Route path='/new' element={< CreatePost />} />
          <Route path='/' element={< Blogs />} />
          <Route path='/blog/:id' element={< Blog />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
