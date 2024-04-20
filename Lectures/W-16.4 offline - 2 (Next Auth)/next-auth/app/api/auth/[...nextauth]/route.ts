import { NEXT_AUTH_CONFIG } from "@/lib/auth";
import NextAuth from "next-auth/next";
import { NextRequest, NextResponse } from "next/server";

/*export function GET(req: NextRequest, args: any) {
    console.log(args)       { params: { nextAuth: ['sign', 'fd'] } }
}*/
/*
export function GET(req: NextRequest, { params }: { params: { nextAuth: string[] } }) {
    // console.log(params);            // { nextAuth: [ 'sign', 'fd' ] }
    // console.log(req)         // all details
    console.log(params.nextAuth);       //  [ 'sign', 'fd' ]
    console.log(params.nextAuth[0]);       //  sign
    return NextResponse.json({
        msg: "Dynamic routing"
    })
}
*/

const handler = NextAuth(NEXT_AUTH_CONFIG)

// export const GET = handler
// export const POST = handler
// In one line
export { handler as GET, handler as POST }