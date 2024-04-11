
type blogCardType = {
  title: string,
  content: string,
  author: string,
  publishedDate: string,
  readingTime: number,
  onClickFn: () => void
}

export const BlogCardComponent = ({
  title,
  content,
  author,
  publishedDate,
  readingTime,
  onClickFn }: blogCardType) => {

  return (
    <div onClick={onClickFn}
     className=' w-96 sm:w-[500px] md:w-[600px] lg:w-[800px] gap-2 flex flex-col mt-4 py-3 px-5 border-b-2 shadow-md m-auto break-words cursor-pointer'>
      <div className='flex items-center font-semibold text-lg'>
        <div className="relative inline-flex items-center justify-center w-10 h-10  overflow-hidden bg-slate-800 rounded-full cursor-pointer">
          <span className=" text-yellow-300">{author[0]}</span>
        </div>
        <div className="pl-2 text-gray-500 italic">{author}</div>
      </div>

      <div className='text-xl font-bold'>
        {(title.length > 30) ? title.slice(0, 30) + "..." : title}
      </div>

      <div className='text-lg font-[medium]'>
        {(content.length > 50) ? (content.slice(0, 50) + "...") : content}
      </div>

      <div className='flex items-center gap-2'>
        <span className="text-gray-500">{publishedDate}</span>
        <svg width="16" height="16" viewBox="0 0 64 64" fill="none"><path d="M39.64 40.83L33.87 56.7a1.99 1.99 0 0 1-3.74 0l-5.77-15.87a2.02 2.02 0 0 0-1.2-1.2L7.3 33.88a1.99 1.99 0 0 1 0-3.74l15.87-5.77a2.02 2.02 0 0 0 1.2-1.2L30.12 7.3a1.99 1.99 0 0 1 3.74 0l5.77 15.87a2.02 2.02 0 0 0 1.2 1.2l15.86 5.76a1.99 1.99 0 0 1 0 3.74l-15.87 5.77a2.02 2.02 0 0 0-1.2 1.2z" fill="#FFC017"></path></svg>
        <span className="text-gray-500">{readingTime} min(s) read</span>
      </div>
    </div>
  )
}
