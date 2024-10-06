/*
    -- رسم البيانات اللي موجوده في ال 
    -- array
    -- اللي اسمها 
    -- allSongs
*/
const songsPlace = document.querySelector("#songsPlace");
const progressArea = document.querySelector(".details-progress");

allSongs.map((ele, i) => {
  const { imgUrl } = ele;
  songsPlace.innerHTML += `
        <div>
            <img src="${imgUrl}" alt="abdo song">
            <i id="heart" class="fa-regular fa-heart"></i>
            <i onclick="playMusicOnImg(${i})" id="play_stop" class="fa-solid fa-play"></i>
        </div>
    `
});

const iconPlayOnImg = document.querySelectorAll("#songsPlace div #play_stop");

const favSongsPlace = document.querySelector(".fav-songs div");

// Start Filter Part
const favSongs = []; // array that would contain the fav songs

function AddToFav(i) {
  const song = document.querySelector(
    "#songsPlace div" + " .heart" + CSS.escape(i)
  );
  if (favSongs.includes(allSongs[i])) {
    let index = favSongs.indexOf(allSongs[i]);
    favSongs.splice(index, 1);
    song.style.color = "#FFE";
  } else {
    favSongs.push(allSongs[i]);
    song.style.color = "red";
  }

  favSongsPlace.innerHTML = "";
  allSongs.map((ele, i) => {
    if (favSongs.includes(ele)) {
      const { imgUrl } = ele;
      const { songName } = ele;
      favSongsPlace.innerHTML += `
        <div id="fav${i}" onclick="playMusicOnImg(${i})">
          <img src="${imgUrl}" />
          <h4>${songName}</h4>
        </div>
      `;
    }
  });
}

const all_Btn = document.querySelector(".all-songs");
all_Btn.onclick = function () {
  filter("All");
};

const abdo_Btn = document.querySelector(".arabic-songs #abdo");
abdo_Btn.onclick = function () {
  filter("Abelelhalim Hafez");
};

const fairouz_Btn = document.querySelector(".arabic-songs #fairouz");
fairouz_Btn.onclick = function () {
  filter("Fairouz");
};

const om_Btn = document.querySelector(".arabic-songs #om");
om_Btn.onclick = function () {
  filter("Om Kelthoom");
};

const romantic_Btn = document.querySelector(".arabic-songs #romantic");
romantic_Btn.onclick = function () {
  filter("Romantic");
};

function filter(type) {
  songsPlace.innerHTML = "";
  allSongs.map((ele, i) => {
    const { name } = ele;
    if (name == type || type == "All") {
      const { imgUrl } = ele;
      songsPlace.innerHTML += `
        <div>
            <img src="${imgUrl}" alt="abdo song">
            <i onclick="AddToFav(${i})" id="heart" class="fa-regular fa-heart heart${i}"></i>
            <i onclick="playMusicOnImg(${i})" id="play_stop" class="fa-solid fa-play"></i>
        </div>
    `;
      if (favSongs.includes(ele)) {
        const song = document.querySelector(
          "#songsPlace div" + " .heart" + CSS.escape(i)
        );
        song.style.color = "red";
      }
    }
  });
}
// End Filter Part

let iIconImg = 0;
let arr = [0];

function playMusicOnImg(i) {
  iIconImg = i;
  arr.push(iIconImg);

  if (iconPlayOnImg[i].className === "fa-solid fa-play") {

    if (arr[arr.length - 1] === arr[arr.length - 2]) {
      playMusic();

    } else {
      loadSong(iIconImg);
      playMusic();
    }


    iconPlayOnImg.forEach(function (ele) {
      ele.classList.replace("fa-pause", "fa-play");
    });

    iconPlayOnImg[i].classList.replace("fa-play", "fa-pause");
  } else if (iconPlayOnImg[i].className === "fa-solid fa-pause") {
    pauseMusic();
    iconPlayOnImg[i].classList.replace("fa-pause", "fa-play");
  }
}
// _______________________________________________ //
// التحكم في الاغاني تشغيل و ايقاف و باقي جزء التحكم
const songImg = document.querySelector(".controls .controls-info .name img");
const songerName = document.querySelector(".controls .controls-info .name div h4");
const songName = document.querySelector(".controls .controls-info .name div p");
const audio = document.querySelector("audio");

let musicIndex = 0;
let isPlaying = false;

window.addEventListener("load", () => {
    loadSong(musicIndex);
});

// Load Song Automatic When Browser Is Open
function loadSong(musicIndex) {
  songImg.src = allSongs[musicIndex].imgUrl;
  songerName.innerHTML = allSongs[musicIndex].name;
  songName.innerHTML = allSongs[musicIndex].songName;
  audio.src = allSongs[musicIndex].audioUrl;
}

const playControls = document.querySelector(".play-song");
const playIcon = document.querySelector(".play-song i");

// Play Song
function playMusic() {
  isPlaying = true;
  playIcon.classList.replace("fa-play", "fa-pause");
  audio.play();
}

// Pause Song
function pauseMusic() {
  isPlaying = false;
  playIcon.classList.replace("fa-pause", "fa-play");
  audio.pause();
}

// Run The Function Of Play And Puase Song
playControls.addEventListener("click", () => {
  if (isPlaying) {
      iconPlayOnImg[iIconImg].classList.replace("fa-pause", "fa-play");
      pauseMusic();
  } else {
      iconPlayOnImg.forEach(function (ele) {
          ele.classList.replace("fa-pause", "fa-play");
      });

      iconPlayOnImg[iIconImg].classList.replace("fa-play", "fa-pause");
      playMusic();
  }
});

// Next Song
const nextSong = document.querySelector("#next");
function next() {
    musicIndex < allSongs.length - 1 ? musicIndex++ : musicIndex = 0;
}

nextSong.addEventListener("click", () => {
  next();
  playMusicOnImg(iIconImg)
  iIconImg < allSongs.length - 1 ?
      playMusicOnImg(iIconImg + 1)
      : playMusicOnImg(0);
});

// Pravious Song
const prevSong = document.querySelector("#prev");
function prev() {
    musicIndex > 0 ? musicIndex-- : musicIndex = allSongs.length - 1;
}
prevSong.addEventListener("click", () => {
  prev();
  playMusicOnImg(iIconImg)
  iIconImg === 0 ?
      playMusicOnImg(allSongs.length - 1)
      : playMusicOnImg(iIconImg - 1);
});

// Control Song [Loop Song - Loop PlayList - Shuffle]
const repeatBtn = document.querySelector("#repeat");
repeatBtn.addEventListener("click", () => {
    let getClassName = repeatBtn.className;
    let getId = repeatBtn.id;

    if (getClassName === "fas fa-repeat" && getId === "repeat") {
        repeatBtn.innerHTML = `<span>1</span>`;
        repeatBtn.setAttribute("id", "loop-song");
        repeatBtn.title = "loop song"
    } else if (getClassName === "fas fa-repeat" && getId === "loop-song") {
        repeatBtn.innerHTML = null;
        repeatBtn.removeAttribute("id");
        repeatBtn.className = "fas fa-random";
        repeatBtn.title = "Shuffle";
    } else {
        repeatBtn.className = "fas fa-repeat";
        repeatBtn.setAttribute("id", "repeat")
        repeatBtn.title = "loop list";
    }
});

/*
    -- ال 
    -- audio
    -- لما يخلص هشوف انا في انهي حاله سواء 
    -- loop song or loop list or shuffle
*/

audio.addEventListener("ended", () => {
  if (repeatBtn.className === "fas fa-repeat" && repeatBtn.id === "repeat") {
      next();
      playMusicOnImg(musicIndex);
  } else if (repeatBtn.className === "fas fa-repeat" && repeatBtn.id === "loop-song") {
      audio.currentTime = 0;
      loadSong(iIconImg);
      playMusic();
  } else {
      let shuffleIndex = Math.floor(Math.random() * (allSongs.length));
      do {
          shuffleIndex = Math.round(Math.random() * (allSongs.length))
      } while (musicIndex == shuffleIndex) {
          musicIndex = shuffleIndex;
          loadSong(musicIndex);
          playMusicOnImg(iIconImg);
      }
      playMusicOnImg(shuffleIndex);
  }
});

// Time Progress 
let progress = document.querySelector(".details-progress .progress");
let currentTimePart = document.querySelector(".current-time");
let durationPart = document.querySelector(".duration");

audio.addEventListener("timeupdate", (e) => {
    const currentTime = e.target.currentTime;
    const duration = e.target.duration;
    let progressWith = (currentTime / duration) * 100;
    progress.style.width = `${progressWith}%`;


    audio.addEventListener("loadeddata", () => {
        // Start Interval When AUdio started
        const intervalTime = setInterval(() => {
            const prevTime = audio.currentTime;
            currentTimePart.innerHTML = formatTIme(prevTime);
        }, 1000);
        const durationTime = audio.duration;
        durationPart.innerHTML = formatTIme(durationTime);
        // Clear Interval When Audio Ended
        audio.addEventListener("ended", () => {
            clearInterval(intervalTime);
        });
    })
});

// Fomating Time 
function formatTIme(time) {
  if (time && !isNaN(time)) {
      const minutes = Math.floor(time / 60) < 10 ? `0${Math.floor(time / 60)}` : Math.floor(time / 60);
      const seconds = Math.floor(time % 60) < 10 ? `0${Math.floor(time % 60)}` : Math.floor(time % 60);
      return `${minutes}:${seconds}`
  }
  return "00:00"
}

// With Of The Song When Click On The ProgressBar 
progressArea.addEventListener("click", (e) => {
  let clickedOffestX = e.offsetX;
  let progressWithBar = progressArea.clientWidth;
  let songDuration = audio.duration;
  audio.currentTime = (clickedOffestX / progressWithBar) * songDuration;
  // To Run The Song When Clicked On The Progress
  playMusic();
})
