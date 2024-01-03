import { dropdDownMenu } from "./dropdown.js";
import { openedNavbar, closedNavbar } from "./navbar.js";
import {search} from "./search.js";
import {getData} from "./api.js";
const button = document.getElementById('button');
const password = document.getElementById('password');
const infoClient = document.getElementById('info-client');
const firstNameInput = document.getElementById('first-name');
const lastNameInput = document.getElementById('last-name');
const emailInput = document.getElementById('email-checkout');
const validIcon = document.querySelectorAll('.valid-icon');
const orderRecieve = document.getElementById('order-recieve');
const buttonRecieve = document.getElementById('button-recieve');
const genderinput = document.querySelectorAll('input[name="gender"]');
// console.log('gender input' , genderinput);
const existProducts = document.getElementById("exist-products");
const emptyProducts = document.getElementById("empty-products");
const cartProducts = document.getElementById("cart-products");
let cart = JSON.parse(localStorage.getItem("cart")) || [];
const countProduct = document.querySelectorAll(".number-product");
const total = document.querySelectorAll(".total-products-price");
let isFirstNameValid = false;
let isLastNameValid= false;
let isEmailValid = false;
let selectedGender = false;
// let isAnyChecked = false;
let checkedCount = 0; 
const getDataProducts = async()=>{
  const response = await getData();
  console.log('response', response);
  let listOfData = response;
  search(listOfData);
}
getDataProducts();
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
function getTotalCount() {
  let totalCount = 0;
  for (const item of cart) {
    totalCount += +item.count;
  }
  return totalCount;
}
function getTotalPrice() {
  let sum = 0;
  let total = 0;
  let totalSub = 0;
  for (const item of cart) {
    sum = item.price * item.count;
    totalSub = Math.ceil((total += sum));
  }
  // console.log('sum = ' + totalSub);
  return totalSub;
}
function getProducts() {
  if (cart.length == 0) {
    console.log("no products found");
  } else {
    emptyProducts.style.cssText = "display:none;";
    existProducts.style.cssText = "display:block;";
    console.log(" products found");
    let products = "";
    for (let i = 0; i < cart.length; i++) {
      const element = cart[i];
      products += `
      <li>
        <div class="img">
          <img src=${element.img} alt=${element.title}>
        </div>
        <div class="text">
          <p>${element.title}</p>
          <div class="price-container">
            <span class="count">${element.count} x</span>
            <span class="price">${element.price}</span>
          </div>
          <div class="delete" data-id="${element.id}">
            <span>x</span>
          </div>
        </div>
      </li>
      `;
    }
    cartProducts.innerHTML = products;
    const deleteProduct = document.querySelectorAll('.delete');
    console.log('delete product' , deleteProduct);
    deleteProduct.forEach((el)=>{
      el.addEventListener('click',function(){
        // console.log('el' , el);
        let id = el.dataset.id ;
        console.log('id' , id);
        removeProduct(id);
      });
    });
  }
}
function removeProduct(id){
  // console.log('id' ,'fu' , id);
  const index = cart.findIndex((product) => product.id == id);
  console.log('index', index);
  if (index !== -1) {
      cart.splice(index, 1);
      localStorage.setItem('cart', JSON.stringify(cart));
      countProduct.forEach((count)=>{
        count.textContent= getTotalCount();
      })
      total.forEach((total)=>{
      total.textContent = getTotalPrice() +'  '+'EGP';
      getProducts();
})
  
  }  
}
countProduct.forEach((count)=>{
  count.textContent= getTotalCount();
})
total.forEach((total)=>{
  total.textContent = getTotalPrice() +'  '+'EGP';
})
dropdDownMenu();
openedNavbar();
closedNavbar();
getProducts();