# yarn

## 1. Install yarn globally

```
npm i -g yarn
```

# Installing prisma in a fresh app

## 1. Initialize an empty Node.js project

```
npm init -y
```

## 2. Add dependencies

```
npm install prisma typescript ts-node @types/node --save-dev
```

or

```
yarn add prisma ts-node @types/node --dev
```

## 3. Initialize typescript

```
npx tsc --init
Change `rootDit` to `src`
Change `outDir` to `dist`
```

## 4. Initialize a fresh prisma project

```
npx prisma init
```

### 1. Update the database URL in `.env`

### 2. Defining data model in `prisma/schema.prisma`

```
model User {
  id Int @id @default(autoincrement())
  email String @unique
  firstName String
  lastName String?  // optional by giving '?'
  password String
}
```

### 3. Generate migrations

```
npx prisma migrate dev --name UserAndTodoAdded
```

### 4. Exploring database

```
docker exec -it my-postgres1 psql -U postgres -d postgres
\dt
```

### 5. Generating the prisma client

```
yarn add @prisma/client
npx prisma generate
```
- Then add into `index.ts`
```
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
```
### 6. Write some logic
### 7. Build it and then run
```
tsc -b 
node dist/insertData.js
```
- build while file changes
```
tsc -b -w
```

## 5. Visualize the data
```
npx prisma studio
```