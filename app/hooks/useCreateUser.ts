import React, { useEffect } from 'react'
import { useUser } from '@clerk/nextjs'
import createUser from '../utils/create-user'

function useCreateUser() {

    const { isSignedIn, user, isLoaded } = useUser()

    useEffect(()=> {

    async function runCreateUser(){
       await createUser()
    }

    runCreateUser()

    }, [isSignedIn])
    

    return null
}


export default useCreateUser