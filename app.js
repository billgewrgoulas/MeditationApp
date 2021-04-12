'use strict';

const buttons = document.querySelector('.duration-buttons');
const video = document.querySelector('.video');
const sound = document.querySelector('.sound');
const timer = document.querySelector('.timer');
const state = document.querySelector('.icon');
const bigBtn = document.querySelector('.js-big-button');
const picker = document.querySelectorAll('.js-sound');


var isPlaying = false;

var countdown = null;
var myTimer = null;
var minutes = null;
var seconds = 59;
var duration = null;

const dataPicker = function(event) {

    const picked = event.target.closest(".js-sound").dataset.picker;

    //guard clause
    if (!picked) {
        return;
    }

    const paths = picked.split("-");

    setTimeout(function() {

        video.pause();

        sound.children[0].src = paths[0];
        video.children[0].src = paths[1];

        video.load();
        sound.load();

    }, 1);

}

const playVideo = function(event) {

    if (!isPlaying) {
        video.play();
        sound.play();
        state.classList.remove('fa-play');
        state.classList.add('fa-pause');
        state.style.marginLeft = "0px";
        timerFunction();
    } else {
        video.pause();
        sound.pause();
        state.classList.add('fa-play');
        state.classList.remove('fa-pause');
        state.style.marginLeft = "1.3rem";
        clearInterval(myTimer);
    }
    isPlaying = !isPlaying;
}

const timerFunction = function() {

    seconds = 59;
    const durationTotal = timer.innerHTML.split(":");
    duration = durationTotal[0] * 60 + 1 * durationTotal[1];

    //in case user paused
    if (durationTotal[1] < 59 && durationTotal[1] > 0) {
        //convert to number
        seconds = 1 * durationTotal[1];
    }

    myTimer = 0;
    myTimer = setInterval(() => {
        duration--;
        minutes = Math.floor(duration / 60);
        if (minutes < 10) {
            countdown = "0" + minutes + ":";
        } else {
            countdown = minutes + ":";
        }
        if (seconds < 10) {
            countdown = countdown + "0" + seconds;
        } else {
            countdown = countdown + seconds;
        }
        timer.innerHTML = countdown;
        seconds--;
        if (seconds === -1) {
            seconds = 59;
        }
        if (duration === 0) {
            timer.innerHTML = "01:00";
            playVideo();
            clearInterval(myTimer);
        }
    }, 1000);
}

const initializeTimer = function(event) {

    const clicked = event.target.closest("button");
    var duration = clicked.dataset.duration;

    //guard clause
    if (!clicked) {
        return;
    }

    var minutes = Math.floor(duration / 60);
    if (minutes < 10) {
        countdown = "0" + minutes + ":";
    } else {
        countdown = minutes + ":";
    }
    timer.innerHTML = countdown + "00";
    clearInterval(myTimer);
    video.pause();
    sound.pause();

}

buttons.addEventListener('click', initializeTimer);
bigBtn.addEventListener('click', playVideo);

bigBtn.addEventListener("mouseover", () => {
    state.classList.add("moved");
})

bigBtn.addEventListener("mouseout", () => {
    state.classList.remove("moved");
})

for (var i = 0; i < picker.length; i++) {
    picker[i].addEventListener("click", dataPicker);
}


