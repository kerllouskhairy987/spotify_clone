// For Make Active Type Of List Has A Spacial BackgroundColor
let labels = document.querySelectorAll(".container .aside > div > div label");
let dCheckedInp = document.querySelector(".all-songs label input");
// Appear Arabic List When Click On Arabic Songs
let arabicList = document.querySelector(".arabic-songs div");
let favList = document.querySelector(".fav-songs div");

labels.forEach((ele, i) => {
  ele.onclick = function () {
    labels.forEach((ele) => {
      ele.classList.remove("active");
    });
    this.classList.add("active");
    if (i === 1) {
      arabicList.classList.add("active");
      favList.classList.remove("active");
    } else if (i == 3) {
      arabicList.classList.remove("active");
      favList.classList.add("active");
    } else {
      arabicList.classList.remove("active");
      favList.classList.remove("active");
    }
  };
  dCheckedInp.checked = true;
});
// ********** END
// For Make Active Type Of List Of Arabic Song Has A Spacial BackgroundColor
let songBranch = document.querySelectorAll(".songs-section > div div");
songBranch.forEach((ele) => {
  ele.onclick = function () {
    songBranch.forEach((ele) => {
      ele.classList.remove("active");
    });
    this.classList.add("active");
  };
});
// ********** END

// Responsive Menu
let aside = document.querySelector(".aside");
let close_aside = document.querySelector("#close_aside");
function appearMenu() {
  aside.classList.add("active");
}
function disappearMenu() {
  aside.classList.remove("active");
}
