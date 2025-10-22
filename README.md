# Banking System Backend


Small banking API built with Node.js, Express and Prisma (PostgreSQL).


## Features
- JWT Authentication (register, login)
- User CRUD (profile read/update/delete)
- Transaction CRUD
- Deposit, Withdraw (per-withdrawal limit $20), Transfer
- Input validation and central error handling


## Setup
1. Copy files into a folder `banking-system-backend`.
2. Create `.env` from `.env.example` and fill in values.
3. Install dependencies:


```bash
npm install
```


4. Generate Prisma client and run migrations:


```bash
npx prisma generate
npx prisma migrate dev --name init
```


5. Start server (dev):


```bash
npm run dev
```


6. Production start:


```bash
npm start
```


## Notes for deployment
- Add `DATABASE_URL` and `JWT_SECRET` to your Render environment variables.
- Run `npx prisma migrate deploy` on the Render build hook if needed.