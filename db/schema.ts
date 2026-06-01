import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

export const applications = sqliteTable("applications", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  company: text("company").notNull(),
  role: text("role").notNull(),
  status: text("status").notNull().default("applied"),
  appliedAt: text("applied_at").notNull(),
  url: text("url"),
  notes: text("notes"),
});

export type Application = typeof applications.$inferSelect;
export type NewApplication = typeof applications.$inferInsert;