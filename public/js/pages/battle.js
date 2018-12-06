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



async function getArtists() {
try {
const userInput1 = document.getElementById('artist1').value;
const response = await fetch(`https://api.spotify.com/v1/search?q=${userInput1}/&type=artist&limit=1`, {
      headers: {
        'Authorization': `Bearer ${access_token}`
      }
    });
const data = await response.json();
   for (let i = 0; i < data.artists.items.length; i++) {
     firstArtist.innerHTML = `<img src="${data.artists.items[i].images[i].url}"> <br> ${data.artists.items[i].name} has ${data.artists.items[i].followers.total} followers`;
   }
   
                                                   
} catch (err){ 
    console.log(err);
 }
 
}

 button1.addEventListener('click', getArtists); 




const followers1 = () => {
    const userInput1 = document.getElementById('artist1').value;
fetch(`https://api.spotify.com/v1/search?q=${userInput1}&type=artist&limit=1`, {
      headers: {
        'Authorization': `Bearer ${access_token}`
      }
    })
.then(res => res.json())
.then(data => data.artists.items[0].popularity)
      }

button1.addEventListener('click', followers1);

//console.log(followers1.popularity)



/*const followers2 = () => {
    const userInput2 = document.getElementById('artist2').value;
fetch(`https://api.spotify.com/v1/search?q=${userInput2}&type=artist&limit=1`, {
      headers: {
        'Authorization': `Bearer ${access_token}`
      }
    })
.then(res => res.json())
.then(data => `${data.artists.items[0].followers.total}`)
 
      }


button1.addEventListener('click', followers2);

*/

                             
async function getArtists2() {
try {
const userInput2 = document.getElementById('artist2').value;
const response = await fetch(`https://api.spotify.com/v1/search?q=${userInput2}/&type=artist&limit=1`, {
      headers: {
        'Authorization': `Bearer ${access_token}`
      }
    });
const data = await response.json();
   for (let i = 0; i < data.artists.items.length; i++) {
     secondArtist.innerHTML = `<img src="${data.artists.items[i].images[i].url}"> <br> ${data.artists.items[i].name} has ${data.artists.items[i].followers.total} followers`;
   }
   
                                                   
} catch (err){ 
    console.log(err);
 }
 
}

document.getElementById('button2').addEventListener('click', getArtists2);




playAgain.addEventListener('click', () => location.reload())

const fight = () => {
if (followers1 > followers2) {
    console.log(`${name1} has won with ${followers1} followers!`)
}    else if (followers2 > followers1) {
    console.log(`${name2} has won with ${followers2} followers!`)
} else if (followers1 === followers2) {
    console.log("Both win!");
}
}

        
document.getElementById('fight').addEventListener('click', fight);
