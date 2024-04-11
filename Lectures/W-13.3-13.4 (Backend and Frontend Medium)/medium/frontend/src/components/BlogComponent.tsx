type blogType = {
    title: unknown;
    subTitle: string;
    content: string;
    author: string;
    bio: string,
    publishedDate: string;
    readingTime: number;
};
export const BlogComponent = ({
    title,
    subTitle,
    content,
    author,
    bio,
    publishedDate,
    readingTime,
}: blogType) => {
    return (
        <div className="mt-4 py-3 px-8 m-auto break-words flex flex-col md:col-span-8">
            <div className="text-4xl font-bold text-center">{title}</div>
            <div className="text-xl text-center font-medium">{subTitle}</div>
            <div className="flex items-center gap-2 my-4 px-2 m-auto text-gray-500 italic">
                Posted on:
                <span> {publishedDate}</span>
                <svg width="16" height="16" viewBox="0 0 64 64" fill="none">
                    <path
                        d="M39.64 40.83L33.87 56.7a1.99 1.99 0 0 1-3.74 0l-5.77-15.87a2.02 2.02 0 0 0-1.2-1.2L7.3 33.88a1.99 1.99 0 0 1 0-3.74l15.87-5.77a2.02 2.02 0 0 0 1.2-1.2L30.12 7.3a1.99 1.99 0 0 1 3.74 0l5.77 15.87a2.02 2.02 0 0 0 1.2 1.2l15.86 5.76a1.99 1.99 0 0 1 0 3.74l-15.87 5.77a2.02 2.02 0 0 0-1.2 1.2z"
                        fill="#FFC017"
                    ></path>
                </svg>
                <span>{readingTime} min(s) read</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-12 mt-5">
                {/* blog :col-end-7 md:col-start-1 lg:col-end-8 lg:col-start-2*/}
                <div className="md:col-span-7 lg:col-start-2 lg:col-end-8 text-lg text-justify first-letter:text-6xl first-letter:text-orange-700 first-letter:float-left first-letter:mr-2 first-letter:font-semibold first-letter:uppercase">
                    {content}
                </div>
                <hr className="my-2" />
                {/* author */}
                <div className="md:col-span-4 text-gray-600 text-lg">
                    <div className="font-semibold italic">
                        Author
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="relative inline-flex items-center justify-center w-10 h-10 p-2 overflow-hidden bg-purple-500 rounded-full">
                            <span className=" text-blue-900 font-bold text-xl">{author[0]}</span>
                        </div>
                        <div>
                            <div className="font-bold text-xl md:text-lg lg:text-xl italic">
                                {author}
                            </div>
                            <div className="md:text-xm lg:text-lg">
                                {bio}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
