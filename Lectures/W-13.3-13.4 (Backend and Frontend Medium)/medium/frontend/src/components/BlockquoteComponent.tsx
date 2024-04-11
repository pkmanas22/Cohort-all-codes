
export const BlockquoteComponent = () => {
    
    return (
        <>
            <svg className="w-8 h-8 mx-auto mb-3 text-gray-800" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 14">
                <path d="M6 0H2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3H2a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Zm10 0h-4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3h-1a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Z" />
            </svg>
            <div className="text-2xl italic font-medium text-gray-900 text-center">
                "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Iure culpa dolores deleniti quo omnis in? Odit laudantium animi sunt cumque commodi quasi dignissimos maiores illo."
            </div>
            <div className="mt-4 flex items-center text-center divide-x-2 rtl:divide-x-reverse divide-gray-500 ">
                <cite className="text-gray-900 pe-3 font-bold md:text-xl">Mr. Manas Pradhan</cite>
                <cite className="ps-3 text-sm md:text-lg text-gray-500">CEO at BlogVista</cite>
            </div>
        </>
    )
}
