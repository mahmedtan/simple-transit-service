import { integer, pgTable, timestamp, varchar } from "drizzle-orm/pg-core";

export const bookmarkedLines = pgTable("bookmarked_lines", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  lineCode: varchar().notNull(),
  createdAt: timestamp().defaultNow(),
});
