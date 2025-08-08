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
}

export default getNotes