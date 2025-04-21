To get the data locally:

1. Open the terminal in the **backend** directory
2. Generate the prisma client - `npx prisma generate`
3. Apply migrations - `npx prisma migrate dev --name init`
4. Run the seed script `npx prisma db seed`
5. Optionally, run `npx prisma studio` to view the data