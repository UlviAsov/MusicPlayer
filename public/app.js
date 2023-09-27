//container and inside
const container = document.querySelector(".container");
const img = document.querySelector("#music-image");
const title = document.querySelector("#music-details .title");
const singer = document.querySelector("#music-details .singer");
// icons
const play = document.querySelector("#controls #play");
const next = document.querySelector("#controls #next");
const prev = document.querySelector("#controls #prev");
//times
const currentTime = document.querySelector("#current-time");
const duration = document.querySelector("#duration");
const progressBar = document.querySelector("#progress-bar");
//volume
const volume = document.querySelector("#volume");
const volumeBar = document.querySelector("#volume-bar")

const ul = document.querySelector("ul")


const player = new MusicPlayer(musicList);

window.addEventListener("load", () => {
    let music = player.getMusic();
    displayMusic(music);
    displayMusicList(player.musicList);
    isPlayingNow();
});

function displayMusic(music){
    title.innerText = music.title;
    singer.innerText = music.singer;
    img.src = "img/" + music.img;
    audio.src = "mp3/" + music.file;
}
//Prev Music
prev.addEventListener("click", ()=>{ prevMusic();});
function prevMusic(){
    player.previous();
    let music = player.getMusic();
    displayMusic(music);
    playMusic();
    isPlayingNow();
}
//Next Music
next.addEventListener("click", ()=>{ nextMusic();});
function nextMusic(){
    player.next();
    let music = player.getMusic();
    displayMusic(music);
    playMusic();
    isPlayingNow();
}
play.addEventListener("click", () => {
    const isMusicPlay = container.classList.contains("playing")
    isMusicPlay ? pauseMusic() : playMusic();
});

function pauseMusic(){
    container.classList.remove("playing");
    play.classList = "fa-solid fa-play"
    audio.pause();
}

function playMusic(){
    container.classList.add("playing");
    play.classList = "fa-solid fa-pause"
    audio.play();
}

const calculateTime = (generalSeconds) => {
    const minute = Math.floor(generalSeconds /60);
    const second = Math.floor(generalSeconds % 60);
    const updateSecond = second < 10 ? `0${second}` : `${second}`
    const result = `${minute}:${updateSecond}`;
    return result;
}

audio.addEventListener("loadedmetadata",()=>{
    duration.textContent = calculateTime(audio.duration);
    progressBar.max = Math.floor(audio.duration)
});

audio.addEventListener("timeupdate", ()=>{
    progressBar.value = Math.floor(audio.currentTime);
    currentTime.textContent = calculateTime(progressBar.value);
});

progressBar.addEventListener("input", ()=>{
    currentTime.textContent = calculateTime(progressBar.value);
    audio.currentTime = progressBar.value;
});


let muteState = "sesli";

volumeBar.addEventListener("input",(e)=>{
    const value = e.target.value;
    audio.volume = value / 100;
    if(value == 0){
        audio.muted = true;
        muteState = "sessiz"
        volume.classList = "fa-solid fa-volume-xmark"
    }
    else{
        audio.muted = false;
        muteState = "sesli"
        volume.classList = "fa-solid fa-volume-high"
    }
});

volume.addEventListener("click", ()=>{
    if(muteState==="sesli"){
        audio.muted = true;
        muteState = "sessiz"
        volume.classList = "fa-solid fa-volume-xmark"
        volumeBar.value = 0;
    }
    else{
        audio.muted = false;
        muteState = "sesli"
        volume.classList = "fa-solid fa-volume-high"
        volumeBar.value = 100;
    }
});

const displayMusicList = (list) => {
    for(let i = 0; i < list.length; i++){
        let liTag = `
            <li li-index = '${i}' onclick="selectedMusic(this)">
              <span>${list[i].getName()}</span>
              <span id="music-${i}"></span>
              <audio class="music-${i}" src="mp3/${list[i].file}"></audio>
            </li>
        `;
        ul.insertAdjacentHTML("beforeend", liTag)

        let liAudioDuration = ul.querySelector(`#music-${i}`);
        let liAudioTag = ul.querySelector(`.music-${i}`);

        liAudioTag.addEventListener("loadeddata",()=>{
            liAudioDuration.innerText = calculateTime(liAudioTag.duration);
        });

    }
}

function selectedMusic(li){
    player.index = li.getAttribute("li-index");
    displayMusic(player.getMusic());
    playMusic();
    isPlayingNow();
}

function isPlayingNow(){
    for(let li of ul.querySelectorAll("li")){
        if(li.classList.contains("playing")){
            li.classList.remove("playing")
        }
        if(li.getAttribute("li-index") == player.index){
            li.classList.add("playing")
        }
    }
}