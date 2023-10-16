export const getConfig = (token) => {
    if (!token) {
        throw new Error("Token is missing");
    }
    
    return {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        }
    }
}