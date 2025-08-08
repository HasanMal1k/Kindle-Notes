const createUser = async () => {
    const response = await fetch('/api/users', {
        method: 'POST'
    })
    return await response.json()
}

export default createUser