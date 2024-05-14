
import { getServerSession } from "next-auth"
import { authOptions } from "../../lib/auth"
import { NextResponse } from "next/server";

export const GET = async () => {
    try {
        const session = await getServerSession(authOptions);
        // console.log(session);

        if (session?.user) {
            return NextResponse.json({
                user: session.user
            })
        }
    } catch (error) {
        return NextResponse.json({
            msg: "You are not logged in"
        }, {
            status: 403
        })
    }

    return NextResponse.json({
        msg: "You are not logged in"
    }, {
        status: 403
    })
}