import SpotifyAPI from "../api/spotify.js";
import {getHashParams} from "../helpers/url.js";
import {STATE_KEY} from "../helpers/constants.js";

const USER_PROFILE = document.getElementById('user-profile');
const {access_token, state} = getHashParams();
const storedState = localStorage.getItem(STATE_KEY);


const outputTemplate = ({display_name, id, email, uri, external_urls, images, country}) =>`<h2>Logged in as </h2>
  <div class="media">
    <div class="pull-left">
      <img class="media-object" width="150" src="">
    </div>
    <div class="media-body">
      <dl class="dl-horizontal">
        <dt>Display name</dt><dd class="clearfix">${display_name}</dd>
        <dt>Id</dt><dd>${id}</dd>
        <dt>Email</dt><dd>${email}</dd>
        <dt>Spotify URI</dt><dd><a href="${uri}">${uri}</a></dd>
        <dt>Link</dt><dd><a href="${external_urls.spotify}">${external_urls.spotify}</a></dd>
        <dt>Profile Image</dt><dd class="clearfix"><a href=""></a></dd>
        <dt>Country</dt><dd>${country}</dd>
      </dl>
    </div>
  </div>`



if (!access_token || (state == null || state !== storedState)) {
 window.location = "/";
} else {
  SpotifyAPI.getUserData(access_token).then(data => {
    USER_PROFILE.innerHTML = outputTemplate(data);
  });
}




/*const classLoop = document.getElementsByClassName("btn-secondary");

for (let i = 0 ; i < classLoop.length; i++) {
   classLoop[i].addEventListener('click' , () => {
   console.log("hello");} ) ; 
}

const url = 'https://api.spotify.com/v1/search';
const queryParams = '?q=';
const type = '&type=artist';
const artist1 = document.querySelector('#artist1');
const submit = document.querySelector('#button1');
const responseField = document.querySelector('#responseField');


const findArtist = () => {
  const searchArtist = artist1.value;
  const endpoint = `${url}${queryParams}${searchArtist}${type}`;
  
  fetch(endpoint).then(response => {
    if (response.ok) {
      return response.json();
    }
    throw new Error('Request failed!');
  }, networkError => {
    console.log(networkError.message)
  })
      .then(data => console.log(data)) 
}


const displaySuggestions = (event) => {
  event.preventDefault();
  while(responseField.firstChild){
    responseField.removeChild(responseField.firstChild);
  }
  findArtist();
};


*/



/*const valueInput = () => {
    document.getElementById('button1').addEventListener('click', () => {
    const userInput1 = document.getElementById('artist1').value;
  });
};*/

document.getElementById('button1').addEventListener('click', getArtists); 


const divResults = document.getElementById('responseField');

function getArtists(){
    const userInput1 = document.getElementById('artist1').value;
fetch('https://api.spotify.com/v1/search?q='+ userInput1 +'&type=artist&limit=1', {
      headers: {
        'Authorization': `Bearer ${access_token}`
      }
    })
    .then(res => res.json())
    .then(data => {
    divResults.innerHTML = data;
    });
                             
                             };

                             







/*document.getElementById('button2').addEventListener('click', getArtists2); 

function getArtists2() {
    const userInput2 = document.getElementById('artist2').value;
fetch('https://api.spotify.com/v1/search?q='+ userInput2 +'&type=artist&limit=1', {
      headers: {
        'Authorization': `Bearer ${access_token}`
      }
    })
    .then(res => res.json())
    .then((data) => console.log(data));
}*/
   
document.getElementById('playAgain').addEventListener('click', function() {
location.reload();
})