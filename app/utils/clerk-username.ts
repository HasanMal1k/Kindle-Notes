import { currentUser } from "@clerk/nextjs/server";

export async function getUsername(){
    const user = await currentUser()

    if(!user) return null;

    console.log(user)

    return user
}