import { NextResponse, NextRequest } from "next/server";
import { bookNotes } from "@/db/schema";
import { db } from "@/db";
import { eq } from 'drizzle-orm'

export async function POST(req: Request) {
    const notes = await db.select()
}
