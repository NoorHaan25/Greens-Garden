
let cart = JSON.parse(localStorage.getItem("cart")) || [];
const products = document.getElementById('products');
const countProduct = document.getElementById("number-product");
const existProducts = document.getElementById("exist-products");
const emptyProducts = document.getElementById("empty-products");
const cartProducts = document.getElementById("cart-products");

let productsFlowers=[];
console.log(emptyProducts , existProducts);
let getData = async function(){
  const response = await fetch(" http://localhost:3000/products");
  const data = await response.json();
console.log(data);
let listOfData = data['baby-flowers']
productsFlowers = listOfData;
display(listOfData);
}
getData();


function display(listOfData ){
let templateContent ="";
// console.log('listOfData' , listOfData);
for (let i = 0; i < listOfData.length; i++) {
  // console.log(listOfData[i] );
  templateContent += `
  <div class="card">
  <div class="icons-card">
    <i class="fa-regular fa-heart"></i>
    <i class="fa-regular fa-eye"></i>
    <i class="fa-solid fa-shuffle"></i>
  </div>
  <div class="img-card">
    <img src=${listOfData[i].img} alt= ${listOfData[i].title}/>
  </div>
  <div class="rating">
    <i class="fa-solid fa-star"></i>
    <i class="fa-solid fa-star"></i>
    <i class="fa-solid fa-star"></i>
    <i class="fa-solid fa-star"></i>
    <i class="fa-solid fa-star"></i>
  </div>
  <div class="body-card">
    <div class="title">
      <h3>${listOfData[i].title}</h3>
    </div>
    <div class="price">
      <div class="current-price">$11.42 </div>
      <div class="before-price">$14.28</div>
    </div>
    <div class="add-product">
      <div class="quantity">
        <span class="text-count">1</span>
        <div class="counter">
          <span class="button-plus" data-index="${i}"><i class="fa-solid fa-sort-up"></i></span>
          <span class="button-minus" data-index="${i}"><i class="fa-solid fa-sort-down"></i></span>
        </div>
      </div>
      <div class="button-add" data-index="${i}">
        <img src="./img/shopping-bag.png" alt="shopping-bag">
        <span>Add To Cart</span>
      </div>
    </div>
  </div>
</div>
  `;
}
products.innerHTML=templateContent;
let buttonAdd =document.querySelectorAll('.button-add');
let buttonMinus =document.querySelectorAll('.button-minus');
let buttonPlus =document.querySelectorAll('.button-plus');
buttonAdd.forEach((el)=>{
  el.addEventListener('click',function(){
  let index = el.dataset.index;
  addCart(index , this , )
  });
})
buttonPlus.forEach((el)=>{
  el.addEventListener('click',function(){
    let countElement = el.parentElement.previousElementSibling;
    +countElement.innerHTML++
    //console.log('countele' , countElement);
    let index = el.dataset.index;
    console.log(index);
    update(index, countElement.textContent);
    getNumbersCounts(countElement.textContent)
  });
})
buttonMinus.forEach((el)=>{
  el.addEventListener('click',function(){
    let index = el.dataset.index;
    let countElement = el.parentElement.previousElementSibling;
    let countValue = parseInt(countElement.textContent);
    if (countValue > 1) {
      countElement.textContent = countValue - 1;
      update(index, countElement.textContent);
      getNumbersCounts(countElement.textContent)
    }

  });
})

}
function getTotalCount() {
  let totalCount = 0;
  for (const item of cart) {
    totalCount += +item.count;
  }
  return totalCount;
}
function addCart(index , term ){
  let choosenProduct = productsFlowers[index];
  let parentElement= term.parentElement;
  let counts = parentElement.children[0].children[0].textContent;
  let findProduct =cart.find(function(product){
    return product.id===choosenProduct.id
  })
  if(findProduct){
    console.log('isexisting product'); 
    

  }else{
    cart.push({...choosenProduct, count:counts , total:0});
    console.log('not existing product' , cart);
  }
  countProduct.textContent=getTotalCount();
  localStorage.setItem("cart" , JSON.stringify(cart));
  getProducts()
}
function update(index , count){
  const chosenProduct = productsFlowers[index];
  const foundProduct = cart.find((product) => product.id === chosenProduct.id);
  if (foundProduct) {
    foundProduct.count = count;
    countProduct.textContent = getTotalCount();
    localStorage.setItem("cart" , JSON.stringify(cart));
    getProducts()
  }
}
function getProducts(){
  if(cart.length == 0){
    console.log('no products found');
  }else{
    emptyProducts.style.cssText="display:none;";
    existProducts.style.cssText="display:block;";
    console.log(' products found');
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
      `
    }
    cartProducts.innerHTML=products;
  }
}
function getNumbersCounts(textCount){
  console.log('textCount' , textCount); 
}

/*** dropDowns */
const dropDown=document.getElementById('dropdown');

dropDown.addEventListener('click',()=>{
 // console.log('dropDown', dropDown);
  const dropdDownMenu = document.getElementById('dropdown-menu');
  console.log('dropDownMenu', dropdDownMenu);
  dropdDownMenu.classList.toggle('menu-open')
})
