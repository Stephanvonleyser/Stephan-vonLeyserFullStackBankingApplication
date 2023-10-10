export const getConfig = (token) => {
    return {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        }
    }
}