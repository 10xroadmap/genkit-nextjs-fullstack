CREATE TABLE "order-status" (
	"id" serial PRIMARY KEY NOT NULL,
	"product" text NOT NULL,
	"status" text NOT NULL,
	"created_at" timestamp DEFAULT now()
);
