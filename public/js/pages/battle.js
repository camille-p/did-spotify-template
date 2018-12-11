import SpotifyAPI from "../api/spotify.js";
import {getHashParams} from "../helpers/url.js";
import {STATE_KEY} from "../helpers/constants.js";

const USER_PROFILE = document.getElementById('user-profile');
const {access_token, state} = getHashParams();
const storedState = localStorage.getItem(STATE_KEY);


const outputTemplate = ({display_name, id, email, uri, external_urls, country}) =>`<h3>Logged in as </h3>
  <div>
      <dl>
        <dt>Display name</dt><dd>${display_name}</dd>
        <dt>Id</dt><dd>${id}</dd>
        <dt>Email</dt><dd>${email}</dd>
        <dt>Spotify URI</dt><dd><a href="${uri}">${uri}</a></dd>
        <dt>Link</dt><dd><a href="${external_urls.spotify}">${external_urls.spotify}</a></dd>
        <dt>Country</dt><dd>${country}</dd>
      </dl>
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


//SEARCH FOR ARTIST 1
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
     firstArtist.innerHTML = `<img src="${data.artists.items[i].images[i].url}"> <br> <span>${data.artists.items[i].name}</span> has ${data.artists.items[i].followers.total} followers`;
   }

                                                   
} catch (err){ 
    console.log(err);
 }
 
}

 button1.addEventListener('click', getArtists); 



// SEARCH FOR ARTIST 2                             
async function getArtists2() {
try {
const userInput2 = document.getElementById('artist2').value;
const response = await fetch(`https://api.spotify.com/v1/search?q=${userInput2}/&type=artist&limit=1`, {
      headers: {
        'Authorization': `Bearer ${access_token}`
      }
    });
const data = await response.json();
     secondArtist.innerHTML = `<img src="${data.artists.items[0].images[0].url}"> <br> <span>${data.artists.items[0].name}</span> has ${data.artists.items[0].followers.total} followers`;


} catch (err){ 
    console.log(err);
 }
 
}

document.getElementById('button2').addEventListener('click', getArtists2);



// MAKE THEM FIGHT!
async function artistsPop() {
try {
// INFO ABOUT ARTIST 1
const userInput1 = document.getElementById('artist1').value;
const response1 = await fetch(`https://api.spotify.com/v1/search?q=${userInput1}/&type=artist&limit=1`, {
      headers: {
        'Authorization': `Bearer ${access_token}`
      }
    });
const data1 = await response1.json();
let pop1 = `${data1.artists.items[0].popularity}`
let musicianName1 = `${data1.artists.items[0].name}`
let musicianPicture1 = `${data1.artists.items[0].images[0].url}`
function displayInfo1() {
     return pop1, musicianName1;
}
   displayInfo1();
// INFO ABOUT ARTIST 2    
const userInput2 = document.getElementById('artist2').value;
const response2 = await fetch(`https://api.spotify.com/v1/search?q=${userInput2}/&type=artist&limit=1`, {
      headers: {
        'Authorization': `Bearer ${access_token}`
      }
    });
const data2 = await response2.json();
let pop2 = `${data2.artists.items[0].popularity}`
let musicianName2 = `${data2.artists.items[0].name}`
let musicianPicture2 = `${data2.artists.items[0].images[0].url}`
function displayInfo2() {
     return pop2, musicianName2;
}
   displayInfo2();
 // THE BATTLE   
    if (pop1 > pop2) {
    modalBox.innerHTML = `<img src="${musicianPicture1}"> <br> <span>${musicianName1}</span> won with a popularity of ${pop1}`
}    else if (pop2 > pop1) {
    modalBox.innerHTML = `<img src="${musicianPicture2}"> <br> <span>${musicianName2}</span> won with a popularity of ${pop2}`
} else if (pop2 === pop1) {
    modalBox.innerHTML = `Both win with a popularity of ${pop2}`;
}

}

 catch (err){ 
    console.log(err);
 }
}


document.getElementById('fight').addEventListener('click', artistsPop);


// CLEAR TO PLAY AGAIN
playAgain.addEventListener('click', () => location.reload())
