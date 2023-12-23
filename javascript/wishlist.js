import { dropdDownMenu } from "./dropdown.js";
import { openedNavbar, closedNavbar } from "./navbar.js";

const productsFavorites = JSON.parse(localStorage.getItem('productFavorit'));
const favorit = document.getElementById('favorit');
console.log( productsFavorites);
function renderFav() {
  let templateContentFav=``
  for (let i = 0; i < productsFavorites.length; i++) {
    const element = productsFavorites[i];
    // console.log('element', element);
    templateContentFav+= `
    <div class="card">
    <div class="heart">
      <i class="fa-solid fa-heart"></i>
    </div>
    <div class="icons-card">
      <i class="fa-regular fa-eye"></i>
      <i class="fa-solid fa-shuffle"></i>
    </div>
    <div class="img-card">
      <img src=${element.img} alt=${element.title}>
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
        <h3>${element.title}</h3>
      </div>
      <div class="price">
        <div class="current-price">${element.price}</div>
      </div>
      <div class="add-product">
        <div class="quantity">
          <span>0</span>
          <div class="counter">
            <i class="fa-solid fa-sort-up"></i>
            <i class="fa-solid fa-sort-down"></i>
          </div>
        </div>
        <div class="button-add">
          <img src="./img/shopping-bag.png" alt="shopping-bag">
          <span>Add To Cart</span>
        </div>
      </div>
    </div>
  </div>
    `
  }
  favorit.innerHTML=templateContentFav;
}
dropdDownMenu();
openedNavbar();
closedNavbar();
renderFav();