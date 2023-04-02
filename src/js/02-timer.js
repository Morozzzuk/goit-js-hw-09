//^ Add imports

//* Описаний в документації
import flatpickr from 'flatpickr';
//* Додатковий імпорт стилів
import 'flatpickr/dist/flatpickr.min.css';
//* Add library for displaying messages to the user 
import Notiflix from 'notiflix';

//^ Add consts
const input = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('[data-start]');
const daysField = document.querySelector('[data-days]');
const hrsField = document.querySelector('[data-hours]');
const minsField = document.querySelector('[data-minutes]');
const secsField = document.querySelector('[data-seconds]');

startBtn.setAttribute('disabled', true);
let endTime = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] <= Date.now()) {
      Notiflix.Notify.failure('Please choose a date in the future', {
        position: 'center-top',
      });
    } else {
      startBtn.removeAttribute('disabled');
      endTime = selectedDates[0];
    }
  },
};

flatpickr('#datetime-picker', options);

class Timer {
    constructor({ onTick }) {
        this.intervalId = null;
        this.onTick = onTick;
    }

    start() {
    this.intervalId = setInterval(() => {
      const currentTime = Date.now();
      const deltaTime = endTime - currentTime;

      if (deltaTime >= 0) {
        const time = this.convertMs(deltaTime);
        this.onTick(time);
      } else {
        clearInterval(this.intervalId);
      }
    }, 1000);
  }

    convertMs(ms) {
    //* Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    //* Remaining days
    const days = this.addLeadingZero(Math.floor(ms / day));
          
    //* Remaining hours
    const hours = this.addLeadingZero(Math.floor((ms % day) / hour));
          
    //* Remaining minutes
          
    const minutes = this.addLeadingZero(
      Math.floor(((ms % day) % hour) / minute)
    );
          
    //* Remaining seconds    
    const seconds = this.addLeadingZero(
      Math.floor((((ms % day) % hour) % minute) / second)
    );

    return { days, hours, minutes, seconds };
  }
//* Add zero before if is one number
  addLeadingZero(value) {
    return String(value).padStart(2, '0');
  }
}

const timer = new Timer({
  onTick: updateClock,
});
//* Add event listener for startBtn
startBtn.addEventListener('click', () => {
    timer.start();
    startBtn.setAttribute('disabled', true);
});
//* Add function
function updateClock({ days, hours, minutes, seconds }) {
  daysField.textContent = `${days}`;
  hrsField.textContent = `${hours}`;
  minsField.textContent = `${minutes}`;
  secsField.textContent = `${seconds}`;
}