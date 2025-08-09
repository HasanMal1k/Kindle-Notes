import React, { useEffect } from 'react'
import { useUser } from '@clerk/nextjs'
import createUser from '../utils/create-user'

function useCreateUser() {
    const { isSignedIn, user, isLoaded } = useUser()

    useEffect(() => {
        // Only run if user is loaded and signed in
        if (!isLoaded || !isSignedIn) return;

        async function runCreateUser() {
            try {
                const response = await createUser()
                if (response.success) {
                    console.log('User created/found:', response.message)
                } else {
                    console.error('Failed to create user:', response.error)
                }
            } catch (error) {
                console.error('Error creating user:', error)
            }
        }

        runCreateUser()
    }, [isSignedIn, isLoaded])

    return null
}

export default useCreateUser