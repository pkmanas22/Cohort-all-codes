
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Signup } from './pages/Signup';
import { Signin } from './pages/Signin';
import { Blogs } from './pages/Blogs';
import { Blog } from './pages/Blog';
import { CreatePost } from "./pages/CreatePost";
import { MyBlogs } from "./pages/MyBlogs";
import { BlogEdit } from "./pages/BlogEdit";

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/signup' element={< Signup />} />
          <Route path='/signin' element={< Signin />} />
          <Route path='/new' element={< CreatePost />} />
          <Route path='/' element={< Blogs />} />
          <Route path='/my-blogs' element={< MyBlogs />} />
          <Route path='/my-blogs/:id' element={< BlogEdit />} />
          <Route path='/blog/:id' element={< Blog />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
