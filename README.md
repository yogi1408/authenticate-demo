
This application spam contacts like truecaller. It utilizes data and stores information in a PostgreSQL database using Prisma ORM.

## How to Run

1. **Install Dependencies**: Run the following command to install project dependencies:

   ```bash
   npm install
   npx prisma generate
   npx prisma migrate dev --name init
   npm run start:dev
   The application will be accessible at http://localhost:3000


2. **Set Environment Variables**: Create a .env file in the root directory of the project and define the following variables:
   DATABASE_URL=postgresql://<username>:<password>@127.0.0.1:<port>/<database_name>

3. **After running login API**
Got token in response, use this token as Bearer Token for other APIs.
