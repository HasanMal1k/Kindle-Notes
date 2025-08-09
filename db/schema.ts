import { PgTable, serial, text, timestamp, integer, pgTable, json } from "drizzle-orm/pg-core";
import {Note, BookNotes} from '@/app/utils/extract-notes'
import { relations } from "drizzle-orm";

export const users = pgTable('users', {
    id: serial('id').primaryKey(),
    clerkId: text('clerk_id').notNull(),
    name: text('name').notNull(),
})

// Fixed: Store the full notes data structure as returned by extractAllBookNotes
export const bookNotes = pgTable('book_notes', {
    id: serial('id').primaryKey(),
    userId: integer('user_id').references(() => users.id).notNull(),
    data: json('data').$type<Record<string, BookNotes>>().notNull()
})

export const usersRelations = relations(users, ({ one }) => ({
    bookNotes: one(bookNotes)
}))

export const bookNotesRelations = relations( bookNotes, ({ one }) => ({
    user: one(users, {
        fields: [bookNotes.userId],
        references: [users.id]
    })
}) )