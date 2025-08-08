const createUser = async () => {
    const response = await fetch('/api/user', {
        method: 'POST'
    })
    return await response.json()
}

export default createUser