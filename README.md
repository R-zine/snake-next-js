This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Installing locally

Install dependencies

npm i --legacy-peer-deps

Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Stack

This application uses Prisma to manage a Supabase PostgresQL instance. Backend functions are done through server-side logic through NextJS. The entire application is database-driven.

### Note: a database-driven approach is not the best architectural choice for this particular case, but I thought that's pretty fun to do anyway :)
