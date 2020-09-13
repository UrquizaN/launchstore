CREATE TABLE "products" (
  "id" SERIAL PRIMARY KEY,
  "category_id" int NOT NULL,
  "user_id" int NOT NULL,
  "name" text NOT NULL,
  "description" text NOT NULL,
  "old_price" int,
  "price" int NOT NULL,
  "status" int DEFAULT 1,
  "quantity" int DEFAULT 1,
  "created_at" timestamp DEFAULT 'now()',
  "updated_at" timestamp DEFAULT 'now()'
);

CREATE TABLE "categories" (
  "id" SERIAL PRIMARY KEY,
  "name" text NOT NULL
);

CREATE TABLE "file" (
  "id" SERIAL PRIMARY KEY,
  "name" text,
  "path" text NOT NULL,
  "product_id" int
);

ALTER TABLE "products" ADD CONSTRAINT "products" FOREIGN KEY ("category_id") REFERENCES "categories" ("id");

ALTER TABLE "file" ADD CONSTRAINT "file" FOREIGN KEY ("product_id") REFERENCES "products" ("id");
