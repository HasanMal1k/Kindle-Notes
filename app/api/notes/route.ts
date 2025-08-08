import { NextResponse, NextRequest } from "next/server";
import { users, bookNotes } from "@/db/schema";
import { db } from "@/db";
import { eq } from 'drizzle-orm'
import { currentUser } from "@clerk/nextjs/server";

export async function POST(req: Request) {
   const clerkUser = await currentUser()
   const body = await req.json()
   const { notes: newNotes} = body
   
   if(!clerkUser) return NextResponse.json({'message': 'User Not found'})
   
   const user = await db.select().from(users).where(eq(users.clerkId, clerkUser.id))
       
   if(user.length > 0){
       const userId = user[0].id
       
       const notes = await db.select().from(bookNotes).where(eq(bookNotes.userId, userId))
       
       if(notes.length > 0){
           if(newNotes){
               await db.update(bookNotes)
                   .set({data: newNotes})
                   .where(eq(bookNotes.userId, userId))
                   .returning()
               
               return NextResponse.json({[`${clerkUser.firstName}'s notes`]: newNotes });
           }
           
           const notesData = notes[0].data
           return NextResponse.json({[`${clerkUser.firstName}'s notes`]: notesData });
       }
       
       if(newNotes){
           await db.insert(bookNotes).values({
               userId: userId,
               data: newNotes
           }).returning()
           
           return NextResponse.json({[`${clerkUser.firstName}'s notes`]: newNotes });
       }
   }
   
   return NextResponse.json({'message': 'notes not found'})
}