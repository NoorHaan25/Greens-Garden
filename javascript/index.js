import { openedNavbar, closedNavbar } from "./navbar.js";
import { dropdDownMenu } from "./dropdown.js";
import { getData } from "./api.js";
import { generateStarRating } from "./generateStartRating.js";
const angleLeft = document.querySelectorAll(".fa-angle-left");
const angleRight = document.querySelectorAll(".fa-angle-right");
// console.log('angleLeft', angleLeft , 'angleRight', angleRight);
const wrapperTrending = document.querySelectorAll(".wrapper-products-trending");
angleLeft.forEach((el)=>{
  el.addEventListener("click",function(){
    console.log('-');
    wrapperTrending.forEach((el)=>{
      el.scrollLeft -= 263;
    });
  })
})
angleRight.forEach((el)=>{
  el.addEventListener("click",function(){
    console.log('-');
    wrapperTrending.forEach((el)=>{
      el.scrollLeft += 263;
    });
  })
})
const total = document.getElementById("total");
const countProduct = document.getElementById("number-product");
const existProducts = document.getElementById("exist-products");
const emptyProducts = document.getElementById("empty-products");
const cartProducts = document.getElementById("cart-products");
let cart = JSON.parse(localStorage.getItem("cart")) || [];
let cartFav = [];
let productsFlowers = [];
/*                                             start section countdown                                                */
function countdown() {
    let countDown = new Date("jan,1 2024 24:00:00").getTime();
    let count = setInterval(() => {
        let now = new Date().getTime();
        let differenceDate = countDown - now;
        let days = Math.floor(differenceDate / (24 * 60 * 60 * 1000));
        let hours = Math.floor(
            (differenceDate % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000)
        );
        let minutes = Math.floor((differenceDate % (60 * 60 * 1000)) / (60 * 1000));
        let seconds = Math.floor((differenceDate % (60 * 1000)) / 1000);
        document.getElementById("counter-days").innerHTML = days;
        document.getElementById("counter-hours").innerHTML = hours;
        document.getElementById("counter-minutes").innerHTML = minutes;
        document.getElementById("counter-seconds").innerHTML = seconds;

        if (differenceDate < 0) {
            clearInterval(count);
        }
    }, 1000);
}
function sliderImages() {
    const images = document.querySelectorAll(".img-slider");
    const activeImage = document.getElementsByClassName("active-img");
    const feature = document.getElementById("feature");
    const slideUp = document.getElementById("slide-up");
    const slideDown = document.getElementById("slide-down");
    const navSlider = document.getElementById("nav-slider");
    // console.log('slideUp: ', slideUp , 'slideDown: ', slideDown);
    // console.log("feature", feature);
    // console.log("images", activeImage);
    images.forEach((image) => {
        // console.log('image', image);
        image.addEventListener("click", function () {
            console.log("image", activeImage);
            if (activeImage.length > 0) {
                //console.log('activeImage[0]' , activeImage);
                activeImage[0].classList.remove("active-img");
            }
            this.classList.add("active-img");
            feature.src = this.src;
        });
    });
    slideUp.addEventListener("click", function () {
        // console.log(this);
        navSlider.scrollTop += 180;
    });
    slideDown.addEventListener("click", function () {
        // console.log(this);
        navSlider.scrollTop -= 180;
    });
}
// console.log('getdata' , getData());

const getDataProducts = async () => {
    const response = await getData();
    // console.log('response', response);
    let listOfData = response;
    productsFlowers = listOfData;
    display(listOfData);
};
function display(products) {
    // console.log("products", products);
    const productsTrending = document.getElementById('products-trending');
    const specailProducts = document.getElementById('specail-products');
    console.log('specailProducts', specailProducts);
    let newProducts = "";
    let topProducts = "";
    for (let i = 0; i < products.length; i++) {
        const product = products[i];
        const rating = generateStarRating(products[i]);
        const ratingNumber = Math.round(product.rating);
        // console.log('product', product);
        if (product.status === "new") {
            // console.log("product", product);
            newProducts += `
            <div class="card">
            <span class="new">New</span>
            <div class="icons-card">
                <i class="fa-regular fa-heart"></i>
                <i class="fa-regular fa-eye"></i>
                <i class="fa-solid fa-shuffle"></i>
            </div>
            <div class="img-card">
                <img src=${product.img} alt= ${product.title}/>
            </div>
            ${rating.outerHTML}
            <div class="body-card">
                <div class="title">
                <h3>${product.title}</h3>
                </div>
                <div class="price">
                <div class="current-price">${product.price} EGP</div>
                
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
            </div>`;
        }
        // console.log("product-rating", product.rating < 5);
        // console.log('rating-number', ratingNumber);
        if (ratingNumber == 5) {
          // console.log('full' , product);
        // console.log("product-rating", product);
          topProducts += `
          <div class="card">
          <span class="new">New</span>
          <div class="icons-card">
              <i class="fa-regular fa-heart"></i>
              <i class="fa-regular fa-eye"></i>
              <i class="fa-solid fa-shuffle"></i>
          </div>
          <div class="img-card">
              <img src=${product.img} alt= ${product.title}/>
          </div>
          ${rating.outerHTML}
          <div class="body-card">
              <div class="title">
              <h3>${product.title}</h3>
              </div>
              <div class="price">
              <div class="current-price">${product.price} EGP</div>
              
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
          </div>`;
      }
    }
    // console.log('top' , topProducts);
    productsTrending.innerHTML = newProducts;
    specailProducts.innerHTML = topProducts;
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
    buttonEye.forEach((el, index) => {
        // console.log('eye' , index);
        el.addEventListener("click", function () {
            moreDetails(index);
        });
    });
    buttonHeart.forEach((el, index) => {
        el.addEventListener("click", function () {
            // console.log(el , index);
            const productFavorit = productsFlowers[index];
            console.log("product", productFavorit);
            let findProductFav = cartFav.find(function (productFav) {
                return productFavorit.id === productFav.id;
            });
            if (!findProductFav) {
                cartFav.push({ ...productFavorit });
            }
            console.log("cartfa", cartFav);
            localStorage.setItem("productFavorit", JSON.stringify(cartFav));
        });
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
/*                                             end section countdown                                                */
function createUsername() {
    const userName = localStorage.getItem("userName");
    const notExistingAccount = document.getElementById("not-existing-account");
    const existingAccount = document.getElementById("existing-account");
    console.log("userName", userName);
    console.log("index: ", notExistingAccount, existingAccount);
    if (userName !== null) {
        console.log("index: ", userName);
        notExistingAccount.style.cssText = "display:none;";
        existingAccount.style.cssText = "display:block;";
    } else if (userName === null) {
        existingAccount.style.cssText = "display:none;";
        notExistingAccount.style.cssText = "display:block;";
    }
  }
total.textContent = getTotalPrice();
getProducts();
createUsername();
sliderImages();
countdown();
openedNavbar();
closedNavbar();
dropdDownMenu();

getDataProducts();
