import { useState } from "react";
import { AppBar } from "../components/AppBar"
import { useNavigate } from "react-router-dom";
import useDebounceHook from "../utils/debounceHook";
import { createPostType } from "@manaskp/commonmedium";
import axios from "axios";
import { backendUrl } from "../utils/backendUrl";

export const CreatePost = () => {
    const [serverError, setServerError] = useState<{
        title: string,
        content: string,
    }>();
    const [tempTitle, setTempTitle] = useState("");
    const [tempContent, setTempContent] = useState("");
    // const [subtitle, setSubtitle] = useState("");
    const navigate = useNavigate();

    const title = useDebounceHook(tempTitle);
    const content = useDebounceHook(tempContent);
    // const subtitle = useDebounceHook(subtitle);

    const creatPostBody: createPostType = {
        title,
        content,
        // subtitle        // not added yet in database
    }

    const handleFormSubmit = async () => {
        setServerError({
            title: "",
            content: "",
        });
        // console.log("hi");

        const token = localStorage.getItem("token");

        axios.post(`${backendUrl}/posts`, creatPostBody, {
            headers: {
                Authorization: token,
            }
        })
            .then((response) => {
                // console.log(response.data);
                const blogId = response.data.id;
                alert("Blog created successfully");
                navigate(`/blog/${blogId}`);
                // const token = "Bearer " + response.data.token;
                // localStorage.setItem('token', token);
                // navigate("/");
            })
            .catch((err) => {
                // console.log(err.response.data);
                setServerError(err.response.data)
            })
    }
    return (
        <>
            <AppBar loggedIn={true} name={""} />      {/* Always true */}

            {serverError && <div className="font-bold text-center text-red-800 rounded-lg bg-red-50">
                <div>{serverError.title}</div>
                <div>{serverError.content}</div>
            </div>}
            <div className='p-8 grid grid-cols-12 w-full'>
                <div onClick={handleFormSubmit} className='flex text-xl col-span-2 justify-end p-2 border-r-2'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="gray"

                        className="cursor-pointer bi bi-plus-circle" viewBox="0 0 16 16">
                        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                        <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
                    </svg>
                </div>
                <div className='text-xl md:col-span-8 col-span-10 p-4 flex flex-col'>
                    <input
                        type="text"
                        placeholder='Title'
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
                        placeholder='Click on the plus icon for create post'
                        onChange={(e) => {
                            setTempContent(e.target.value)
                        }}
                        className='focus:outline-none mt-5 text-xl font-serif min-h-[50vh] resize-none [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]' />
                </div>
            </div>
        </>
    )
}
