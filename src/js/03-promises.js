

import Notiflix from 'notiflix';

const formEl = document.querySelector('.form');

formEl.addEventListener('submit', onFormSubmit);

function onFormSubmit(event) {
  event.preventDefault();
  
  let mainDelay = event.currentTarget.delay.valueAsNumber;
  const delayStep = event.currentTarget.step.valueAsNumber;
  const amountOfPromise = event.currentTarget.amount.valueAsNumber;
  

  for (let position = 1; position <= amountOfPromise; position += 1) {
    createPromise(position, mainDelay);
    mainDelay += delayStep;
  };
};

function createPromise(position, delay) {
  const promise = new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;

    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });

  promise.then(({ position, delay }) => {
      Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
    }).catch(({ position, delay }) => {
      Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
    });
};
