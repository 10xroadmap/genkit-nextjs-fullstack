// src/db/seed.ts
import { drizzle } from "drizzle-orm/node-postgres";
import { seed } from "drizzle-seed";
import * as schema from "./schema";

async function main() {
  // Initialize your connection
  const db = drizzle(process.env.DATABASE_URL!);
    console.log("Seeding started...");

  // Seed users table with 10 entities, and add 3 posts for each user automatically
  await seed(db, schema).refine((f) => ({
    order_status: {
      count: 10,
      columns: {
        // Force the seed to only use "user" and "guest" for these 10 rows
        status: f.valuesFromArray({
          values: ["PENDING", "DISPATCHED","DELIVERED","REFUNDED"], 
        }),
        product: f.valuesFromArray({
          values: ["T Shirt", "Shirt","Trousers","Cap","Track Suit","Track Pant"], 
        }),
      },
    },
  }));

  console.log("Seeding complete!");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
