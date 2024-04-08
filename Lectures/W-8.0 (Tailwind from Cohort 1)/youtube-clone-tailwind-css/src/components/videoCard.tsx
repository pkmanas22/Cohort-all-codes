
export default function VideoCard(props: any) {

    return (
        <div className=" rounded-xl p-3 px-7 sm:px-3 m-auto cursor-pointer">
            <div>
                <img className="rounded-xl" src={props.thumbnail} alt="" />
            </div>
            <div className="flex pt-1">
                <div className="w-[55px] p-1 col-span-1">
                    <img className="rounded-full" src={props.channel} alt="" />
                </div>
                <div className="col-span-7 pl-1">
                    <div className="text-[20px] font-[700] leading-[25px]">{props.title}</div>
                    <div className="text-gray-400 ">{props.author}</div>
                    <div className="text-gray-400 mt-[-6px]">{props.views} views | {props.time} ago</div>
                </div>
            </div>
        </div>
    )
}