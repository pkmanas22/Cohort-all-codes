import { NEXT_AUTH_CONFIG } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const session = await getServerSession(NEXT_AUTH_CONFIG);
    // console.log(session);

    return NextResponse.json({
        user: session
    })
}