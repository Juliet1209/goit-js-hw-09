import flatpickr from 'flatpickr';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import 'flatpickr/dist/flatpickr.min.css';

let getRef = selector => document.querySelector(selector);
const imputDatePicker = getRef('#datetime-picker');
const btnStart = getRef('[data-start]');
const days = getRef('[data-days]');
const hours = getRef('[data-hours]');
const minutes = getRef('[data-minutes]');
const seconds = getRef('[data-seconds]');

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
  },
};

btnStart.setAttribute('disabled', true);
btnStart.addEventListener('click', onBtnStart);

flatpickr(imputDatePicker, options);

function onBtnStart() {
  timerId = setInterval(startTimer, 1000);
}

function currentDifferenceDate(selectedDates) {
  const currentDate = Date.now();

  if (selectedDates < currentDate) {
    btnStart.setAttribute('disabled', true);
    return Notify.failure('Please choose a date in the future');
  }

  timeDifference = selectedDates.getTime() - currentDate;
  formatDate = convertMs(timeDifference);

  renderDate(formatDate);
  btnStart.removeAttribute('disabled');
}

function startTimer() {
  btnStart.setAttribute('disabled', true);
  imputDatePicker.setAttribute('disabled', true);

  timeDifference -= 1000;

  if (seconds.textContent <= 0 && minutes.textContent <= 0) {
    Notify.success('Time out');
    clearInterval(timerId);
  } else {
    formatDate = convertMs(timeDifference);
    renderDate(formatDate);
  }
}

function renderDate(formatDate) {
  seconds.textContent = formatDate.seconds;
  minutes.textContent = formatDate.minutes;
  hours.textContent = formatDate.hours;
  days.textContent = formatDate.days;
}

function addLeadingZero(value) {
    return String(value).padStart(2, 0)
};

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days =addLeadingZero( Math.floor(ms / day)) ;
  const hours = addLeadingZero(Math.floor((ms % day) / hour) );
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute)) ;
  const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}


