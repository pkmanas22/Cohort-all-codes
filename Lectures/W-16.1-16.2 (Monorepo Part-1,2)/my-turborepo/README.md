# Turborepo starter

This is an official starter Turborepo.

## Using this example

Run the following command:

```sh
npx create-turbo@latest
```

## What's inside?

This Turborepo includes the following packages/apps:

### Apps and Packages

- `docs`: a [Next.js](https://nextjs.org/) app
- `web`: another [Next.js](https://nextjs.org/) app
- `@repo/ui`: a stub React component library shared by both `web` and `docs` applications
- `@repo/eslint-config`: `eslint` configurations (includes `eslint-config-next` and `eslint-config-prettier`)
- `@repo/typescript-config`: `tsconfig.json`s used throughout the monorepo

Each package/app is 100% [TypeScript](https://www.typescriptlang.org/).

### Utilities

This Turborepo has some additional tools already setup for you:

- [TypeScript](https://www.typescriptlang.org/) for static type checking
- [ESLint](https://eslint.org/) for code linting
- [Prettier](https://prettier.io) for code formatting

### Build

To build all apps and packages, run the following command:

```
cd my-turborepo
pnpm build
```

### Develop

To develop all apps and packages, run the following command:

```
cd my-turborepo
pnpm dev
```

### Remote Caching

Turborepo can use a technique known as [Remote Caching](https://turbo.build/repo/docs/core-concepts/remote-caching) to share cache artifacts across machines, enabling you to share build caches with your team and CI/CD pipelines.

By default, Turborepo will cache locally. To enable Remote Caching you will need an account with Vercel. If you don't have an account you can [create one](https://vercel.com/signup), then enter the following commands:

```
cd my-turborepo
npx turbo login
```

This will authenticate the Turborepo CLI with your [Vercel account](https://vercel.com/docs/concepts/personal-accounts/overview).

Next, you can link your Turborepo to your Remote Cache by running the following command from the root of your Turborepo:

```
npx turbo link
```

## Useful Links

Learn more about the power of Turborepo:

- [Tasks](https://turbo.build/repo/docs/core-concepts/monorepos/running-tasks)
- [Caching](https://turbo.build/repo/docs/core-concepts/caching)
- [Remote Caching](https://turbo.build/repo/docs/core-concepts/remote-caching)
- [Filtering](https://turbo.build/repo/docs/core-concepts/monorepos/filtering)
- [Configuration Options](https://turbo.build/repo/docs/reference/configuration)
- [CLI Usage](https://turbo.build/repo/docs/reference/command-line-reference)

# My Notes

### End user apps (websites/core backend)

- `apps/web` - A Next.js website
- `apps/docs` - A Docs website that has all the documentation related to your project

### Helper packages

- `packages/ui` - UI packages
- `packages/typescript-config` - Shareable TS configuration
- `packages/eslint-config` - Shareable ESLine configuration

## Exploring root `package.json`

![alt text](https://www.notion.so/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F085e8ad8-528e-47d7-8922-a23dc4016453%2F09802be9-a935-4449-b77e-5de61e3cca0a%2FScreenshot_2024-03-16_at_1.31.42_PM.jpg?table=block&id=eb33a25e-6122-4a21-b834-065a0c98f97f&cache=v2)

## Exploring `packages/ui`

### 1. package.json

![alt text](https://www.notion.so/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F085e8ad8-528e-47d7-8922-a23dc4016453%2Fdf96ee8e-8d2d-441a-82aa-fc757f8c0d1c%2FScreenshot_2024-03-16_at_1.39.59_PM.jpg?table=block&id=981b22a8-6a6d-42de-b385-bb30b3f06c8e&cache=v2)

### 2. src/button.tsx

![alt text](https://www.notion.so/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F085e8ad8-528e-47d7-8922-a23dc4016453%2Fb9939eab-f74d-4648-8b09-19219dc96dd9%2FScreenshot_2024-03-16_at_1.43.13_PM.jpg?table=block&id=637f5492-356b-48b1-91e6-dcc7ca343913&cache=v2)

### 3. `turbo` folder

- Create a new workspace or component, in our case `input-box`
- ```
    bun generate:component
  ```
  ```
    turbo gen react-component"
  ```
- It asks for file name and generate a simple component with exporting in `package.json`

## Exploring `apps/web`

### 1. Dependencies

- It is a simple `next.js` app. But it uses some UI components from the `packages/ui` module.

### 2. Exploring `package.json`

- In package.json of `apps/web`, there is `@repo/ui` as a dependency
- ```
  "@repo/ui": "*",
  ```

### 3. Exploring `page.tsx`

    ```
    import { Button } from "@repo/ui/button";       // Import from package module
    <Button appName="Manas App">Click me</Button>
    ```

- The same Button component can be used by the `apps/docs` website as well

## Add a new page

### For routing

- Create a new folder `admin` inside `apps/web/app`
- Then create a `page.tsx` file inside it.

### For components

- Create a new file `admin.tsx` inside `apps/packages/ui/src`
- Export a simple react component.
- Add the component that exports in `apps/packages/ui/package.json`

  ```
  "exports": {
      "./admin": "./src/admin.tsx"
    },
  ```

- Import the admin component in `apps/web/app/admin/page.tsx`

  ```
  import Admin from '@repo/ui/admin'

  <Admin />
  ```

## Exploring `turbo.json`

![alt text](https://www.notion.so/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F085e8ad8-528e-47d7-8922-a23dc4016453%2F8946eebe-8455-49a1-b1ed-2e3406c539a9%2FScreenshot_2024-03-16_at_2.12.59_PM.jpg?table=block&id=e7a2d72d-4577-4a78-aa6e-7454b9d33aca&cache=v2)

## Adding React projects

### 1. Go to the apps folder

    ```
    cd apps
    ```

### 2. Create a fresh vite app

    ```
    npm create vite@latest
    ```

### 3. Update `package.json` to include `@repo/ui` as a dependency

    ```
    "dependencies": {
        "@repo/ui": "*",
    },
    ```

### 4. Run `npm install` in the root folder

    ```
    cd ..
    npm install
    ```

### 5. Run for dev

    ```
    npm run dev
    ```

- Try importing something from the ui package and rendering it

### 6. Add a `turbo.json` to the react folder to override the outputs object of this module.

    ```
    {
    "extends": ["//"],
        "pipeline": {
            "build": {
                "outputs": ["dist/**"]
            }
        }
    }
    ```

## Caching in Turborepo

- Caching makes turborepo faster and efficient.
- It watches files across builds and returns the cached response of builds if no files have changed.
- Try running `npm run build` more than once and you’ll see the second times it happens extremely fast.
- You can also explore the `node_modules/.cache/turbo` folder to see the zipped cache files and unzip them.

## Adding a `common` module

- Sharing common codes for both `backend` and `frontend` like zod type, zod schema, config etc.

### 1. Initialize a `packages/common` module

    ```
    cd packages
    mkdir common
    ```

### 2. Initialize an empty `node.js` project

    ```
    npm init -y
    npx tsc --init
    ```

### 3. Change the name to `@repo/common`

- It is used for best practices

### 4. Add `src/index.ts` inside `common` module

- Export a few things from `src/index.ts`
  ```
  export const BACKEND_URL = "api.mybackend.com";
  ```

### 5. Add it to the `package.json` of various apps (next app/react app/node app)

    ```
    "@repo/common": "*",
    ```

## Adding a Node.js app (backend)

### 1. Go to the apps folder and create a directory `backend`

    ```
    cd apps
    ```

### 2. Initialize empty ts repo

    ```
    npm init -y
    npx tsc --init
    ```

### 3. Use base `tsconfig` (Ref - https://github.com/vercel/turbo/blob/main/examples/kitchen-sink/apps/api/tsconfig.json )

    ```
    {
        "extends": "@repo/typescript-config/base.json",
        "compilerOptions": {
            "lib": ["ES2015"],
            "module": "CommonJS",
            "outDir": "./dist",
        },
        "exclude": ["node_modules"],
        "include": ["."]
    }
    ```

### 4. Add dependencies

    ```
    npm i express @types/express
    ```

### 5. Add `src/index.ts`

    ```
    import express from "express";

    const app = express()

    app.get("/", (req, res) => {
        res.json({
            message: "hello world"
        });
    })
    ```

### 6. Update `turbo.json`

    ```
    {
        "extends": ["//"],
        "pipeline": {
            "build": {
                "outputs": ["dist/**"]
            }
        }
    }
    ```

### 7. Install `esbuild`

    ```
    npm install esbuild
    ```

### 8. Add build script to `package.json`

    ```
    "build": "esbuild src/index.ts --platform=node --bundle --outdir=dist"
    ```

### 9. Build the project

    ```
    npm run build
    ```

### 10. Run the project

    ```
    node dist/index.js
    ```
