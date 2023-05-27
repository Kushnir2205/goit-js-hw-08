import localStorageAPI from './localstorage.js';
import throttle from 'lodash.throttle';

const inputForm = document.querySelector('.feedback-form');
const input = document.querySelector('input');
const textarea = document.querySelector('textarea');

console.log(inputForm);
const userInfo = {};

const fillContactFormFields = () => {
    const userInfoFromLS = localStorageAPI.load('feedback-form-state');
    
    if (userInfoFromLS){
        input.value = userInfoFromLS.email || '';
        textarea.value = userInfoFromLS.message || '';
    }
  
}
fillContactFormFields()

const onInputFormData = (event) => {
    const inputFieldEl = event.target;
    const inputFieldValue = inputFieldEl.value.trim();
    const inputFieldName = inputFieldEl.name;
    
    userInfo[inputFieldName] = inputFieldValue
    
    localStorageAPI.save('feedback-form-state', userInfo);
    
}
const onSubmitFormData = event => {
    event.preventDefault();
    if (event.target.elements.email.value && event.target.elements.message.value) {
    console.log(localStorageAPI.load('feedback-form-state'));
    inputForm.reset();
    localStorageAPI.remove('feedback-form-state');
}
else{
    alert('Всі поля повинні бути заповнені!')
}}

inputForm.addEventListener('input', throttle(onInputFormData, 500));
inputForm.addEventListener('submit', onSubmitFormData)
