
import flatpickr from "flatpickr";
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import "flatpickr/dist/flatpickr.min.css";



const time = 1000;
const imputDatePickerEl = document.querySelector('#datetime-picker');
const btnStartEl = document.querySelector('button[data-start]');
const daysEl = document.querySelector('[data-days]');
const hoursEl = document.querySelector('[data-hours]');
const minutesEl = document.querySelector('[data-minutes]');
const secondsEl = document.querySelector('[data-seconds]');


let timeDifference = 0;
let timerId = null;
let formatDate = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    
    currentDifferenceDate(selectedDates[0]);
    console.log(selectedDates[0]);
  },
};

btnStartEl.setAttribute('disabled', true);

flatpickr(imputDatePickerEl, options);

btnStartEl.addEventListener('click', onBtnStart);

window.addEventListener('keydown', event => {
  if (event.code === 'Escape' && timerId) {
    clearInterval(timerId);

    imputDatePickerEl.removeAttribute('disabled');
    btnStartEl.setAttribute('disabled', true);

    secondsEl.textContent = '00';
    minutesEl.textContent = '00';
    hoursEl.textContent = '00';
    daysEl.textContent = '00';
  };
});

function onBtnStart() {
  timerId = setInterval(startTimer, time);
};

function currentDifferenceDate(selectedDates) {
  const currentDate = Date.now();

  if (selectedDates < currentDate) {
    btnStartEl.toggleAttribute('disabled', true);
    return Notify.failure('Please choose a date in the future');
  };

  timeDifference = selectedDates.getTime() - currentDate;
  formatDate = convertMs(timeDifference);

  renderDate(formatDate);
  btnStartEl.removeAttribute('disabled');
};

function startTimer() {
  btnStartEl.toggleAttribute('disabled', true);
  imputDatePickerEl.toggleAttribute('disabled', true);

  timeDifference -= 1000;

  if (secondsEl.textContent <= 0 && minutesEl.textContent <= 0) {
    Notify.success('Time end');
    clearInterval(timerId);
  } else {
    formatDate = convertMs(timeDifference);
    renderDate(formatDate);
  };
};


function renderDate(formatDate) {
  secondsEl.textContent = formatDate.seconds;
  minutesEl.textContent = formatDate.minutes;
  hoursEl.textContent = formatDate.hours;
  daysEl.textContent = formatDate.days;
};


function pad(value) {
  return String(value).padStart(2, '0');
  };


function convertMs(ms) {
  let second = 1000;
  let minute = second * 60;
  let hour = minute * 60;
  let day = hour * 24;

  const days = pad(Math.floor(ms / day)); 
  const hours = pad(Math.floor((ms % day) / hour));
  const minutes = pad( Math.floor(((ms % day) % hour) / minute));
  const seconds = pad( Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
};
    

