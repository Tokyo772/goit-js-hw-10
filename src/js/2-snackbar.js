import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const elements = {
  form: document.querySelector('.form'),
  input: document.querySelector('[name="delay"]'),
  label: document.querySelector('[name="state"]'),
};

elements.form.addEventListener('input', handlerInput);
elements.form.addEventListener('submit', handlerSubmit);

function handlerInput(evt) {
  const choseNumber = elements.input.value;
  const choseStatus = document.querySelector('[name="state"]:checked')?.value;
  console.log(choseNumber);
  console.log(choseStatus);
}

function handlerSubmit(evt) {
  evt.preventDefault();
}
