import { PgTable, serial, text, timestamp, integer, pgTable, json } from "drizzle-orm/pg-core";
import {Note, BookNotes} from '@/app/utils/extract-notes'
import { relations } from "drizzle-orm";

export const users = pgTable('users', {
    id: serial('id').primaryKey(),
    clerkId: integer('clerk_id').notNull(),
    name: text('name').notNull(),
})

export const bookNotes = pgTable('book_notes', {
    id: serial('id').primaryKey(),
    userId: integer('user_id').references(() => users.id).notNull(),
    data: json('data').$type<BookNotes>().notNull()
})

export const usersRelations = relations(users, ({ one }) => ({
    bookNotes: one(bookNotes)
}))

export const bookNotesRelations = relations( bookNotes, ({ one }) => ({
    user: one(users)
    // user: one(users, {
    //     fields: [bookNotes.userId],
    //     references: [users.id]
    // })
}) )