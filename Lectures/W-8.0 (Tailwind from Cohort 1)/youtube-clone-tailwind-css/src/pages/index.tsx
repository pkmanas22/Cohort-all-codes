import Image from "next/image";
import { Inter } from "next/font/google";
import VideoCard from "@/components/videoCard";
import { VideoGrid } from "@/components/videoGrid";
import { AppBar } from "@/components/appBar"

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <div>
      <AppBar />
      <VideoGrid />
    </div>
  )
}
