import { dropdDownMenu } from "./dropdown.js";
import { openedNavbar, closedNavbar } from "./navbar.js";
import {search} from "./search.js";
import {getData} from "./api.js";
let products = JSON.parse(localStorage.getItem("cart")) || [];
let cart = document.getElementById("cart");
console.log('cart cart', cart);
const totalPrice = document.getElementById("total-price");
const totalTax = document.getElementById("total-tax");
const countProduct = document.getElementById("number-product");
const total = document.querySelectorAll(".total-products-price");
const cartProducts = document.getElementById("cart-products");
const existProducts = document.getElementById("exist-products");
const emptyProducts = document.getElementById("empty-products");
// let items = []
const getDataProducts = async()=>{
  const response = await getData();
  // console.log('response', response);
  let listOfData = response;
  search(listOfData);
}
getDataProducts();
function renderCart(product) {
  let template=``;
  let sum = 0;
  let total=0;
  let totalSub=0
  for (let i = 0; i < product.length; i++) {
    const element = product[i];
    // console.log('rendering element', element);
    sum =element.price*element.count;
    template += `
    <li>
    <div class="img column">
      <img src=${element.img} alt=${element.title}>
    </div>
    <div class="wrapper-info column">
      <div class="title">
        <h3>${element.title}</h3>
      </div>
      <div class="price">
        <span>${element.price}</span>
      </div>
    </div>
    <div class="counter column">
      <div class="text-count">
      ${element.count}
      </div>
      <div class="counts">
        <span class = 'count-plus' data-id="${element.id}">+</span>
        <span class = 'count-minus' data-id="${element.id}">-</span>
      </div>
    </div>
    <div class="all-total column" >
      <span class='total'>${sum}</span>
    </div>
    <div class="delete column" data-id="${element.id}" >
      <i class="fa-solid fa-trash"></i>
    </div>
  </li>
    `
    totalSub= Math.ceil(total+=sum);
  }
  totalPrice.innerHTML = totalSub;
  totalTax.innerHTML = totalSub;
  cart.innerHTML = template;
  // console.log('sum' , sum);
  const countPlus= document.querySelectorAll('.count-plus');
  const countMinus = document.querySelectorAll('.count-minus');
  const deleteProduct = document.querySelectorAll('.delete');
  // console.log('delete product' , deleteProduct);
  countPlus.forEach((el)=>{
    el.addEventListener('click',function(){
      let countElement = el.parentElement.previousElementSibling;
      +countElement.innerHTML++
      let id = el.dataset.id ;
      update(id , countElement.textContent)
    });
  })
  countMinus.forEach((el)=>{
    el.addEventListener('click',function(){
      let countElement = el.parentElement.previousElementSibling;
      let countValue = parseInt(countElement.textContent);
      if (countValue > 1) {
        countElement.textContent = countValue - 1;
        let id = el.dataset.id ;
        update(id , countElement.textContent)
      }
      
    });
  })
  deleteProduct.forEach((el)=>{
    el.addEventListener('click',function(){
      console.log('el' , el);
      let id = el.dataset.id ;
      console.log('id' , id);
      removeProduct(id);
    });
  });
}


function update(id , count){
  const foundProduct = products.find((product) => product.id == id);
  if (foundProduct) {
    foundProduct.count = count;
    localStorage.setItem("cart" , JSON.stringify(products));
    renderCart(products)
  }
}
function getProducts() {
  if (products.length == 0) {
    // console.log("no products found");
  } else {
    emptyProducts.style.cssText = "display:none;";
    existProducts.style.cssText = "display:block;";
    // console.log(" products found");
    let product = "";
    for (let i = 0; i < products.length; i++) {
      const element = products[i];
      product += `
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
          <div class="delete delete delete-products" data-id="${element.id}">
            <span>x</span>
          </div>
        </div>
      </li>
      `;
    }
    cartProducts.innerHTML = product;
    const deleteProduct = document.querySelectorAll('.delete-products');
    console.log('delete product' , deleteProduct);
    deleteProduct.forEach((el)=>{
      el.addEventListener('click',function(){
        // console.log('el' , el);
        let id = el.dataset.id ;
        console.log('id' , id);
        removeProduct(id);
      });
    });
    console.log('productsgeeee = ' , products);
  }
}
function getTotalCount() {
  let totalCount = 0;
  for (const item of products) {
    totalCount += +item.count;
  }
  return totalCount;
}
function getTotalPrice() {
  let sum = 0;
  let total = 0;
  let totalSub = 0;
  for (const item of products) {
    sum = item.price * item.count;
    totalSub = Math.ceil((total += sum));
  }
  // console.log('sum = ' + totalSub);
  return totalSub;
}
function removeProduct(id){
  // console.log('id' ,'fu' , id);
  const index = products.findIndex((product) => product.id == id);
  console.log('index', index);
  if (index !== -1) {
      products.splice(index, 1);
      localStorage.setItem('cart', JSON.stringify(products));
      countProduct.textContent = getTotalCount();
      total.forEach((total)=>{
      total.textContent = getTotalPrice() +'  '+'EGP';
      getProducts();
      renderCart(products);
})
 
  }  
  console.log('products.length = ' , products);
}
countProduct.textContent = getTotalCount();

total.forEach((total)=>{
  total.textContent = getTotalPrice() +'  '+'EGP';
})
dropdDownMenu();
openedNavbar();
closedNavbar();
getProducts();
renderCart(products);