export function getTokenFromLocalStorage(type) {
  return localStorage.getItem(type);
}

export function setTokenToLocalStorage(type, token) {
  return localStorage.setItem(type, token);
}

export function deleteTokenFromLocalStorage(type) {
  return localStorage.removeItem(type);
}
