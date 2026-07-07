1. Create user schema in src/db/schema.ts
 import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").unique().notNull(),
  password: text("password").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});
2. Generate
 npx drizzle-kit generate
 This will create
 src/db/migrations/0000_jazzy_pet_avengers.sql
3. Migrate
npx drizzle-kit migrate
4. Create DTO
npm i class-validator
tsconfig.json
{
  "compilerOptions": {
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true
  }
}
src/dto/user-create-dto.ts

4. Create Repo src/db/repo/auth-repo.ts

5. Install
npm install jose bcryptjs
npm install --save-dev @types/bcryptjs