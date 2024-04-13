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

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

### Next JS support file routing.

- e.g. If we want to create a route `/signin` then , we make a folder called `signin` inside `app` directory. Then add `page.tsx` inside `signin` folder. And update in it.
- `layout.tsx` is for common layout for the page like adding meta data, and common things for similar routes, give layout file in parent folder.
- If we want to create a `20% off like in banner` so that we can create a `auth` folder and then add another two signup and signin and both containing page.tsx and auth folder contains layout.tsx.
- The main thing in layout.tsx is add `{children}` for props, so that all data can pass inside it.
- Best way is to add `()` round braces in auth folder. so that the folder is ignored by router
- We can not pass event handler directly to client component 
- for that we have to use `"use client"` in top of the component file. Refer 'singin' component
- By defalut, all components are server component
- When should you create client components ?
    1. Whenever you get an error that tells you that you need to create a client component
    2. Whenever you’re using something that the server doesn’t understand (useEffect, useState, onClick…)
- Rule of thumb is to defer the client as much as possible
- So, that it will follow SEO 
- In our case move button which is perform onclick to a separate button component
