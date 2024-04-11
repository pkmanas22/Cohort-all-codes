import { Hono } from 'hono'
import router from './routes'
import { cors } from 'hono/cors';

const app = new Hono();

app.use(cors());

app.route('/api/v1', router);

export default app
