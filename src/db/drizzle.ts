// drizzle: Creates a Drizzle instance that works with Neon HTTP driver
// neon-http: Optimized for serverless environments (Vercel, Netlify)

import { drizzle } from "drizzle-orm/node-postgres";

// db: The main object we'll use for all database operations
// We'll import this in other files to use it
// Example: import { db } from '@/db/drizzle';
export const db = drizzle(process.env.DATABASE_URL!);
export type DBType = typeof db;