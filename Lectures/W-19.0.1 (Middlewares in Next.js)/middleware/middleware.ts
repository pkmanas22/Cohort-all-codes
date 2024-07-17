// 1. Custom matcher config
import { NextRequest, NextResponse } from "next/server";

let requestCount = 0;
export function middleware(req: NextRequest) {
    requestCount++;
    const res = NextResponse.next();
    console.log("Request Count ", requestCount);
    return res;
}

/*
// This is for /api/user
export const config = {
    matcher: '/api/user' // single matcher 
}
*/

// This is for all routes starting with /api
// api/xyz
// api/user
// api/admin
export const config = {
    matcher: '/api/:user*' // dynamic routes 
}

/*
// This is for multiple files
export const config = {
    matcher: ['/api/user', '/'] // multiple matcher - use array
}
*/


// 2. Conditional Statements

/*
export function middleware(req: NextRequest) {
    
    const pathName = req.nextUrl.pathname;
    console.log(pathName);

    if (pathName.startsWith('/user')) {
        return NextResponse.redirect(new URL('/signin', req.url));  // req.url is base url
    }

    if (pathName.startsWith('/dashboard')) {
        return NextResponse.next()
    }
}
*/