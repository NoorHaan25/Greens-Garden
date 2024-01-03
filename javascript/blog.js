import { dropdDownMenu } from "./dropdown.js";
import { openedNavbar, closedNavbar } from "./navbar.js";
import {search} from "./search.js";
import {getData} from "./api.js";
let cart = JSON.parse(localStorage.getItem("cart")) || [];
const cartProducts = document.getElementById("cart-products");
const existProducts = document.getElementById("exist-products");
const emptyProducts = document.getElementById("empty-products");
const countProduct = document.getElementById("number-product");
const total = document.querySelectorAll(".total-products-price");
const getDataProducts = async()=>{
  const response = await getData();
  console.log('response', response);
  let listOfData = response;
  search(listOfData);
}
getDataProducts();
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
    // console.log("no products found");
  } else {
    emptyProducts.style.cssText = "display:none;";
    existProducts.style.cssText = "display:block;";
    // console.log(" products found");
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
          <div class="delete">
            <span>x</span>
          </div>
        </div>
      </li>
      `;
    }
    cartProducts.innerHTML = products;
  }
}
getProducts();
countProduct.textContent = getTotalCount();
total.forEach((total)=>{
  total.textContent = getTotalPrice() +'  '+'EGP';
})
dropdDownMenu();
openedNavbar();
closedNavbar();