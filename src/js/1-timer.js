import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const elements = {
  btnStart: document.querySelector('.btn-start'),
  input: document.querySelector('.input'),
  day: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};

elements.btnStart.setAttribute('disabled', '');
let userSelectedDate = null;
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const currentDate = new Date();
    if (selectedDates[0] > currentDate) {
      elements.btnStart.removeAttribute('disabled');
      userSelectedDate = selectedDates[0];
    } else {
      iziToast.show({
        title: 'Error',
        message: 'Please choose a date in the future',
      });

      elements.btnStart.setAttribute('disabled', '');
    }
  },
};
flatpickr('#datetime-picker', options);

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  let days = Math.floor(ms / day);
  let hours = Math.floor((ms % day) / hour);
  let minutes = Math.floor(((ms % day) % hour) / minute);
  let seconds = Math.floor((((ms % day) % hour) % minute) / second);

  if (ms <= 0) {
    days = 0;
    hours = 0;
    minutes = 0;
    seconds = 0;
  }
  return {
    days: addLeadingZero(days),
    hours: addLeadingZero(hours),
    minutes: addLeadingZero(minutes),
    seconds: addLeadingZero(seconds),
  };
}

elements.btnStart.addEventListener('click', handlerTimer);

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function handlerTimer() {
  if (!userSelectedDate) {
    return;
  }

  const currentDate = new Date();
  const milliseconds = userSelectedDate.getTime() - currentDate.getTime();
  const timeParts = convertMs(milliseconds);

  elements.day.textContent = timeParts.days;
  elements.hours.textContent = timeParts.hours;
  elements.minutes.textContent = timeParts.minutes;
  elements.seconds.textContent = timeParts.seconds;

  setInterval(() => {
    const newCurrentDate = new Date();
    const newMilliseconds =
      userSelectedDate.getTime() - newCurrentDate.getTime();
    const newTimeParts = convertMs(newMilliseconds);

    elements.day.textContent = newTimeParts.days;
    elements.hours.textContent = newTimeParts.hours;
    elements.minutes.textContent = newTimeParts.minutes;
    elements.seconds.textContent = newTimeParts.seconds;
  }, 1000);

  elements.btnStart.setAttribute('disabled', '');
  elements.input.setAttribute('disabled', '');
}
