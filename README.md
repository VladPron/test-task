# nest-test
To run the project do:
1. Provide DB url in .env file, using PostgreSQL
2. Run `npm ci`
3. Run `npx prisma migrate dev` it will create DB and run seeding
4. Run `npm run start`