import VideoCard from "./videoCard"

const VIDEOS = [
    {
        thumbnail: '/thumbnail.jpg',
        channel: '/channel.jpg',
        title: "Tailwind CSS in 1 Shot || Manas Kumar Pradhan",
        author: 'Manas K Pradhan',
        views: '76k',
        time: '7 minute',
    },
    {
        thumbnail: '/thumbnail.jpg',
        channel: '/channel.jpg',
        title: "React JS in 1 Shot || Manas Kumar Pradhan",
        author: 'Manas K Pradhan',
        views: '76k',
        time: '27 minute',
    },
    {
        thumbnail: '/thumbnail.jpg',
        channel: '/channel.jpg',
        title: "MERN Stack in 1 Shot || Manas Kumar Pradhan",
        author: 'Manas K Pradhan',
        views: '76k',
        time: '17 minute',
    },
    {
        thumbnail: '/thumbnail.jpg',
        channel: '/channel.jpg',
        title: "Tailwind CSS in 1 Shot || Manas Kumar Pradhan",
        author: 'Manas K Pradhan',
        views: '76k',
        time: '7 minute',
    },
    {
        thumbnail: '/thumbnail.jpg',
        channel: '/channel.jpg',
        title: "React JS in 1 Shot || Manas Kumar Pradhan",
        author: 'Manas K Pradhan',
        views: '76k',
        time: '27 minute',
    },
    {
        thumbnail: '/thumbnail.jpg',
        channel: '/channel.jpg',
        title: "MERN Stack in 1 Shot || Manas Kumar Pradhan",
        author: 'Manas K Pradhan',
        views: '76k',
        time: '17 minute',
    },
    {
        thumbnail: '/thumbnail.jpg',
        channel: '/channel.jpg',
        title: "Tailwind CSS in 1 Shot || Manas Kumar Pradhan",
        author: 'Manas K Pradhan',
        views: '76k',
        time: '7 minute',
    },
    {
        thumbnail: '/thumbnail.jpg',
        channel: '/channel.jpg',
        title: "React JS in 1 Shot || Manas Kumar Pradhan",
        author: 'Manas K Pradhan',
        views: '76k',
        time: '27 minute',
    },
    {
        thumbnail: '/thumbnail.jpg',
        channel: '/channel.jpg',
        title: "MERN Stack in 1 Shot || Manas Kumar Pradhan",
        author: 'Manas K Pradhan',
        views: '76k',
        time: '17 minute',
    },
    {
        thumbnail: '/thumbnail.jpg',
        channel: '/channel.jpg',
        title: "Tailwind CSS in 1 Shot || Manas Kumar Pradhan",
        author: 'Manas K Pradhan',
        views: '76k',
        time: '7 minute',
    },
    {
        thumbnail: '/thumbnail.jpg',
        channel: '/channel.jpg',
        title: "React JS in 1 Shot || Manas Kumar Pradhan",
        author: 'Manas K Pradhan',
        views: '76k',
        time: '27 minute',
    },
    {
        thumbnail: '/thumbnail.jpg',
        channel: '/channel.jpg',
        title: "MERN Stack in 1 Shot || Manas Kumar Pradhan",
        author: 'Manas K Pradhan',
        views: '76k',
        time: '17 minute',
    },
]

export const VideoGrid = () => {

    return <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 m-4">
        {
            VIDEOS.map((video, index) => (
                <VideoCard
                    key={index}
                    thumbnail={video.thumbnail}
                    channel={video.channel}
                    title={video.title}
                    author={video.author}
                    views={video.views}
                    time={video.time}
                />
            ))
        }
    </div>
}