const checkUserExists = async () => {
    const response = await fetch('/api/user', {
        method: 'GET'
    })
    return await response.json()
}

export default checkUserExists