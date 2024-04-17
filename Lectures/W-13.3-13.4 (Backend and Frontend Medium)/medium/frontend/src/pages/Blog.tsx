import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AppBar } from '../components/AppBar';
import { BlogComponent } from '../components/BlogComponent';
import { backendUrl } from '../utils/backendUrl';
import { AppBarSkeleton, BlogPageSkeleton } from '../components/Skeleton';

export type blogType = {
    title: string,
    subTitle: string,
    content: string,
    author: {
        name: string
    },
    bio: string,
    publishedDate: string,
    readingTime: number
}

export const Blog = () => {
    const { id } = useParams();
    const [blog, setBlog] = useState<blogType>();
    const [error, setError] = useState("");
    const [loggedIn, setLoggedIn] = useState(false);
    const [userName, setUserName] = useState('');

    const getPostById = async () => {
        const token = localStorage.getItem("token") || "";
        try {
            const response = await fetch(`${backendUrl}/posts/${id}`, {
                headers: {
                    Authorization: token,
                },
            });
            if (!response.ok) {
                setError('Post not found, Recheck your URL');
            }
            const data = await response.json();

            if (data.userName) {
                setUserName(data.userName)
                setLoggedIn(true);
            }
            if (data.blog) {
                setBlog(data.blog);
            } else {
                setError('Something happens')
            }
        } catch (error) {
            setError("Some Error Occured");
        }
    }

    useEffect(() => {
        getPostById();
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

    if (!blog) {
        return (
            <>
                < AppBarSkeleton />
                < BlogPageSkeleton />
            </>
        );
    }

    return (
        <>
            <AppBar loggedIn={loggedIn} name={userName} />
            <BlogComponent
                title={blog.title}
                subTitle={blog.subTitle || ""}
                content={blog.content}
                author={blog.author.name}
                bio={blog.bio || ""}
                publishedDate={blog.publishedDate || "Unknown"}
                readingTime={blog.content.length / 500}
            />
        </>
    );
};
