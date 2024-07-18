# Hono + Zod + OpenAPI

- Ref https://hono.dev/snippets/zod-openapi

## First define schema using Zod

- The `z` object should be imported from `@hono/zod-openapi`
- Create your request schema and response schema, just like below

  ```
  import { z } from '@hono/zod-openapi';

  export const ParamsSchema = z.object({
      id: z.string().min(3).openapi({
          param: {
              name: 'id',
              in: 'path',  // user/{id}
          },
          example: '12123'
      }),
  })

  export const UserSchema = z.object({
      id: z.string().openapi({
          example: '123',
      }),
      name: z.string().openapi({
          example: 'John Doe',
      }),
      age: z.number().openapi({
          example: 30,
      }),
  }).openapi('User')
  ```

## Then create route

```
import { createRoute } from '@hono/zod-openapi';
import { ParamsSchema, UserSchema } from './schema';

export const userRoute = createRoute({
    method: 'get',
    path: '/user/{id}',
    request: {
        params: ParamsSchema,
    },
    responses: {
        200: {
            content: {
                'application/json': {
                    schema: UserSchema
                },
            },
            description: "Retrive the user"
        },
    }
})
```

## Finally set up the app,

```
import { OpenAPIHono } from '@hono/zod-openapi';
import { userRoute } from './route';

const app = new OpenAPIHono();

app.openapi(userRoute, (c) => {
    const { id } = c.req.valid('param')

    return c.json({
        id,
        age: 20,
        name: 'Mr. John Doe'
    })
})

// The OpenAPI documentation spec will be available at /doc-api
app.doc('/doc-api', {
    openapi: '3.0.0',
    info: {
        version: '1.0.0',
        title: 'My API using Hono + Zod + OpenAPI'
    },
})

export default app;
```

- Hit the endpoint

  - http://localhost:8787/users/123123
  - http://localhost:8787/doc-api

# Create a swagger page for documentation

- https://hono.dev/examples/swagger-ui
- Swagger UI Middleware provides a middleware and a component for integrating Swagger UI with Hono applications.
- The `SwaggerUI` should be imported from `@hono/swagger-ui`, so first add dependencies.

    ```
    import { swaggerUI } from '@hono/swagger-ui'

    // Use the middleware to serve Swagger UI at /doc
    app.get('/doc', swaggerUI({
    url: '/doc-api'
    }))
    ```

- Try visiting http://localhost:8787/doc

# Auto generated clients

- There is json file given by hono which describes the shape of routes.
- Now we have to generate a `ts` client which can be used in `Node.js` or `React` app to talk to the backend.
- Ref https://www.npmjs.com/package/openapi-typescript-codegen
- 1. First store the OpenAPI Spec in a file `spec.json`
- 2. Generate the client
  - 1. Install `openapi-typescript-codegen`
        ```
        yarn add -D openapi-typescript-codegen
        ```
  - 2. Generate client
        ```
        npx openapi-typescript-codegen --input ./spec.json --output ./generated
        ```
    - It will generate a `generated` folder based on the `spec.json` file
    - Explore the client
      ```
      cd generated
      cat index.ts
      ```
    - Now we can use this client in different project.
    - `getUser()` can be used in other project, which is preset in `./generated/services/DefaultService.ts`

## Use auto generated client in different project

- The working directory should contain `generated` folder
- Here I created `testingProject.ts` file for this which contains below code

    ```
    import { DefaultService } from './generated'
    async function main() {
        const response = await DefaultService.getUser('12');
        console.log(response);
    }

    main();
    ```

- Then build this typescript file

    ```
    npx esbuild testingProject.ts --bundle --platform=node --outfile=testingProject.js
    ```

- Run `testingProject.js` file

    ```
    $ node testingProject.js
    { id: '123', age: 20, name: 'Mr. John Doe' }
    ```
