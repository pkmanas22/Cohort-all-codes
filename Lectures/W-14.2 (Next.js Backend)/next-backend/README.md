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

## `page.tsx` 
- Primary page

## `layout.tsx` 
- what is the layout of the page
- we can pass metadata such as title, description, and specify the children

## `loading.tsx`
- loading page

# Server
- For defining backend, we must follow some rules
1. create `api` folder inside `app`
2. In our case we want user backend so we have to create another `user` inside `api`
3. In user folder, create `route.ts` file and export the function name as `GET` , `POST`, `PUT`, etc.
4. Write your logic inside it.