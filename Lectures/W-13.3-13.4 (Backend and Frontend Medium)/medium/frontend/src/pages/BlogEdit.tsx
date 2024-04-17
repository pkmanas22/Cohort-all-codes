import { useEffect, useState } from "react";
import { AppBar } from "../components/AppBar"
import { useNavigate, useParams } from "react-router-dom";
import useDebounceHook from "../utils/debounceHook";
import { updatePostType } from "@manaskp/commonmedium";
import axios from "axios";
import { backendUrl } from "../utils/backendUrl";
import { blogType } from "./Blog";
import { AppBarSkeleton, CreateCardSkeleton } from "../components/Skeleton";

interface Extendedblog extends blogType {
    published: boolean
}

export const BlogEdit = () => {
    const { id } = useParams();
    const [blog, setBlog] = useState<Extendedblog>();
    const [error, setError] = useState("");
    const [loggedIn, setLoggedIn] = useState(false);
    const [userName, setUserName] = useState('');

    const [tempTitle, setTempTitle] = useState("");
    const [tempContent, setTempContent] = useState("");
    // const [subtitle, setSubtitle] = useState("");
    const navigate = useNavigate();

    const title = useDebounceHook(tempTitle);
    const content = useDebounceHook(tempContent);
    const [published, setPublished] = useState<boolean>();
    // const subtitle = useDebounceHook(subtitle);

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
                setError('Something wrong happens')
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
                < CreateCardSkeleton />
            </>
        )
    }


    const updatePostBody: updatePostType = {
        title,
        content,
        published
    }

    const handleFormUpdate = async () => {
        setError("");
        // console.log("hi");

        const token = localStorage.getItem("token");

        await axios.patch(`${backendUrl}/posts/${id}`, updatePostBody, {
            headers: {
                Authorization: token,
            }
        })
            .then((response) => {
                // console.log(response.data);
                const blogId = response.data.id;
                alert("Blog updated successfully");
                navigate(`/blog/${blogId}`);
            })
            .catch((err) => {
                // console.log(err.response.data);
                setError(err.response.data)
            })
    }
    return (
        <>
            <AppBar loggedIn={true} name={blog?.author.name || ""} />      {/* Always true */}

            {error && <div className="font-bold text-center text-red-800 rounded-lg bg-red-50">
                <div>{error}</div>
            </div>}

            <div className="flex items-center my-2">
                <div className="flex-1 border-t-2 border-gray-200"></div>
                <span className="px-3 text-green-700 font-semibold bg-white">Click on the left side icon for updating changes</span>
                <div className="flex-1 border-t-2 border-gray-200"></div>
            </div>

            <div className='p-8 grid grid-cols-12 w-full'>
                <div onClick={handleFormUpdate} className='flex text-xl col-span-2 justify-end p-2 border-r-2'>
                    <svg xmlns="http://www.w3.org/2000/svg" className="cursor-pointer " width="50" height="50" fill="gray" shape-rendering="geometricPrecision" text-rendering="geometricPrecision" image-rendering="optimizeQuality" fill-rule="evenodd" clip-rule="evenodd" viewBox="0 0 512 486.46"><path d="M70.61 106.63c70.08 23.44 184.92 23.44 255 0 28.41-9.5 45.98-20.99 45.98-32.21 0-11.22-17.57-22.71-45.98-32.21-70.61-23.45-184.38-23.42-255 0-60.22 20.13-61.9 43.74 0 64.42zm303.38 275.91c4.1.54 6.99 4.42 6.45 8.65-.53 4.22-4.3 7.2-8.39 6.65l-8.5-1.14c4.38 7.26 10.16 12.55 16.58 15.91a39.648 39.648 0 0 0 21.62 4.42c7.33-.58 14.53-3.2 20.66-7.79 8.06-6.03 14.37-15.53 16.93-28.37.82-4.18 4.78-6.87 8.82-6.02 4.05.85 6.66 4.93 5.84 9.1-3.38 16.97-11.87 29.65-22.78 37.81a54.425 54.425 0 0 1-28.35 10.7c-10.04.8-20.3-1.19-29.55-6.05-8.25-4.33-15.7-10.92-21.44-19.82l-1.42 6.54c-.89 4.16-4.88 6.79-8.92 5.87-4.03-.91-6.58-5.03-5.69-9.19l5.26-24.27c.7-4.04 4.37-6.84 8.35-6.31l24.53 3.31zm73.42-57.75c.89-4.16 4.89-6.78 8.92-5.87 4.03.92 6.58 5.04 5.69 9.2l-5.38 24.82c-.85 3.96-4.54 6.54-8.37 5.97l-24.18-3.23c-4.09-.53-7-4.4-6.48-8.62.51-4.23 4.26-7.21 8.36-6.68l8.21 1.09c-4.15-7.06-9.68-12.27-15.85-15.69l-.37-.19c-6.59-3.57-13.97-5.13-21.24-4.73-7.23.39-14.38 2.77-20.56 7.06-8.58 5.96-15.35 15.71-18.03 29.16-.83 4.17-4.78 6.87-8.83 6.02-4.05-.86-6.66-4.93-5.84-9.11 3.56-17.8 12.69-30.83 24.31-38.9a54.422 54.422 0 0 1 28.18-9.66c9.89-.55 19.95 1.6 28.99 6.49l.42.25c7.95 4.39 15.08 10.89 20.56 19.52l1.49-6.9zm-5.79-136.65c-1.04-.94-2.5-1.57-3.96-1.57-.31 0-.63 0-.94.11H299.01c-7.22 0-13.13 5.91-13.13 13.14v273.43c0 7.24 5.89 13.13 13.13 13.13h199.85c7.24 0 13.14-5.89 13.14-13.13V263.21c0-2.66-.3-4.46-1.78-5.94l-67.87-68.72c-.21-.2-.31-.3-.52-.41h-.21zm-18.46 15.73v47.34c0 13.72 13.24 24.7 25.03 24.7h46.75v191.93c.01.61-.55 1.45-1.36 1.35H304.32c-.73 0-1.35-.66-1.35-1.35V205.22c0-.74.62-1.35 1.35-1.35h118.84zm17.92 48.41v-43.06l48.48 49.1h-42.43c-3.29 0-6.05-2.74-6.05-6.04zM24.91 196.09c2.24 10.47 19.3 21.02 45.74 29.85 52.85 17.68 121.85 20.52 177.75 15.14v24.79c-58.75 5.47-129.88 2.02-185.47-16.55A155.626 155.626 0 0 1 25 231.43l-.01 73.87c2.23 10.47 19.3 21.03 45.74 29.86 53.11 17.7 121.55 20.44 177.67 15.18v24.67c-58.94 5.33-129.72 2.07-185.51-16.63-13.39-4.19-26.18-10.23-37.93-17.85v73.87c2.23 10.47 19.3 21.02 45.74 29.85 52.91 17.64 121.77 20.53 177.71 15.14v19.18c0 1.85 0 3.69.27 5.54-58.85 5.44-130.07 2.07-185.75-16.6C44.53 461.39.16 441.23.16 417.1v-7.84C.05 299.23 0 184.46 0 74.62c0-23.23 24.01-42.73 62.77-55.71 75.59-25.2 195.11-25.24 270.69.04 34.95 11.69 58.41 29.03 62.3 49.39.46 1.3.7 2.67.7 4.05v74.16h-24.75v-34.74c-11.86 7.72-24.78 13.84-38.26 18.08-75.23 25.39-195.39 25.15-270.68 0a155.164 155.164 0 0 1-37.93-17.86l-.01 84.06h.08z" /></svg>
                </div>

                <div className='text-xl md:col-span-8 col-span-10 p-4 flex flex-col'>
                    <div className="flex font-mono justify-between items-center">
                        <div className="flex p-3">
                            < input
                                className=" w-[50px]"
                                type="checkbox"
                                id="published"
                                name="published"
                                defaultChecked={blog?.published}
                                onChange={(e) => {
                                    setPublished(e.target.checked);
                                }}
                            />
                            <label htmlFor="published">Make Post Public</label>
                        </div>
                        <span className="border px-3 py-2 rounded-xl font-bold bg-gray-200">
                            {published ? "PUBLIC" : "PRIVATE"}
                        </span>
                    </div>

                    <input
                        type="text"
                        placeholder='Title'
                        defaultValue={blog?.title}
                        onChange={(e) => {
                            setTempTitle(e.target.value);
                        }}
                        className='focus:outline-none text-4xl font-bold font-serif' />

                    {/* <input
                        type="text"
                        placeholder='Subtitle'
                        onChange={(e) => {
                            setSubtitle(e.target.value);
                        }}
                        className='focus:outline-none mt-3 text-2xl font-serif font-semibold' /> */}

                    <textarea
                        minLength={10}
                        placeholder='Content'
                        defaultValue={blog?.content}
                        onChange={(e) => {
                            setTempContent(e.target.value)
                        }}
                        className='focus:outline-none mt-5 text-xl font-serif min-h-[50vh] resize-none [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]' />
                </div>
            </div>
        </>
    )
}
