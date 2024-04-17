
import { useNavigate } from 'react-router-dom'
import { BlogCardComponent } from '../components/BlogCardComponent'
import { AppBar } from '../components/AppBar';
import { useEffect, useState } from 'react';
import axios from "axios";
import { backendUrl } from '../utils/backendUrl';
import { AppBarSkeleton, BlogCardSkeleton } from '../components/Skeleton';

type BlogsCardType = {
  id: string,
  title: string,
  content: string,
  author: {
    name: string,
  }
}

export const Blogs = () => {
  const navigate = useNavigate();
  const [publicPosts, setPublicPosts] = useState<BlogsCardType[]>([]);
  const [error, setError] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');

  const fetchPublicPosts = async () => {
    const token = localStorage.getItem("token") || "";
    try {
      const response = await axios.get(`${backendUrl}/posts/published`, {
        headers: {
          Authorization: token,
        },
      });
      // console.log(response);
      const data = await response.data;
      if (data.userName) {
        setUserName(data.userName)
        setLoggedIn(true);
      }
      const allPosts = data.allBlogs;
      setPublicPosts(allPosts);
      // console.log(publicPosts);

    } catch (error) {
      setError("There is something in our backend");
    }
  }

  useEffect(() => {
    fetchPublicPosts();
  }, []);

  if (error) {
    return (
      <>
        <AppBar loggedIn={loggedIn} name={userName} />
        <div className='text-3xl text-center p-4 font-bold flex justify-center'>
          {error}
        </div>
      </>
    );
  }

  if (publicPosts.length <= 0) {
    return (
      <>
        < AppBarSkeleton />
        < BlogCardSkeleton />
        < BlogCardSkeleton />
        < BlogCardSkeleton />
      </>
    );
  }

  return (
    <>
      <AppBar loggedIn={loggedIn} name={userName} />     {/* Blog & Blogs should be same */}

      {
        publicPosts.map((post) => {
          return < BlogCardComponent
            key={post.id}
            title={post.title}
            content={post.content}
            author={post.author.name}
            publishedDate={"Unknown"}
            readingTime={post.content.length / 500}
            onClickFn={() => {
              navigate(`/blog/${post.id}`)
            }}
          />
        })
      }
    </>
  )
}
