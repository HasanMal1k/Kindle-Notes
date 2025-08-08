import { NextResponse, NextRequest } from "next/server";
import { currentUser } from "@clerk/nextjs/server";
import { db } from "@/db";
import { users } from "@/db/schema"
import { eq } from "drizzle-orm"
 
export async function GET(req: Request){

    const clerkUser = await currentUser();
    console.log('Clerk user:', clerkUser ? 'Found' : 'Not found');

    if(!clerkUser) return NextResponse.json({'message': 'User Not found'})

    let user;

    user = await db.select().from(users).where(eq(users.clerkId, clerkUser.id))
    
    

    if(user.length > 0){
        console.log(user[0])
        const existingUser = user[0]

        return NextResponse.json({existingUser})
    }
    else{
        console.log({'message': 'User Doesnt Exist'})
        return NextResponse.json({'message': 'User Doesnt Exist'})
    }

}

export async function POST (req: Request){

    const clerkUser = await currentUser();

    let user;

    if(!clerkUser){
        return NextResponse.json({error: 'Not authenticated'}, {status: 401})

    }

    user = await db.select().from(users).where(eq(users.clerkId, clerkUser.id))
    user = user[0]

    if(user){
        console.log(user)
        return NextResponse.json({user})
    }
    else{
        console.log({'message': 'User Doesnt Exist, Inseting user to db'})
        await db.insert(users).values({
            clerkId: clerkUser?.id,
            name: clerkUser?.firstName + " " + clerkUser?.lastName
            
        }).returning()

        return NextResponse.json({'message': 'User Created Successfuly'})
    }

}