import React, { useEffect } from 'react'
import { useUser } from '@clerk/nextjs'
import getNotes from '../utils/get-notes'
import useNotesStore from '../stores/notes-store'

function useUpdateNotes() {

    const { isSignedIn, user, isLoaded } = useUser()
    const notes = useNotesStore(state => state.notes)


    useEffect(()=> {

    async function runGetNotes(){
       await getNotes()
    }

    runGetNotes

    }, [isSignedIn, notes])
    

    return null
}


export default useUpdateNotes