let playBtns = document.querySelectorAll(".playButton");
let songCards = document.querySelectorAll(".card");
let playBar = document.querySelector(".playbar");
let currentSongTime = document.querySelector('.currentSongTime');
let songDuration = document.querySelector('.songDuration');
let currentlyPlayingWidget = document.querySelector('.now-playing-widget');
let progressCircle = document.querySelector('.progress-bar-circle')
let playbackBarFill = document.querySelector('.playback-bar > .fill')
let playbackBar = document.querySelector('.playback');
let seekBar = document.querySelector('.playback-bar')
let currentSongURL = '';
async function getSongs() {

    let a = await fetch("./SPOTIFY-PROFILE-PAGE/songs/");
    let response = await a.text();
    let element = document.createElement("div");
    element.innerHTML= response;
    let list = element.getElementsByTagName("a");

    let songs = [];
    for (let j=0; j<list.length; j++ ) {
        const temp = list[j];
        if (temp.href.endsWith(".mp3")) {
           songs.push(temp.href);
        }
    }
    return songs;
}

let audio = new Audio();
let pausePosition = 0;
let tempURL = '';
function playMusic(track) {
    let songURL = './SPOTIFY-PROFILE-PAGE/songs/'+ track 
    currentSongURL = songURL;
    audio.src = songURL;
    if (tempURL === songURL) {
        audio.currentTime = pausePosition;
        pausePosition = 0;
    }
    else {
        audio.currentTime = 0;
        currentSongTime.innerText = '0:00';
        playbackBarFill.style.width = '0%';
    }
    tempURL = songURL;
    audio.play();
}
function pauseMusic(track) {
    let songURL = './SPOTIFY-PROFILE-PAGE/songs/'+ track 
    currentSongURL = songURL;
    pausePosition = audio.currentTime;
    audio.pause();
}

audio.addEventListener('loadedmetadata', function(e){
    let temp = audio.duration;
    var minutes = Math.floor(temp/60);
    var seconds = Math.ceil(temp%60);
    if (seconds < 10) {
        songDuration.innerText = (minutes + ':' + '0' + seconds);
    }
    else {
        songDuration.innerText = (minutes + ':' + seconds);
    }
})
// audio.addEventListener('timeupdate', function(e){
//     let currentTime = audio.currentTime;
//     currentSongTime.innerText = currentTime;
// })
var intervalID = setInterval(function(){
    let currentTime = audio.currentTime;
    var minutes = Math.floor(currentTime/60);
    var seconds = Math.ceil(currentTime%60);
    if (seconds < 10) {
        currentSongTime.innerText = (minutes + ':' + '0' + seconds);
    }
    else {
        currentSongTime.innerText = (minutes + ':' + seconds);
    }
    // progressCircle.style.left = (audio.currentTime/audio.duration)*100 + '%';
    playbackBarFill.style.width = (audio.currentTime/audio.duration)*100 + '%'

    if (audio.duration === audio.currentTime) {
        controlPause.style.visibility = 'hidden';
        controlPlay.style.visibility = 'visible';
        // clearInterval(intervalID);
    }
},1000)
audio.addEventListener('ended', function(e){
    for (let k=0; k<playBtns.length; k++ ) {
        var tempClicked = playBtns[k].getAttribute("isClicked");
        var svgElement = playBtns[k].querySelector(".pauseBtn");
        var faPlay = playBtns[k].querySelector(".fa-play");

        if (tempClicked === 'true') {
            faPlay.style.visibility = 'visible';
            svgElement.style.visibility = 'hidden';
            playBtns[k].setAttribute('isClicked','false');
        }
    }
})

for (let j=0; j<playBtns.length; j++) {
    playBtns[j].addEventListener("click",function(e){
        playBar.style.visibility = 'visible'
        playBar.style.position = 'fixed'

        let songCard = playBtns[j].parentNode;
        let songName = songCard.querySelector('.song-title').innerText;
        let artistsName = songCard.querySelector('p').innerText;
        let songImg = songCard.querySelector('img').src;
     
        currentlyPlayingWidget.innerHTML = `<img class="song-banner" src=${songImg} alt="">
        <div class="song-details">
            <div class="song-title">${songName}</div>
            <div class="song-artists ellipsis">
                ${artistsName}
            </div>
        </div>
        <div class="heart-container">
        <i class="fa-regular fa-heart"></i>
        <i class="fa-solid fa-heart"></i>
        </div>`


        let regularHeart = document.querySelector('.heart-container > .fa-regular');
        let solidHeart = document.querySelector('.heart-container>.fa-solid')
        let isLiked = false;
        regularHeart.addEventListener("click",function(e){
            regularHeart.style.visibility = 'hidden';
            solidHeart.style.visibility = 'visible';
            isLiked = true;
        })
        solidHeart.addEventListener("click",function(e){
            regularHeart.style.visibility = 'visible';
            solidHeart.style.visibility = 'hidden';
            isLiked = false;
        })

        for (let k=0; k<playBtns.length; k++ ) {
            var tempClicked = playBtns[k].getAttribute("isClicked");
            var svgElement = playBtns[k].querySelector(".pauseBtn");
            var faPlay = playBtns[k].querySelector(".fa-play");

            if ((j!=k) && tempClicked === 'true') {
                faPlay.style.visibility = 'visible';
                svgElement.style.visibility = 'hidden';
                playBtns[k].setAttribute('isClicked','false');
            }
        }
        var svgElement = this.querySelector(".pauseBtn");
        var faPlay = this.querySelector(".fa-play");
        var dataClicked = this.getAttribute("isClicked");
        var songTitle = songCards[j].querySelector(".song-title").innerText + '.mp3';

        if (dataClicked === 'false') {
          faPlay.style.visibility = 'hidden';
          svgElement.style.visibility = 'visible';
          this.setAttribute('isClicked','true');
          // control bar settings
          controlPlay.style.visibility = 'hidden';
          controlPause.style.visibility = 'visible';

          playMusic(songTitle);
        }
        else {
          faPlay.style.visibility = 'visible';
          svgElement.style.visibility = 'hidden';
          this.setAttribute('isClicked','false');
          // Control bar settings
          controlPause.style.visibility = 'hidden';
          controlPlay.style.visibility = 'visible'; 

          pauseMusic(songTitle);
        }
    })
}

// Card on Click : 





//Attach an event listener to play, next and previous
let controlPlay = document.querySelector('.control-button-playpause > img');
let controlPause = document.querySelector('.control-button-playpause > .fa-circle-pause')


controlPlay.addEventListener("click", function(e){
    controlPlay.style.visibility = 'hidden';
    controlPause.style.visibility = 'visible';

    // for (let j=0; j<playBtns.length; j++) {
    //     var svgElement = this.querySelector(".pauseBtn");
    //     var faPlay = this.querySelector(".fa-play");
    // }
    audio.play();
})
controlPause.addEventListener("click", function(e){
    controlPause.style.visibility = 'hidden';
    controlPlay.style.visibility = 'visible';
    audio.pause();
})

// Adding Seeking feature to the seekbar
playbackBar.addEventListener('mousedown', function(event){
    const rect = seekBar.getBoundingClientRect();
    const clickX = event.clientX - rect.left;
    const percentage = ((clickX / seekBar.offsetWidth)*100).toFixed(2);

    playbackBarFill.style.width = percentage + '%';
    audio.currentTime = (percentage * audio.duration)/100;
    let currentTime = audio.currentTime;
    var minutes = Math.floor(currentTime/60);
    var seconds = Math.ceil(currentTime%60);
    if (seconds < 10) {
        currentSongTime.innerText = (minutes + ':' + '0' + seconds);
    }
    else {
        currentSongTime.innerText = (minutes + ':' + seconds);
    }
})

// Adding Scrubbing functionality to the seekbar
// let isSrubbing = false;
// seekBar.addEventListener('mousedown',function(e){
//     isSrubbing = true;
// })
// seekBar.addEventListener('mousemove',function(event){
//     if (isSrubbing){
//         const rect = seekBar.getBoundingClientRect();
//         const clickX = event.clientX - rect.left;
//         const percentage = ((clickX / seekBar.offsetWidth)*100).toFixed(2);

//         playbackBarFill.style.width = percentage + '%';
//         let currentTime = (percentage * audio.duration)/100;
//         var minutes = Math.floor(currentTime/60);
//         var seconds = Math.ceil(currentTime%60);
//         if (seconds < 10) {
//             currentSongTime.innerText = (minutes + ':' + '0' + seconds);
//         }
//         else {
//             currentSongTime.innerText = (minutes + ':' + seconds);
//         }
//     }
// })
// seekBar.addEventListener('mouseup',function(event){
//     // audio.currentTime = 
//     const rect = seekBar.getBoundingClientRect();
//     const clickX = event.clientX - rect.left;
//     const percentage = ((clickX / seekBar.offsetWidth)*100).toFixed(2);
//     audio.currentTime = (percentage * audio.duration)/100;
//     isSrubbing = false;
// })