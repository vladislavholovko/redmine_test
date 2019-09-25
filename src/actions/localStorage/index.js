export function getTokenFromLocalStorage() {
    return localStorage.getItem('api_key')
}

export function setTokenToLocalStorage(token) {
    return localStorage.setItem('api_key', token)
}

export function deleteTokenFromLocalStorage() {
    return localStorage.removeItem('api_key')
}