import { getServerSession } from "next-auth";
import { authOptions } from "../app/lib/auth";

export async function useGetSession() {
    const session = await getServerSession(authOptions)

    return session;
}