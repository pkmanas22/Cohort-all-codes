// for signup componenet

import { NextRequest } from "next/server";
import { PrismaClient } from "@prisma/client";

const client = new PrismaClient()

export async function POST(req: NextRequest) {
    // extract the body
    const body = await req.json();
    // sotre the body in database
    const email = body.username;
    const password = body.password;

    const user = await client.user.create({
        data: {
            email,
            password
        }
    })
    // send resonse
    return Response.json({
        msg: 'You are logged in',
        // user
    })
}

export async function GET() {
    return Response.json({
        name: "Manas",
        email: 'manas@gmail.com'
    })
}

// // similaryl we create for POST, PUT etc.
// export function POST() {
//     return Response.json({
//         name: "Manas",
//         email: 'manas@gmail.com'
//     })
// }
