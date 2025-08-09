import { NextResponse, NextRequest } from "next/server";
import { users, bookNotes } from "@/db/schema";
import { db } from "@/db";
import { eq } from 'drizzle-orm'
import { auth } from "@clerk/nextjs/server";

export async function POST(req: Request) {
   try {
       // Use auth() instead of currentUser() for better error handling
       const { userId } = await auth()
       
       if (!userId) {
           return NextResponse.json(
               { error: 'Unauthorized - Please sign in' }, 
               { status: 401 }
           )
       }

       const body = await req.json()
       const { notes: newNotes } = body
       
       // Find user in database
       const user = await db.select().from(users).where(eq(users.clerkId, userId))
           
       if (user.length === 0) {
           return NextResponse.json(
               { error: 'User not found in database' }, 
               { status: 404 }
           )
       }
       
       const dbUserId = user[0].id
       
       // Check if user has existing notes
       const existingNotes = await db.select().from(bookNotes).where(eq(bookNotes.userId, dbUserId))
       
       if (existingNotes.length > 0) {
           // User has existing notes
           if (newNotes) {
               // Update existing notes
               await db.update(bookNotes)
                   .set({ data: newNotes })
                   .where(eq(bookNotes.userId, dbUserId))
               
               return NextResponse.json({ success: true, notes: newNotes });
           }
           
           // Return existing notes
           const notesData = existingNotes[0].data
           return NextResponse.json({ success: true, notes: notesData });
       } else {
           // User has no existing notes
           if (newNotes) {
               // Create new notes record
               await db.insert(bookNotes).values({
                   userId: dbUserId,
                   data: newNotes
               })
               
               return NextResponse.json({ success: true, notes: newNotes });
           }
           
           // No notes exist and none provided
           return NextResponse.json({ success: true, notes: null });
       }
       
   } catch (error) {
       console.error('Notes API Error:', error)
       return NextResponse.json(
           { error: 'Internal server error' }, 
           { status: 500 }
       )
   }
}