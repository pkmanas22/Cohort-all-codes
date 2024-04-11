import { Hono } from 'hono'
import router from './router'

const app = new Hono()

app.route('/api/v1/', router)

export default app
