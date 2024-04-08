import { Hono } from 'hono'

const app = new Hono()

async function authMiddleware(c:any, next:any) {
  if (c.req.header('Authorization')) {
    // do validation
    await next()
  }else{
    return c.text("You don't have access")
  }
}

app.post('/',authMiddleware, async (c) => {
  // body, headers, query pararms, middlewares, connect to db
  const body = await c.req.json();
  console.log(body);
  console.log(c.req.header('Authorization'));
  console.log(c.req.query('param'));
  
  return c.text('Hello Hono!')
})

app.get('/', async (c) => {     // 'c' stands for context
  return c.text('hi there')
})

export default app
