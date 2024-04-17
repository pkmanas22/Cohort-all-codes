
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

export const MyBlogs = () => {
    const navigate = useNavigate();
    const [myPosts, setMyPosts] = useState<BlogsCardType[]>([]);
    const [error, setError] = useState("");
    const [userName, setUserName] = useState('');

    const fetchMyPosts = async () => {
        const token = localStorage.getItem("token") || "";
        try {
            const response = await axios.get(`${backendUrl}/posts/myblogs`, {
                headers: {
                    Authorization: token,
                },
            });
            // console.log(response);
            const data = await response.data;
            if (data.userName) {
                setUserName(data.userName)
            }
            const allPosts = data.allBlogs;
            setMyPosts(allPosts);
            // console.log(myPosts);

        } catch (error) {
            setError("There is something in our backend");
        }
    }

    useEffect(() => {
        fetchMyPosts();
    }, []);

    if (error) {
        return (
            <>
                <AppBar loggedIn={true} name={userName} />
                <div className='text-3xl text-center p-4 font-bold flex justify-center'>
                    {error}
                </div>
            </>
        );
    }

    if (myPosts.length <= 0) {
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
            <AppBar loggedIn={true} name={userName} />     {/* Blog & Blogs should be same */}
            <div className='text-3xl text-center text-red-700 p-3 font-bold'>
                Click on the blog card for updating the blog
            </div>
            {
                myPosts.map((post) => {
                    return < BlogCardComponent
                        key={post.id}
                        title={post.title}
                        content={post.content}
                        author={post.author.name}
                        publishedDate={"Unknown"}
                        readingTime={post.content.length / 500}
                        onClickFn={() => {
                            navigate(`/my-blogs/${post.id}`)
                        }}
                    />
                })
            }
        </>
    )
}
