import React, { useEffect } from 'react'
import { useUser } from '@clerk/nextjs'
import getNotes from '../utils/get-notes'
import useNotesStore from '../stores/notes-store'

function useUpdateNotes() {
    const { isSignedIn, user, isLoaded } = useUser()
    const notes = useNotesStore(state => state.notes)
    const updateNotes = useNotesStore(state => state.updateNotes)

    useEffect(() => {
        // Only run if user is loaded and signed in
        if (!isLoaded || !isSignedIn) return;

        async function runGetNotes() {
            try {
                const response = await getNotes(notes)
                if (response.success) {
                    updateNotes(response.notes)
                } else {
                    console.error('Failed to get notes:', response.error)
                }
            } catch (error) {
                console.error('Error fetching notes:', error)
            }
        }

        runGetNotes()
    }, [isSignedIn, isLoaded, notes])

    return null
}

export default useUpdateNotes