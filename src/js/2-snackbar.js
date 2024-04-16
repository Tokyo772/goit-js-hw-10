import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const elements = {
  form: document.querySelector('.form'),
  input: document.querySelector('input[name="delay"]'),
  btnSubmit: document.querySelector('button'),
};

const iziSuccessOptions = {
  title: '✅',
  titleSize: '24px',
  messageColor: 'white',
  messageSize: '16px',
  backgroundColor: 'lightgreen',
  position: 'topRight',
  timeout: 3000,
};
const iziRejectOptions = {
  title: '❌',
  titleSize: '24px',
  messageColor: 'white',
  messageSize: '16px',
  backgroundColor: 'rgba(225, 0, 0, 0.3)',
  position: 'topRight',
  timeout: 3000,
};
elements.form.addEventListener('submit', handlerSubmit);

function handlerSubmit(evt) {
  evt.preventDefault();
  const { delay, state } = evt.target.elements;
  const selectedDelay = delay.value;
  const selectedStatus = state.value;

  createPromise(selectedDelay, selectedStatus)
    .then(value => {
      return value;
    })
    .catch(err => {
      return err;
    });
  elements.form.reset();
}

function createPromise(selectedDelay, selectedStatus) {
  return new Promise((res, rej) => {
    setTimeout(() => {
      if (selectedStatus === 'fulfilled') {
        res(
          iziToast.show({
            ...iziSuccessOptions,
            message: `Fulfilled promise in ${selectedDelay}ms`,
          })
        );
      } else {
        rej(
          iziToast.show({
            ...iziRejectOptions,
            message: `Rejected promise in ${selectedDelay}ms`,
          })
        );
      }
    }, selectedDelay * 1000);
  });
}
