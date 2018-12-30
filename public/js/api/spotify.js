
const getAPI = 'https://api.spotify.com/v1/'; 


const getUserData = (access_token) => {
  return fetch(`${getAPI}me`, {
      headers: {
        'Authorization': `Bearer ${access_token}`
      }
  }).then(response => response.json())
};

                             
                            

export default {
  getUserData
}
