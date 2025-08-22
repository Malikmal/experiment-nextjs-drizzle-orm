import { pgTable, uuid, text, timestamp, varchar } from "drizzle-orm/pg-core";

export const messages = pgTable("messages", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: varchar("name").notNull(),
  email: varchar("email").notNull(),
  message: text("message").notNull(),
  created_at: timestamp("created_at").defaultNow(),
});
