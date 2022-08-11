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

showShopPage();
showCart();
noProduct();
start();

// async function start() {
//   await new Promise((resolve) => {
//     resolve(callApi());
//   });
//   onCLickAdd();
// }

function start() {
  callApi();
  setTimeout(function () {
    onCLickAdd();
  }, 1000);
}

function callApi() {
  fetch("http://petsla-api.herokuapp.com/products/")
    .then(function (res) {
      return res.json();
    })
    .then((data) => renderHTML(data));
}

function renderHTML(products) {
  let productList = products.filter((ele) => {
    return ele.id <= 12;
  });
  let stringProducts = productList.map(function (value) {
    let priceVND = converToVND(value.price);
    return `
      <div class="col l-3 m-4 c-6">
      <div class="home-product-item">
          <div class="home-product-item__img">
              <a href="./assets/product/product_${value.id}.html" class="hp-item-link">
                  <div class="hp-item-img" style="background-image: url(http://petsla-api.herokuapp.com${value.images});">
                  </div>
              </a>
          </div>
          <div class="home-product-item__content">
              <div class="hp-item-text">
                  <a href="./assets/product/product_1.html" class="hp-item-link">
                      <div class="hp-item-name">${value.product_name}</div>
                  </a>
                  <div class="hp-item-price">${priceVND}đ</div>
              </div>
              <div class="home-product-item__action">
                  <div class="hp-item-buy hp-item-btn-wrap">
                      <i class="fa-solid fa-bag-shopping"></i>
                      <span class="d-none d-md-block">Buy now</span>
                  </div>
                  <div class="hp-item-cart hp-item-btn-wrap">
                      <i class="fa-solid fa-cart-shopping"></i>
                      <span class="d-none d-xl-block">Add to Cart</span>
                  </div>
              </div>
          </div>
      </div>
  </div>
    `;
  });
  let displayProductElement = document.querySelector(".display-products");
  displayProductElement.innerHTML = stringProducts.join("");
}

/* ----------------------- Click Add Now ------------------- */
function onCLickAdd() {
  let addBtn = document.querySelectorAll(".hp-item-cart");
  let arrOfAddBtn = Array.from(addBtn);
  arrOfAddBtn.map((button) => {
    button.addEventListener("click", function (event) {
      let btnItem = event.target;
      let product = btnItem.parentNode.parentNode.parentNode.parentNode;
      let url = product.querySelector(".hp-item-img").style.backgroundImage;
      let productImg = url.substring(5, url.length - 2);
      let productName = product.querySelector(".hp-item-name").innerText;
      let productPrice = product.querySelector(".hp-item-price").innerText;
      addCart(productImg, productName, productPrice);
      showNumberOfItemsInCart();
      noProduct();
    });
  });
}

function showShopPage() {
  let root = document.querySelector(".root");
  let rootContent = `
  <div class="app">
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
                      <img src="/assets/img/logo.png" alt="">
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
                          <img src="/assets/img/logo.png" alt="">
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
                      <a href="./index.html" class="header__bot-nav-item-link" style="color: #e69646">Shop</a>
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

    <div class="products">
      <div class="grid wide">
          <div class="home-product">
              <div class="row display-products">
              </div>
          </div>

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
                <a href="/index.html" class="bottom-nav-item-link" style="color: rgb(230, 150, 70)">
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
  <div class="fade"></div>`;
  root.innerHTML = rootContent;
}
