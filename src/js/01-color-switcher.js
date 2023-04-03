//^ Add import 
import '../css/common.css';

//^ Add refs 
const refs = {
    body: document.querySelector('body'),
    startBtn: document.querySelector('[data-start]'),
    stopBtn: document.querySelector('[data-stop]'),
};

let intervalId = null;

//^ Add EventListeners
refs.startBtn.addEventListener('click', startChangeColor);
refs.stopBtn.addEventListener('click', stopChangeColor);

//^Add functions
 function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}

function startChangeColor(e) {
    refs.startBtn.disabled = true;
    refs.stopBtn.classList.add('active');
    refs.startBtn.classList.remove('active');
    refs.stopBtn.disabled = false;
    refs.body.style.backgroundColor = getRandomHexColor();
    intervalId = setInterval(() => {
    refs.body.style.backgroundColor = getRandomHexColor();
    }, 1000);
}

function stopChangeColor(e) {
    refs.stopBtn.disabled = true; 
    refs.startBtn.disabled = false;
    refs.startBtn.classList.add('active');
    refs.stopBtn.classList.remove('active');
    clearInterval(intervalId);
}

//!Second variant to solve the task

// //^ Add consts
// const body = document.querySelector('body');
// const startBtn = document.querySelector('[data-start]');
// const stopBtn = document.querySelector('[data-stop]');

// let intervalId = null;

// //^ Add EventListeners
// startBtn.addEventListener('click', startChangeColor);
// stopBtn.addEventListener('click', stopChangeColor);

// //^ Add functions
// function getRandomHexColor() {
//   return `#${Math.floor(Math.random() * 16777215)
//     .toString(16)
//     .padStart(6, 0)}`;
// }

// function startChangeColor(e) {
//     stopBtn.removeAttribute('disabled');
//     startBtn.setAttribute('disabled', true); //* startBtn is active by default
//     body.style.backgroundColor = getRandomHexColor();
//     intervalId = setInterval(() => {
//     body.style.backgroundColor = getRandomHexColor();
//     }, 1000);
// }

// function stopChangeColor(e) {
//     stopBtn.setAttribute('disabled', true);//* stopBtn is disabled by default
//     startBtn.removeAttribute('disabled'); 
//     clearInterval(intervalId);
// }