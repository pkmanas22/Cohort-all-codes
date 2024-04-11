# 1. Initialize a cloudflare worker

```
npm create cloudflare@latest
```

- type 'hello-world'

# 2. Install prisma in your project

```
npm install --save-dev prisma
```

# 3. Init Prisma

```
npx prisma init
```

- create model in `schema.prisma`
- add database url in `.env`
- add `directUrl = env("DIRECT_URL")` in `datasource` in schema.prisma

```
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
  directUrl = env("DIRECT_URL")
}

model User {
  id       Int    @id @default(autoincrement())
  name     String
  email    String
  password String
}
```

# 4. Create migration

- After creating basic schema,

```
npx prisma migrate dev --name [name; first is init]
```

# 5. Crate prisma accelerate URL

- visit https://console.prisma.io/login
- enable accelerate
- generate api key
- Add this into `wrangler.toml`

```
[vars]
DATABASE_URL="prisma://accelerate.prisma-data.net/?api_key=your_key"
```

# 6. Add accelerate as a dependency

```
npm install @prisma/extension-accelerate
```

# 7. Generate the prisma client

```
npx prisma generate --no-engine
```

# 8. Import `PrismaClient` from `@prisma/client/edge` & `withAccelerate` from `@prisma/extension-accelerate`

```
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
```

# 9. Initialize prisma by

```
const prisma = new PrismaClient({
    datasourceUrl: env.DATABASE_URL,
}).$extends(withAccelerate());
```

# 10. Setup code

```
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";

export interface Env {
	DATABASE_URL: String
}

export default {
	async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {

		const prisma = new PrismaClient({
			datasourceUrl: env.DATABASE_URL,
		}).$extends(withAccelerate());

		const result = await prisma.user.create({
			data: {
				name: 'manas',
				email: 'manas@gmaic.com',
				password: '12345'
			}
		})
		return Response.json({
			result,
		})
	},
};
```

# 11. Check your terminal connected with cloudflare wrangler or not

```
 npx wrangler whoami
```

# 12. Run locally

```
npm run dev
```

# 13. Deploy the code

```
npm run deploy
```
