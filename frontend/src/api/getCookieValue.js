export const getTokenFromCookie = () => {
  const cookies = document.cookie.split('; ');
  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].split('=');
    if (cookie[0] === 'token') {
      return cookie[1];
    }
  }
  return null; // Return null if the token is not found
};