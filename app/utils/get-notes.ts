import useNotesStore from "../stores/notes-store"

const getNotes = async (notes: any) => {
    const response = await fetch('/api/notes', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            notes: notes
        })
    })

    if(!response.ok){
        throw new Error('Failed to fetch notes')
    }

    const data = await response.json()
    return data
}

export default getNotes