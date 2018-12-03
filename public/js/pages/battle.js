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

const results = document.getElementById('results');
const firstArtist = document.getElementById('firstArtist');
const secondArtist = document.getElementById('secondArtist');
const playAgain = document.getElementById('playAgain');
const button1 = document.getElementById('button1');



const firstArtistTemplate = ({name, images, popularity}) =>`
  <div class="media">
    <div class="pull-left">
      <img class="media-object" width="150" src="">
    </div>
    <div class="media-body">
      <dl class="dl-horizontal">
        <dt>Artist 1</dt><dd class="clearfix">${name}</dd>
        
        <dt>Profile Image</dt><dd class="clearfix"><a href=""></a></dd>
        <dt>Popularity</dt><dd>${popularity}</dd>
      </dl>
    </div>
  </div>`




function getArtists(){

const userInput1 = document.getElementById('artist1').value;
fetch(`https://api.spotify.com/v1/search?q=${userInput1}&type=artist&limit=1`, {
      headers: {
        'Authorization': `Bearer ${access_token}`
      }
    })
.then(res => res.json())
.then(data => {
    
   for (let i = 0; i < data.artists.items.length; i++) {
    firstArtist.innerHTML = `<img src="${data.artists.items[i].images[i].url}"> <br> ${data.artists.items[i].name} has ${data.artists.items[i].followers.total} followers`;
   
   }
    
   /* console.log(data);

const name1 = data.artists.items[0].name, 
       followers1 = data.artists.items[0].followers.total,
        img1 = data.artists.items[0].images[0].url;
    //firstArtist.innerHTML = `<img src="${img1}"><br/><h3>${name1}</h3><br/>has ${followers1} followers.<br/>`;   
  // firstArtist.innerHTML = firstArtistTemplate(data);*/
   /* let firstArtistTemplate = '';
    Array.from(data).forEach(function(musician) {
    firstArtistTemplate += `
<div class="media">
    <div class="pull-left">
      <img class="media-object" width="150" src="">
    </div>
    <div class="media-body">
      <dl class="dl-horizontal">
        <dt>Artist 1</dt><dd class="clearfix">${musician.name}</dd>
        <dt>Id</dt><dd>${musician.id}</dd>
        <dt>Profile Image</dt><dd class="clearfix"><a href=""></a></dd>
        <dt>Followers</dt><dd>${musician.items[0].followers}</dd>
      </dl>
    </div>
  </div>
        `;
    })
    firstArtist.innerHTML = data.artists.items[0].followers;*/
    



 

  })
                             
                            
 .catch(function(err){ 
        console.log(err)
 });
 };

 
 button1.addEventListener('click', getArtists); 







/*const classLoop = document.getElementsByClassName("btn-secondary");

for (let i = 0 ; i < classLoop.length; i++) {
   classLoop[i].addEventListener('click' , () => {
   console.log("hello");} ) ; 
}

const url = 'https://api.spotify.com/v1/search';
const queryParams = '?q=';
const type = '&type=artist';
const artist1 = document.querySelector('#artist1');
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




                             



function getArtistsDeux(){
    const userInput2 = document.getElementById('artist2').value;
fetch(`https://api.spotify.com/v1/search?q=${userInput2}&type=artist&limit=1`, {
      headers: {
        'Authorization': `Bearer ${access_token}`
      }
    })
    .then(res => res.json())
    .then(data => {  
    const name2 = data.artists.items[0].name, 
       followers2 = data.artists.items[0].followers.total,
       img2 = data.artists.items[0].images[0].url; 
    secondArtist.innerHTML = `<img src="${img2}"><br/><h3>${name2}</h3><br/>has ${followers2} followers.<br/>`;
    
})
}

document.getElementById('button2').addEventListener('click', getArtistsDeux);




playAgain.addEventListener('click', () => location.reload())

function fight() {
if (followers1 > followers2) {
    console.log(`${name1} has won with ${followers1} followers!`)
}    else if (followers2 > followers1) {
    console.log(`${name2} has won with ${followers2} followers!`)
} else if (followers1 === followers2) {
    console.log("Both win!");
}
}

        
document.getElementById('fight').addEventListener('click', fight);
