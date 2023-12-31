import { dropdDownMenu } from "./dropdown.js";
import { openedNavbar, closedNavbar } from "./navbar.js";
dropdDownMenu();
openedNavbar();
closedNavbar();
const passwordLogin = document.getElementById('password-login');
const emailLogin = document.getElementById('email-login');
const loginButton = document.getElementById('login-button');
const loginForm = document.getElementById('login-form');
// console.log(passwordLogin, emailLogin , loginButton) ;
let getData =JSON.parse(localStorage.getItem("users"));
console.log('uers' , getData);
loginForm.onsubmit= function(e){
  e.preventDefault();
  loginButton.addEventListener('click', function(){
    for (let i = 0; i < getData.length; i++) {
      if (getData[i].email==emailLogin.value) {
        // console.log('login yesssssss');
        console.log(getData[i].firstName);
        const userName = getData[i].firstName;
        localStorage.setItem("userName", userName)
        setTimeout(() => {
          window.location = "index.html"
        }, 2000);
      }
    }
  })
}