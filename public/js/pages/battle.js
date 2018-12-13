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


const firstArtist = document.getElementById('firstArtist');
const secondArtist = document.getElementById('secondArtist');
const playAgain = document.getElementById('playAgain');
const input = document.querySelectorAll('.form-artists');

//SEARCH FOR ARTIST 1
async function getArtists() {
try {
const userInput1 = input[0].value;
const response = await fetch(`https://api.spotify.com/v1/search?q=${userInput1}/&type=artist&limit=1`, {
      headers: {
        'Authorization': `Bearer ${access_token}`
      }
    });
const data = await response.json();
     firstArtist.innerHTML = `<img src="${data.artists.items[0].images[0].url}"> <br> <p style = "text-align: center;"><span>${data.artists.items[0].name}</span></p>`;                                                   
} catch (err){ 
    console.log(err);
 }
 
}


input[0].addEventListener('keypress', () => {
if (event.keyCode === 13) {
getArtists();
}
})


// SEARCH FOR ARTIST 2                             
async function getArtists2() {
try {
const userInput2 = input[1].value;
const response = await fetch(`https://api.spotify.com/v1/search?q=${userInput2}/&type=artist&limit=1`, {
      headers: {
        'Authorization': `Bearer ${access_token}`
      }
    });
const data = await response.json();
     secondArtist.innerHTML = `<img src="${data.artists.items[0].images[0].url}"> <br> <p style = "text-align: center;"><span>${data.artists.items[0].name}</span></p>`;
} catch (err){ 
    console.log(err);
 }
}


input[1].addEventListener('keypress', () => {
if (event.keyCode === 13) {
getArtists2();
}
})


// MAKE THEM FIGHT!
async function artistsPop() {
try {
// INFO ABOUT ARTIST 1
const userInput1 = input[0].value;
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
const userInput2 = input[1].value;
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
    displayResults.innerHTML = `<div class= "results"><img src="${musicianPicture1}"> <br> <p><span>${musicianName1}</span> wins with a popularity of ${pop1}/100 <br> Unfortunately, <span>${musicianName2}</span> loses with a popularity of only ${pop2}/100</p></div>`;
}    else if (pop2 > pop1) {
    displayResults.innerHTML = `<div class= "results"><img src="${musicianPicture2}"> <br> <p><span>${musicianName2}</span> wins with a popularity of ${pop2}/100 <br> Unfortunately, <span>${musicianName1}</span> loses with a popularity of only ${pop1}/100</p></div>`;
} else if (pop2 === pop1) {
    displayResults.innerHTML = `<div class= "results"><img src="${musicianPicture1}"> <img src="${musicianPicture2}"> <br> <p>Yay! Both win with a popularity of ${pop2}/100</p></div>`;

}
}

 catch (err){ 
    console.log(err);
 }
}


//const theBattle = document.getElementById('fight').addEventListener('click', artistsPop);
document.getElementById('popularity').addEventListener('click', artistsPop);


// MAKE THEM FIGHT!
async function artistsFollowers() {
try {
// INFO ABOUT ARTIST 1
const userInput1 = input[0].value;
const response1 = await fetch(`https://api.spotify.com/v1/search?q=${userInput1}/&type=artist&limit=1`, {
      headers: {
        'Authorization': `Bearer ${access_token}`
      }
    });
const data1 = await response1.json();
let followers1 = `${data1.artists.items[0].followers.total}`
let musicianName1 = `${data1.artists.items[0].name}`
let musicianPicture1 = `${data1.artists.items[0].images[0].url}`
function displayInfo1() {
     return followers1, musicianName1;
}
   displayInfo1();
// INFO ABOUT ARTIST 2    
const userInput2 = input[1].value;
const response2 = await fetch(`https://api.spotify.com/v1/search?q=${userInput2}/&type=artist&limit=1`, {
      headers: {
        'Authorization': `Bearer ${access_token}`
      }
    });
const data2 = await response2.json();
let followers2 = `${data2.artists.items[0].followers.total}`
let musicianName2 = `${data2.artists.items[0].name}`
let musicianPicture2 = `${data2.artists.items[0].images[0].url}`
function displayInfo2() {
     return followers2, musicianName2;
}
   displayInfo2();
 // THE BATTLE   
    if (followers1 > followers2) {
    displayResults.innerHTML = `<div class= "results"><img src="${musicianPicture1}"> <br> <p><span>${musicianName1}</span> wins with ${followers1} followers! <br> Unfortunately, <span>${musicianName2}</span> loses with only ${followers2} followers</p></div>`;
}    else if (followers2 > followers1) {
    displayResults.innerHTML = `<div class= "results"><img src="${musicianPicture2}"> <br> <p><span>${musicianName2}</span> wins with ${followers2} followers! <br> Unfortunately, <span>${musicianName1}</span> loses with only ${followers1} followers</p></div>`;
} else if (followers2 === followers1) {
    displayResults.innerHTML = `<div class= "results"><img src="${musicianPicture1}"> <img src="${musicianPicture2}"> <br> <p>Yay! Both win with ${followers2} followers</p></div>`;

}
}

 catch (err){ 
    console.log(err);
 }
}

//const theFight = document.getElementById('fight').addEventListener('click', artistsFollowers);
document.getElementById('followers').addEventListener('click', artistsFollowers);


// CLEAR TO PLAY AGAIN
playAgain.addEventListener('click', () => location.reload())
