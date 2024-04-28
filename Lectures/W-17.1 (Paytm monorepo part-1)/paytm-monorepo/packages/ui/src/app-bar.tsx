import { Button } from "./button";

interface AppBarProps {
  user?: {
    name?: string | null
  },
  // TODO: can u figure out what the type should be here?
  onsignin: any,
  onsignout: any,
}
export const AppBar = ({ user, onsignin, onsignout }: AppBarProps) => {

  return <div className="flex justify-between border-b px-4">
    <div className="text-lg flex flex-col justify-center">
      PayTM
    </div>
    <div className="flex flex-col justify-center pt-2">
      <Button onclick={user ? onsignout : onsignin}>
        {user ? "Logout" : "Login"}
      </Button>
    </div>
  </div>
};
