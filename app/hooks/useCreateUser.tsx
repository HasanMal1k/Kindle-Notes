import React from 'react'
import { useAuth } from '@clerk/nextjs'
import { useEffect } from 'react'
import createUser from '../utils/create-user'
import checkUserExists from '../utils/get-user'

function useCreateUser() {

    const { isSignedIn } = useAuth()

    useEffect(()=> {
        if(isSignedIn){
            const userExists = checkUserExists()

            if(!userExists){
                createUser()
            }
        }
    }, [isSignedIn])


    return (
    null
    )
}

export default useCreateUser