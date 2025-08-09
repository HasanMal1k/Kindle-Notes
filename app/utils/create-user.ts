const createUser = async () => {
    try {
        const response = await fetch('/api/users', {
            method: 'POST'
        })
        
        const data = await response.json()
        
        if (!response.ok) {
            throw new Error(data.error || `HTTP error! status: ${response.status}`)
        }
        
        return data
    } catch (error) {
        console.error('Failed to create user:', error)
        throw error
    }
}

export default createUser