import SpotifyAPI from "../api/spotify.js";
import {getHashParams} from "../helpers/url.js";
import {STATE_KEY} from "../helpers/constants.js";

const USER_PROFILE = document.getElementById('user-profile');
const {access_token, state} = getHashParams();
const storedState = localStorage.getItem(STATE_KEY);

const firstArtist = document.getElementById('firstArtist');
const secondArtist = document.getElementById('secondArtist');
const playAgain = document.getElementById('playAgain');
const input = document.querySelectorAll('.form-artists');

const artistTemplate = (data) => `<img src="${data.artists.items[0].images[0].url}" class="breather"> 
    <br><p style = "text-align: center;"><span>${data.artists.items[0].name}</span></p>`


let artist1 = null;
let artist2 = null;

if (!access_token || (state == null || state !== storedState)) {
window.location = "/";
} 


function searchArtist(query) {
    return fetch(`https://api.spotify.com/v1/search?q=${query}/&type=artist&limit=1`, {
    headers: {
        'Authorization': `Bearer ${access_token}`
    }
    });
}

function youNeedTwoArtists() { 
    if (artist1 === null || artist2 === null) {
        alert('You need to pick 2 artists!')
    };
}


//SEARCH FOR ARTIST 1
async function getArtists() {
try {
const userInput1 = input[0].value;
const response = await searchArtist(userInput1);
const data = await response.json();
    firstArtist.innerHTML = artistTemplate(data);      
    artist1 = data;
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
const response = await searchArtist(userInput2);
const data = await response.json();
    artist2 = data;
    secondArtist.innerHTML = artistTemplate(data);
} catch (err){ 
    console.log(err);
}
}


input[1].addEventListener('keypress', () => {
if (event.keyCode === 13) {
getArtists2();
}
})


// LOADER 
let popLoad;

function loaderPop() {
  popLoad = setTimeout(artistsPop, 150);
}


// MAKE THEM FIGHT BY POPULARITY!
async function artistsPop() {
try {
// INFO ABOUT ARTIST 1
const userInput1 = input[0].value;
const data1 = artist1;
let pop1 = `${data1.artists.items[0].popularity}`
let musicianName1 = `${data1.artists.items[0].name}`
let musicianPicture1 = `${data1.artists.items[0].images[0].url}`
function displayInfo1() {
    return pop1, musicianName1;
}
displayInfo1();
// INFO ABOUT ARTIST 2    
const userInput2 = input[1].value;
const data2 = artist2;
let pop2 = `${data2.artists.items[0].popularity}`
let musicianName2 = `${data2.artists.items[0].name}`
let musicianPicture2 = `${data2.artists.items[0].images[0].url}`
function displayInfo2() {
    return pop2, musicianName2;
}
displayInfo2();
// THE BATTLE   
    if (pop1 > pop2) {
    displayResults.innerHTML = `<div class= "results"><img src="${musicianPicture1}"> <br> <p><span class="green">${musicianName1}</span> wins with a popularity of ${pop1}/100 <br> Unfortunately, <span class="green">${musicianName2}</span> loses with a popularity of only ${pop2}/100</p></div>`;
}    else if (pop2 > pop1) {
    displayResults.innerHTML = `<div class= "results"><img src="${musicianPicture2}"> <br> <p><span class="green">${musicianName2}</span> wins with a popularity of ${pop2}/100 <br> Unfortunately, <span class="green">${musicianName1}</span> loses with a popularity of only ${pop1}/100</p></div>`;
} else if (pop2 === pop1) {
    displayResults.innerHTML = `<div class= "results"><img src="${musicianPicture1}"> <img src="${musicianPicture2}"> <br> <p>Yay! Both win with a popularity of ${pop2}/100</p></div>`;

}
}

catch (err){ 
    console.log(err);
    youNeedTwoArtists();

}
}


document.getElementById('popularity').addEventListener('click', loaderPop);

// LOADER 
let followLoad;

function loaderFollowers() {
  followLoad = setTimeout(artistsFollowers, 150);
}

// MAKE THEM FIGHT BY FOLLOWERS!
async function artistsFollowers() {
try {
// INFO ABOUT ARTIST 1
const userInput1 = input[0].value;
const data1 = artist1;
let followers1 = `${data1.artists.items[0].followers.total}`
let musicianName1 = `${data1.artists.items[0].name}`
let musicianPicture1 = `${data1.artists.items[0].images[0].url}`
function displayInfo1() {
    return followers1, musicianName1;
}
displayInfo1();
// INFO ABOUT ARTIST 2    
const userInput2 = input[1].value;
const data2 = artist2;
let followers2 = `${data2.artists.items[0].followers.total}`
let musicianName2 = `${data2.artists.items[0].name}`
let musicianPicture2 = `${data2.artists.items[0].images[0].url}`
function displayInfo2() {
    return followers2, musicianName2;
}
displayInfo2();
// THE BATTLE   
    if (followers1 - followers2 > 0) {
    displayResults.innerHTML = `<div class= "results"><img src="${musicianPicture1}"> <br> <p><span class="green">${musicianName1}</span> wins with ${followers1} followers! <br> Unfortunately, <span class="green">${musicianName2}</span> loses with only ${followers2} followers</p></div>`;
}    else if (followers2 - followers1 > 0) {
    displayResults.innerHTML = `<div class= "results"><img src="${musicianPicture2}"> <br> <p><span class="green">${musicianName2}</span> wins with ${followers2} followers! <br> Unfortunately, <span class="green">${musicianName1}</span> loses with only ${followers1} followers</p></div>`;
} else if (followers2 === followers1) {
    displayResults.innerHTML = `<div class= "results"><img src="${musicianPicture1}"> <img src="${musicianPicture2}"> <br> <p>Yay! Both win with ${followers2} followers</p></div>`;

}
}

catch (err){ 
    console.log(err);
    youNeedTwoArtists();
}
}


document.getElementById('followers').addEventListener('click', loaderFollowers);


// CLEAR TO PLAY AGAIN
playAgain.addEventListener('click', () => location.reload());
