let products = JSON.parse(localStorage.getItem("cart")) || [];
let cart = document.getElementById("cart");
const totalPrice = document.getElementById("total-price");
const totalTax = document.getElementById("total-tax");
let items = []
function renderCart(product) {
  let template=``;
  let sum = 0;
  let total=0;
  let totalSub=0
  for (let i = 0; i < product.length; i++) {
    const element = product[i];
    console.log('rendering element', element);
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
    <div class="all-total column">
      <span class='total'>${sum}</span>
    </div>
    <div class="delete column" onclick="removeProduct(${element.id})">
      <i class="fa-solid fa-trash"></i>
    </div>
  </li>
    `
    totalSub= Math.ceil(total+=sum);
  }
  totalPrice.innerHTML = totalSub;
  totalTax.innerHTML = totalSub;
  cart.innerHTML = template;
  console.log('sum' , sum);
  const countPlus= document.querySelectorAll('.count-plus');
  const countMinus = document.querySelectorAll('.count-minus');
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
}
renderCart(products)
function removeProduct(id){
  const index = products.findIndex((product) => product.id === id);
  if (index !== -1) {
      products.splice(index, 1);
      localStorage.setItem('cart', JSON.stringify(products));
      renderCart(products);
  }  
}
function update(id , count){
  const foundProduct = products.find((product) => product.id == id);
  if (foundProduct) {
    foundProduct.count = count;
    localStorage.setItem("cart" , JSON.stringify(products));
    renderCart(products)
  }
}