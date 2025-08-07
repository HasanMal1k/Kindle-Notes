import { PgTable, serial, text, timestamp, integer, pgTable, json } from "drizzle-orm/pg-core";
import {Note, BookNotes} from '@/app/utils/extract-notes'

export const users = pgTable('users', {
    id: serial('id').primaryKey(),
    name: text('name').notNull()
})

export const bookNotes = pgTable('book_notes', {
    id: serial('id').primaryKey(),
    userId: integer('user_id').references(() => users.id).notNull(),
    data: json('data').$type<BookNotes>().notNull()
})