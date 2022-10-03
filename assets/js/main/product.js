const idItem = { id: 8 };
import {
  showCart,
  noProduct,
  converToVND,
  showNumberOfItemsInCart,
  addCart,
  increaseQuantityOfDuplicatedItems,
  increaseNumberOfEachItem,
  decrement,
  cartTotal,
  deleteItem,
} from "./page.js";

showProductPage();
showCart();
noProduct();
start();

function start() {
  callApi();
//   setTimeout(function () {
//     onCLickAdd();
//   }, 1000);
}
function callApi() {
  fetch("http://petsla-api.herokuapp.com/products/")
    .then(function (res) {
      return res.json();
    })
    .then((data) => {
      renderHTML(data);
      onCLickAdd();
    });
}

function renderHTML(products) {
  let value = products.filter((ele) => {
    return ele.id === idItem.id;
  });
  //   console.log(value);
  //   console.log(value[0].price);
  let priceVND = converToVND(value[0].price);
  let stringProducts = `
    <div class="col l-6 m-6 c-12">
    <div class="product-detail__img-wrap">
        <img class="product-detail__img" src="http://petsla-api.herokuapp.com${value[0].images}">
    </div>
    </div>
    <div class="col l-6 m-6 c-12">
        <div class="product-detail__info">
            <h2 class="product-detail__info-title">${value[0].product_name}</h2>
            <div class="product-detail__info-price"><span>${priceVND}đ</span></div>
            <div class="product-detail__info-btn-wrap">
                <button type="button" class="product-detail__info-btn-item product-detail__info-btn-buy">
                    <span class="">Buy Now</span>
                </button>
                <button type="button" class="product-detail__info-btn-item product-detail__info-btn-cart">
                    <span class="">Add to Cart</span>
                </button>
            </div>
            <div class="product-desc">
                <h3 class="product-desc-title">Thông tin sản phẩm</h3>
                <div class="product-desc-detail">${value[0].description}
                </div>
            </div>
        </div>
    </div>
      `;
  //   console.log(stringProducts);
  let displayProductElement = document.querySelector(".display-products");
  displayProductElement.innerHTML = stringProducts;
}

/* ----------------------- Click Add Now ------------------- */
function onCLickAdd() {
  let addBtn = document.querySelectorAll(".product-detail__info-btn-cart");
  let arrOfAddBtn = Array.from(addBtn);
  arrOfAddBtn.map((button) => {
    button.addEventListener("click", function (event) {
      let btnItem = event.target;
      let product =
        btnItem.parentNode.parentNode.parentNode.parentNode.parentNode;
      let productImg = product.querySelector(".product-detail__img").src;
      let productName = product.querySelector(
        ".product-detail__info-title"
      ).innerText;
      let productPrice = product.querySelector(
        ".product-detail__info-price"
      ).innerText;
      addCart(productImg, productName, productPrice);
      showNumberOfItemsInCart();
      noProduct();
    });
  });
}
function showProductPage() {
  let root = document.querySelector(".root");
  let rootContent = `
  <div class="header__top-nav">
    <div class="grid wide">
      <div class="header__top-nav-wrap">
          <ul class="header__top-nav-wrap-item d-none d-md-flex">
              <li class="info-item">
                  <i class="fa-regular fa-envelope"></i>
                  <div class="text">petsla.vn@gmail.com</div>
              </li>
              <li class="info-item-separate">
              </li>
              <li class="info-item">
                  <i class="fa-solid fa-phone"></i>
                  <div class="text">0123 456 789</div>
              </li>
          </ul>
          <div class="header__mid-nav-logo d-flex d-md-none">
              <a href="#" class="header__mid-nav-logo-link">
                  <img src="../img/logo.png" alt="">
              </a>
          </div>
          <ul class="header__top-nav-wrap-item">
              <li class="btn-item btn-item-has-bg">
                  <i class="fa-solid fa-star fa-2xs btn-item-lg-icon"></i>
                  <div class="btn-item-title">title.toggleTheme</div>
              </li>
              <li class="btn-item">
                  <i class="fa-regular fa-moon btn-item-icon"></i>
                  <div class="btn-item-title">title.toggleTheme</div>
              </li>
              <li class="btn-item">
                  <i class="fa-solid fa-arrow-right-to-bracket btn-item-icon login-icon"></i>
                  <div class="btn-item-title">title.login</div>
              </li>
          </ul>
      </div>
    </div>
  </div>
  <div class="header__mid-nav">
    <div class="grid wide">
      <div class="row no-gutters header__mid-nav-wrap">
          <div class="col l-3 m-3 c-0">
              <div class="header__mid-nav-logo">
                  <a href="#" class="header__mid-nav-logo-link">
                      <img src="../img/logo.png" alt="">
                  </a>
              </div>
          </div>
          <div class="col l-9 m-9 c-12">
              <div class="row no-gutters header__mid-nav-search-cart">
                  <div class="col l-10 m-10 c-12">
                      <form action="">
                          <div class="header__mid-nav-search-item">
                              <input type="text" class="search-input search-input-has-focus"
                                  placeholder="Everything here is better than your ex">
                              <button type="submit" class="search-btn btn-has-focus">
                                  <i class="fa-solid fa-magnifying-glass"></i>
                              </button>
                          </div>
                      </form>
                  </div>
                  <div class="col l-2 m-2 c-0">
                      <div class="header__mid-nav-cart-wrap">
                          <div class="header__mid-nav-cart-item">
                              <i class="fa-solid fa-cart-shopping cart-item-btn"></i>
                              <div class="cart-item-title">title.cart</div>
                              <span class="cart-item-num">0</span>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </div>
    </div>
  </div>
  <div class="header__bot-nav">
    <div class="grid wide">
      <div class="header__bot-nav-wrap">
          <ul class="header__bot-nav-list d-none d-md-flex">
              <li class="header__bot-nav-item">
                  <a href="" class="header__bot-nav-item-link">Homepage</a>
              </li>
              <li class="header__bot-nav-item">
                  <a href="../../index.html" class="header__bot-nav-item-link" style="color: #e69646">Shop</a>
              </li>
              <li class="header__bot-nav-item">
                  <a href="" class="header__bot-nav-item-link">Cart</a>
              </li>
              <li class="header__bot-nav-item">
                  <a href="" class="header__bot-nav-item-link">Contact</a>
              </li>
              <li class="header__bot-nav-item">
                  <a href="" class="header__bot-nav-item-link">Account</a>
              </li>
          </ul>
      </div>
    </div>
  </div>
  <div class="bottom-nav d-flex d-md-none">
    <div class="grid wide">
      <div class="row">
          <div class="col c-3">
              <a href="#" class="bottom-nav-item-link">
                  <div class="bottom-nav-item-wrap">
                      <i class="fa-solid fa-house-chimney"></i>
                      <span class="">Homepage</span>
                  </div>
              </a>
          </div>
          <div class="col c-3">
              <a href="../../index.html" class="bottom-nav-item-link" style="color: rgb(230, 150, 70)">
                  <div class="bottom-nav-item-wrap">
                      <i class="fa-solid fa-store"></i>
                      <span class="">Shop</span>
                  </div>
              </a>
          </div>
          <div class="col c-3">
              <a href="#" class="bottom-nav-item-link">
                  <div class="bottom-nav-item-wrap">
                      <i class="fa-solid fa-cart-shopping"></i>
                      <span class="">Cart</span>
                  </div>
              </a>
          </div>
          <div class="col c-3">
              <a href="#" class="bottom-nav-item-link">
                  <div class="bottom-nav-item-wrap">
                      <i class="fa-solid fa-user"></i>
                      <span class="">Account</span>
                  </div>
              </a>
          </div>
      </div>
    </div>
  </div>
  <div class="cart-section">
    <div class="cart-section__header">
      <div class="cart-section__header-title">
          Cart:
          <span class="cart-item-quantity">0</span>
          item
      </div>
      <button class="cart-section__header-close btn-close">
          <i class="fa-solid fa-xmark"></i>
      </button>
    </div>
    <div class="cart-section__body">
    </div>
    <div class="cart-section__footer">
        <button class="cart-section__footer-btn btn-has-focus">Checkout (0đ)</button>
        <button class="cart-section__footer-btn btn-has-focus">View Cart</button>
    </div>
  </div>
  <div class="fade"></div>
  <div class="product-detail-page">
    <div class="grid wide product-detail">
        <div class="row display-products">
        </div>
    </div>
  </div>
  `;
  root.innerHTML = rootContent;
  console.log(root);
}

export {
  idItem,
  showProductPage,
  showCart,
  noProduct,
  converToVND,
  showNumberOfItemsInCart,
  addCart,
  increaseQuantityOfDuplicatedItems,
  increaseNumberOfEachItem,
  decrement,
  cartTotal,
  deleteItem,
  start,
  callApi,
  renderHTML,
  onCLickAdd,
};

// export { idItem, showProductPage, start, callApi, renderHTML, onCLickAdd };
