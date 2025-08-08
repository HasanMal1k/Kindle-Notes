const checkUserExists = async () => {
    const response = await fetch('/api/users', {
        method: 'GET'
    })
    return await response.json()
}

export default checkUserExists