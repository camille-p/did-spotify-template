
const getAPI = 'https://api.spotify.com/v1/'; 


const getUserData = (accessToken) => {
  return fetch(`${getAPI}me`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
  }).then(response => response.json())
};


export default {
  getUserData  
}
