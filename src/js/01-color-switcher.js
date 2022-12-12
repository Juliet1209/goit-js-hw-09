



const colorСhange = 1000;
const btnStart = document.querySelector("[data-start]");
const btnStop = document.querySelector("[data-stop]");
const body = document.querySelector('body');

btnStart.addEventListener('click', onBtnStart,);
btnStop.addEventListener('click', onBtnStop,);
 
let intervalId = null;

function onBtnStart() {
    intervalId = setInterval(() => {
        body.style.backgroundColor = getRandomHexColor()
    }, colorСhange);

    btnStart.toggleAttribute('disabled');
};

function onBtnStop() {
    clearInterval(intervalId)

    btnStart.removeAttribute('disabled');
};

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
};
