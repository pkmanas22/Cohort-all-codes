import React from 'react';

const SearchBar = () => {
    return (
        <div className="  sm:w-[50vw] flex">
            <div className="relative w-full mx-auto flex justify-center">
                <input type="search" className="sm:block hidden pl-5 z-20 w-full  text-white bg-zinc-950 rounded-l-3xl border border-gray-600  focus:outline-none focus:border-blue-600" placeholder="Search" required />

                <button type="submit" className="  top-0 end-0 h-full p-3 font-medium rounded-full hover:bg-zinc-800 sm:bg-zinc-800 sm:px-4 sm:rounded-l-3xl ">

                    <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                        <path stroke="currentColor" className="text-gray-400" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                    </svg>
                    <span className="sr-only">Search</span>
                </button>

                <button className=" top-0 end-0 h-full p-3 font-medium rounded-full hover:bg-zinc-800 sm:bg-zinc-800 sm:px-4 sm:rounded-full ml-4 flex">
                    <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                        <path stroke="currentColor" stroke-linecap="round"  stroke-linejoin="round" stroke-width="2" d="M15 7v3a5.006 5.006 0 0 1-5 5H6a5.006 5.006 0 0 1-5-5V7m7 9v3m-3 0h6M7 1h2a3 3 0 0 1 3 3v5a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3V4a3 3 0 0 1 3-3Z" />
                    </svg>
                </button>
            </div>
        </div >
    );
}

export default SearchBar;
