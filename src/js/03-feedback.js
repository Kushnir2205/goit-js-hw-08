import localStorageAPI from './localstorage.js';
import throttle from 'lodash.throttle';

const inputForm = document.querySelector('.feedback-form');

let userInfo = {};

const fillContactFormFields = () => {
  const userInfoFromLS = localStorageAPI.load('feedback-form-state');

  if (userInfoFromLS) {
    for (const key in userInfoFromLS) {
      userInfo[key] = userInfoFromLS[key];
      inputForm.elements[key].value = userInfoFromLS[key];
    }
  }
};
fillContactFormFields();

const onInputFormData = event => {
  const inputFieldEl = event.target;
  const inputFieldValue = inputFieldEl.value.trim();
  const inputFieldName = inputFieldEl.name;
  userInfo[inputFieldName] = inputFieldValue;

  localStorageAPI.save('feedback-form-state', userInfo);
};
const onSubmitFormData = event => {
  event.preventDefault();
  const inputForm = event.target;
  if (
    event.target.elements.email.value &&
    event.target.elements.message.value
  ) {
    console.log(userInfo);
    inputForm.reset();
    localStorageAPI.remove('feedback-form-state');
    userInfo = {};
  } else {
    alert('Всі поля повинні бути заповнені!');
  }
};

inputForm.addEventListener('input', throttle(onInputFormData, 500));
inputForm.addEventListener('submit', onSubmitFormData);
