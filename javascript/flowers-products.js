import { dropdDownMenu } from "./dropdown.js";
import { openedNavbar, closedNavbar } from "./navbar.js";
let cart = JSON.parse(localStorage.getItem("cart")) || [];
let cartFav=[];
const products = document.getElementById("products");
const countProduct = document.getElementById("number-product");
const existProducts = document.getElementById("exist-products");
const emptyProducts = document.getElementById("empty-products");
const cartProducts = document.getElementById("cart-products");
const total = document.getElementById("total");
let selectedCategory = "";
let selectedColor = "";
let productsFlowers = [];
let getData = async function () {
  const response = await fetch("http://localhost:3000/products");
  const data = await response.json();
  let listOfData = data;
  productsFlowers = listOfData;
  display(listOfData);
  filterByCategory(listOfData);
  filterByColor(listOfData);
};
function display(listOfData) {
  let templateContent = "";
  for (let i = 0; i < listOfData.length; i++) {
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
      <div class="current-price">${listOfData[i].price} EGP</div>
      
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
  products.innerHTML = templateContent;
  let buttonAdd = document.querySelectorAll(".button-add");
  let buttonMinus = document.querySelectorAll(".button-minus");
  let buttonPlus = document.querySelectorAll(".button-plus");
  let buttonEye = document.querySelectorAll(".fa-eye");
  let buttonHeart = document.querySelectorAll(".fa-heart");
  buttonAdd.forEach((el) => {
    el.addEventListener("click", function () {
      let index = el.dataset.index;
      addCart(index, this);
    });
  });
  buttonPlus.forEach((el) => {
    el.addEventListener("click", function () {
      let countElement = el.parentElement.previousElementSibling;
      +countElement.innerHTML++;
      let index = el.dataset.index;
      console.log(index);
      update(index, countElement.textContent);
    });
  });
  buttonMinus.forEach((el) => {
    el.addEventListener("click", function () {
      let index = el.dataset.index;
      let countElement = el.parentElement.previousElementSibling;
      let countValue = parseInt(countElement.textContent);
      if (countValue > 1) {
        countElement.textContent = countValue - 1;
        update(index, countElement.textContent);
      }
    });
  });
  buttonEye.forEach((el , index) => {
    // console.log('eye' , index);
    el.addEventListener("click", function () {
      moreDetails(index)
    })
  })
  buttonHeart.forEach((el, index)=>{
    el.addEventListener("click", function () {
      // console.log(el , index);
      const productFavorit = productsFlowers[index];
      console.log('product' , productFavorit);
      let findProductFav =cartFav.find(function(productFav){
        return productFavorit.id===productFav.id
      })
      if(!findProductFav){
        cartFav.push({...productFavorit});
      }
      console.log('cartfa' , cartFav);
      localStorage.setItem('productFavorit',  JSON.stringify(cartFav));
    })
  });
}

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
function addCart(index, term) {
  let choosenProduct = productsFlowers[index];
  let parentElement = term.parentElement;
  let counts = parentElement.children[0].children[0].textContent;
  let findProduct = cart.find(function (product) {
    return product.id === choosenProduct.id;
  });
  if (findProduct) {
    console.log("isexisting product");
  } else {
    cart.push({ ...choosenProduct, count: counts, total: 0 });
    console.log("not existing product", cart);
  }
  countProduct.textContent = getTotalCount();
  total.textContent = getTotalPrice();
  localStorage.setItem("cart", JSON.stringify(cart));
  getProducts();
}
function update(index, count) {
  const chosenProduct = productsFlowers[index];
  const foundProduct = cart.find((product) => product.id === chosenProduct.id);
  if (foundProduct) {
    foundProduct.count = count;
    countProduct.textContent = getTotalCount();
    total.textContent = getTotalPrice();
    localStorage.setItem("cart", JSON.stringify(cart));
    getProducts();
  }
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
function applyFilters(products) {
  let filteredProducts = products;

  if (selectedCategory !== "all-flowers" && selectedCategory !== "") {
    filteredProducts = products.filter(
      (product) => product.category === selectedCategory
    );
  }

  if (selectedColor !== "") {
    filteredProducts = filteredProducts.filter(
      (product) => product.color === selectedColor
    );
  }
  display(filteredProducts);
}
function filterByCategory(products) {
  const category = document.querySelectorAll('input[name="category"]');
  category.forEach((element) => {
    element.addEventListener("click", function () {
      selectedCategory = element.value;
      applyFilters(products);
    });
  });
}
function filterByColor(products) {
  const color = document.querySelectorAll('input[name="color"]');
  color.forEach((element) => {
    element.addEventListener("click", function () {
      selectedColor = element.value;
      applyFilters(products);
    });
  });
}

// const size = document.querySelectorAll('input[name="size"]');
// console.log("out selected", selectedColor);

function moreDetails(index){
  console.log('index' , index);
  let imgDetails= document.querySelector(".img-details");
   let details=document.querySelector(".details");
   let nameProduct = document.querySelector(".name-product");
    let price = document.querySelector(".price-product");
    let count = document.querySelector(".count-content");
    let countNumber = count.innerHTML
    let buttonAdd = document.querySelector(".add");
    let buttonPlusDetails = document.querySelector(".plus");
    let buttonMinusDetails = document.querySelector(".minus");
    let choosenProduct = productsFlowers[index];
    buttonPlusDetails.addEventListener("click", function () {
      +countNumber++;
      count.innerHTML = countNumber;
     
   });
   buttonMinusDetails.addEventListener("click", function () {
  
    if (countNumber > 1) {
      +countNumber--
      count.textContent = countNumber;
    }
   })
    buttonAdd.addEventListener("click", function () {
      let findProduct = cart.find(function (product) {
        return product.id === choosenProduct.id;
      });
      if (findProduct) {
        console.log("isexisting product");
      } else {
        cart.push({ ...choosenProduct, count: countNumber, total: 0 });
        console.log("not existing product", cart);
      }
      countProduct.textContent = getTotalCount();
      total.textContent = getTotalPrice();
      localStorage.setItem("cart", JSON.stringify(cart));
      getProducts();
    })
   
  
   
  let closeCardPro=document.querySelector(".close-card-product");
  imgDetails.src= productsFlowers[index].img;
  imgDetails.alt= productsFlowers[index].title;
  nameProduct.textContent = productsFlowers[index].title;
  price.textContent = productsFlowers[index].price;
  details.style.cssText="display:flex;"
  closeCardPro.addEventListener("click" ,  function(){
    details.style.cssText="display:none;"
  })
}
total.textContent = getTotalPrice();
getData();
getProducts();
dropdDownMenu();
openedNavbar();
closedNavbar();