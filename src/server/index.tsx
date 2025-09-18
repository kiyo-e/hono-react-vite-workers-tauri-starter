import { Hono } from 'hono'
import { renderer } from './renderer'

const app = new Hono<{ Bindings: Cloudflare.Env }>()

app.use(renderer)

app.get('/', (c) => {
  return c.render(<div id="root"></div>)
})

export default app