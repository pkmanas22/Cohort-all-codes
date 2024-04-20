import { Appbar } from "@/components/Appbar";
import User from "@/components/User";
import { getServerSession } from "next-auth";
import Image from "next/image";
import { NEXT_AUTH_CONFIG } from "../lib/auth";
async function getUser() {
  const session = await getServerSession(NEXT_AUTH_CONFIG);
  return session;
}
export default async function Home() {
  // server side 
  const session = await getUser();

  return (
    <div>
      <Appbar />
      <User />  { /* this is client side */}

      {/* server side */}
      {
        JSON.stringify(session)
      }
    </div>
  );
}
