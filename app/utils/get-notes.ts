const getNotes = async (notes: any) => {
    try {
        const response = await fetch('/api/notes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                notes: notes
            })
        })

        const data = await response.json()

        if (!response.ok) {
            throw new Error(data.error || `HTTP error! status: ${response.status}`)
        }

        return data
    } catch (error) {
        console.error('Failed to fetch notes:', error)
        throw error
    }
}

export default getNotes