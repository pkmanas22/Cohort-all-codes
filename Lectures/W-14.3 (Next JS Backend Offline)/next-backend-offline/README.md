This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

# singleton prisma

- Best practice for instantiating Prisma Client with Next.js https://www.prisma.io/docs/orm/more/help-and-troubleshooting/help-articles/nextjs-prisma-client-dev-practices
- create a new global `db.ts` file
- copy & paste below code

  ```
    import { PrismaClient } from '@prisma/client'
    const prismaClientSingleton = () => {
    return new PrismaClient()
    }

    declare global {
    var prismaGlobal: undefined | ReturnType<typeof prismaClientSingleton>
    }

    const prisma = globalThis.prismaGlobal ?? prismaClientSingleton()

    export default prisma

    if (process.env.NODE_ENV !== 'production') globalThis.prismaGlobal = prisma
  ```

- Then update prisma in your code base
  ```
  import prisma from "@/db";
  ```

# server actions

- What if you could do a simple function call (even on a client component that would run on the server?) (similar to RPC )

1.  Create `actions/user.ts` file (you can create it in a different folder)
2.  Write a function that takes `username` and `password` as input and stores it in the DB

```
"use server"

import prisma from "@/db";

export async function signup(username: string, password: string) {

    try {
        const user = await prisma.user.create({
            data: {
                username,
                password
            }
        });

        return true;
    } catch (error) {
        return false;
    }
}
```

`"use server"` is mandatory so that it can think it is server as it use in client side

3.  Update the `Signup.tsx` file to do the function call

```
  const res = await signup(username, password);
  if (res) { router.push('/') }
  else { console.log("error") }
```

## Benefits of server actions

- Single function can be used in both client and server components
- Gives you types of the function response on the frontend (very similar to trpc)
- Can be integrated seamlessly with forms (ref https://www.youtube.com/watch?v=dDpZfOQBMaU)
