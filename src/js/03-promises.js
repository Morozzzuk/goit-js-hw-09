//^ Add imports
//* Add library for displaying messages to the user 
import Notiflix from 'notiflix';

//^  Add consts
const form = document.querySelector('.form');
const delay = document.querySelector('[name="delay"]');
const step = document.querySelector('[name="step"]');
const amount = document.querySelector('[name="amount"]');

//^Add EventListener to form
form.addEventListener('submit', onFormSubmit);

//^ Add Functions 
function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;

    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

function onFormSubmit(e) {
  e.preventDefault();
if (delay.value <= 0 || step.value <= 0 || amount.value <= 0) {
    return Notiflix.Report.warning(
      'The number must be greater than 0',
      'Try again'
    );
}
  
  let delayTime = Number(delay.value);

  for (let i = 1; i <= amount.value; i += 1) {
    let id = i;

    createPromise(id, delayTime)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(
          `✅ Fulfilled promise ${position} in ${delay}ms`
        );
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(
          `❌ Rejected promise ${position} in ${delay}ms`
        );
      });

    delayTime += Number(step.value);
  }

  e.target.reset();
}
