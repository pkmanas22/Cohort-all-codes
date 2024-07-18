import { OpenAPIHono } from '@hono/zod-openapi';
import { userRoute } from './route';
import { swaggerUI } from '@hono/swagger-ui';

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

// Use the middleware to serve Swagger UI at /doc
app.get('/doc', swaggerUI({
  url: '/doc-api'
}))

export default app;