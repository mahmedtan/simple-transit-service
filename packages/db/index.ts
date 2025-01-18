import { drizzle } from "drizzle-orm/node-postgres";
import * as schema from "./schema";
import "dotenv/config";

export const db = drizzle({
  schema,
  connection: process.env.DATABASE_URL!,
  casing: "snake_case",
});

export * from "./schema";
export * from "drizzle-orm";
