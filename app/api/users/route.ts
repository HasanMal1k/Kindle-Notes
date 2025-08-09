import { NextResponse, NextRequest } from "next/server";
import { auth, currentUser } from "@clerk/nextjs/server";
import { db } from "@/db";
import { users } from "@/db/schema"
import { eq } from "drizzle-orm"
 
export async function GET(req: Request){
    try {
        const { userId } = await auth();
        
        if (!userId) {
            return NextResponse.json(
                { error: 'Unauthorized - Please sign in' }, 
                { status: 401 }
            )
        }

        const user = await db.select().from(users).where(eq(users.clerkId, userId))
        
        if (user.length > 0) {
            const existingUser = user[0]
            return NextResponse.json({ success: true, user: existingUser })
        } else {
            return NextResponse.json(
                { error: 'User not found in database' }, 
                { status: 404 }
            )
        }
        
    } catch (error) {
        console.error('Users GET Error:', error)
        return NextResponse.json(
            { error: 'Internal server error' }, 
            { status: 500 }
        )
    }
}

export async function POST (req: Request){
    try {
        const { userId } = await auth();
        
        if (!userId) {
            return NextResponse.json(
                { error: 'Unauthorized - Please sign in' }, 
                { status: 401 }
            )
        }

        // Check if user already exists
        const existingUser = await db.select().from(users).where(eq(users.clerkId, userId))
        
        if (existingUser.length > 0) {
            return NextResponse.json({ 
                success: true, 
                message: 'User already exists',
                user: existingUser[0] 
            })
        }

        // Get full user details from Clerk
        const clerkUser = await currentUser();
        
        if (!clerkUser) {
            return NextResponse.json(
                { error: 'Could not fetch user details' }, 
                { status: 400 }
            )
        }

        // Create new user
        const newUser = await db.insert(users).values({
            clerkId: userId,
            name: `${clerkUser.firstName || ''} ${clerkUser.lastName || ''}`.trim() || 'Unknown User'
        }).returning()

        return NextResponse.json({ 
            success: true, 
            message: 'User created successfully',
            user: newUser[0] 
        })
        
    } catch (error) {
        console.error('Users POST Error:', error)
        return NextResponse.json(
            { error: 'Internal server error' }, 
            { status: 500 }
        )
    }
}