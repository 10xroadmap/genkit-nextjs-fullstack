import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";
export const order_status = pgTable("order-status", {
    id: serial("id").primaryKey(),
    product: text("product").notNull(),
    status: text("status").notNull(),
    createdAt: timestamp("created_at").defaultNow(),
});
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").unique().notNull(),
  password: text("password").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});
