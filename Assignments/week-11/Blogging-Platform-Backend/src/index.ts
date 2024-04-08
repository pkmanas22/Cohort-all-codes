import { Hono } from 'hono'
import userRouter from './router/users'
import postRouter from './router/posts';

import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'

import { createFactory } from 'hono/factory';

const app = new Hono<{
  Bindings: {
    DATABASE_URL: string
  }
}>()


/*// one way to send data by using c.req.*
app.use(async (c, next) => {

  c.req.prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())

  await next()
})*/

// Another way is by using createFactory from hono/factory for creating middleware and logger from hono/logger for handling data
/*const factory = createFactory();

const prismaMiddleware = factory.createMiddleware(async (c, next) => {
  const prismaEnvSetup = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())

  c.set('prisma', prismaEnvSetup);
  await next()
})
app.use(prismaMiddleware)
*/

app.route('/api/v1/users', userRouter);

app.route('/api/v1/posts', postRouter);

export default app;
