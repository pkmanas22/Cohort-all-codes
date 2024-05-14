import { Button } from "./button";
import { useRouter } from 'next/navigation'

interface AppBarProps {
  user?: {
    name?: string | null
  },
  // TODO: can u figure out what the type should be here?
  onsignin: any,
  onsignout: any,
}
export const AppBar = ({ user, onsignin, onsignout }: AppBarProps) => {
  const isLoading = user === undefined;
  const router = useRouter();

  return <div className="flex justify-between items-center bg-gray-300 px-6 fixed w-screen h-[50px] z-50">
    <div onClick={() => {
      router.push('/')
    }} className="text-3xl flex flex-col justify-center font-bold cursor-pointer">
      PayTM
    </div>
    {!isLoading &&
      <div className="flex flex justify-center items-center ">
        <div className="text-lg italic mr-4 font-bold">
          Welcome, {user.name}
        </div>
        <Button onclick={user ? onsignout : onsignin}>
          {user ? "Logout" : "Login"}
        </Button>
      </div>}
  </div>
};
