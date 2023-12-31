import { dropdDownMenu } from "./dropdown.js";
import { openedNavbar, closedNavbar } from "./navbar.js";
dropdDownMenu();
openedNavbar();
closedNavbar();
const button = document.getElementById('button');
const password = document.getElementById('password');
const infoClient = document.getElementById('info-client');
const firstNameInput = document.getElementById('first-name');
const lastNameInput = document.getElementById('last-name');
const emailInput = document.getElementById('email');
const validIcon = document.querySelectorAll('.valid-icon');
const orderRecieve = document.getElementById('order-recieve');
const buttonRecieve = document.getElementById('button-recieve');
const genderinput = document.querySelectorAll('input[name="gender"]');
// console.log('gender input' , genderinput);
let isFirstNameValid = false;
let isLastNameValid= false;
let isEmailValid = false;
let selectedGender = false;
let isAnyChecked = false;
let checkedCount = 0; 
button.onclick = function(){
  if(this.textContent === 'Show'){
    password.setAttribute('type', 'text');
    this.textContent = 'Hide';
  }else if(this.textContent === 'Hide'){
    password.setAttribute('type', 'password');
    this.textContent = 'Show';
  }
}
/*    validtion */
function validEmail() {
  let emailReg = /\w+(\d{2})?@\w+.\w+/gi;
  const email = emailInput.value;
  const validEmail = emailReg.test(email);
  // console.log('validEmail' , validEmail);
  isEmailValid = validEmail;
  const icon = emailInput.nextElementSibling;
  // console.log(icon);
  if(isEmailValid){
    icon.style.display = 'inline-block';
    }else{
    icon.style.display = 'none';
    emailInput.style.cssText = 'border: 1px solid red';
  }
}
function validFirstName(){
  let textReg = /\w{3,}/gi
  const text = firstNameInput.value;
  const validText = textReg.test(text);
  // console.log('validFirst' , validText);
  isFirstNameValid= validText; 
  // console.log(firstNameInput , 'firstName');
  const icon = firstNameInput.nextElementSibling;
  // console.log(icon);
  if(isFirstNameValid){
  icon.style.display = 'inline-block';
  firstNameInput.style.cssText = 'border: 1px solid green';
  }else{
  icon.style.display = 'none';
  firstNameInput.style.cssText = 'border: 1px solid red';
  
 }
}
function validLastName(){
  let textReg = /\w{3,}/gi
  const text = lastNameInput.value;
  const validText = textReg.test(text);
  // console.log('validFirst' , validText);
  isLastNameValid = validText;
  const icon = lastNameInput.nextElementSibling;
  // console.log(icon);
  if(isLastNameValid){
    icon.style.display = 'inline-block';
    lastNameInput.style.cssText = 'border: 1px solid green';
    }else{
    icon.style.display = 'none';
    lastNameInput.style.cssText = 'border: 1px solid red';
  }
}
infoClient.onsubmit = function(e){
  e.preventDefault();
  validEmail();
  validFirstName();
  validLastName();
  window.scrollTo(0, 0);
  genderinput.forEach(el=>{
    if(el.checked){
      selectedGender = true;
      el.nextElementSibling.classList.remove('invalid');
      checkedCount++;
    }else{
      el.nextElementSibling.classList.add('invalid');
    }
    
  })
  if (checkedCount > 0) {
    genderinput.forEach(el => {
      if (!el.checked) {
        el.nextElementSibling.classList.remove('invalid');
      }
    });
  }
  if(isFirstNameValid && isLastNameValid && isEmailValid && selectedGender){
      orderRecieve.style.display = 'block';
  }
  
}
orderRecieve.addEventListener('click',()=>{
  orderRecieve.style.display = 'none';
  window.location.href = './index.html';
});
