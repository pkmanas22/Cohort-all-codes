import { signup } from "@/app/serverAction/signup";
import prisma from "@/db";
import { NextRequest, NextResponse } from "next/server";

// general things
/*export async function POST(req: NextRequest) {
    // body
    const body = await req.json();
    console.log(body);

    // headers
    const authorization = req.headers.get('Authorization');     
    console.log("authorization:- " + authorization)

    // params
    const params = await req.nextUrl.searchParams;           // name=manasssss&age=21  
    console.log("params:- " + params)
    
    // query
    const age = await req.nextUrl.searchParams.get('age');           // 21
    console.log("age:- " + age)

    
    return Response.json({
        msg: "successfully"
    })
}*/

export async function POST(req: NextRequest) {
    const { username, password } = await req.json();

    // try {
    //     const user = await prisma.user.create({
    //         data: {
    //             username,
    //             password
    //         }
    //     });

    //     return Response.json({
    //         msg: "created successfuly",
    //         id: user.id
    //     })
    // } catch (error) {
    //     return NextResponse.json({
    //         msg: 'error occured'
    //     }, { status: 411 })
    // }
    const res = await signup(username, password);
}