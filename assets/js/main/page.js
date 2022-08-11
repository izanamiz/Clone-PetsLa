export function converToVND(value) {
  let test1 = value.toString();
  let x = test1.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  return x;
}

/* -------------- Show Number Of Items In Cart ----------- */
export function showNumberOfItemsInCart() {
  let cartItemList = document.querySelectorAll(".cart-item");
  let myArr = Array.from(cartItemList);
  let arrOfItemQuantity = myArr.map((ele) => {
    return ele.querySelector(".product-quantity").innerText;
  });
  let numberOfItemsInCart = arrOfItemQuantity.reduce(function (a, b) {
    return parseFloat(a) + parseFloat(b);
  }, 0);
  let cartItemQuantityContent = document.querySelector(".cart-item-quantity");
  cartItemQuantityContent.innerHTML = numberOfItemsInCart;
  let cartLogoQuantityContent = document.querySelector(".cart-item-num");
  cartLogoQuantityContent.innerHTML = numberOfItemsInCart;
}
/* -------------- Add Item To Cart ----------- */
export function addCart(productImg, productName, productPrice) {
  let cartItemList = document.querySelectorAll(".cart-item");
  let myArr = Array.from(cartItemList);
  let index = myArr.findIndex((ele) => {
    return ele.querySelector(".product-name").innerText === productName;
  });
  let productQuantity = 1;
  if (index !== -1) {
    increaseQuantityOfDuplicatedItems(myArr[index], 1);
  } else {
    let addCartItem = document.createElement("div");
    addCartItem.className = "cart-item";
    let divContent =
      `<div class="cart-item__quantity-wrap"><button class="quantity-btn quantity-btn-plus id-${myArr[index]}"><i class="fa-solid fa-plus"></i></button><span class="quantity-num">1</span><button class="quantity-btn substraction"><i class="fa-solid fa-minus"></i></button></div><div class="cart-item__product"><img class="cart-item__product-img" src="` +
      productImg +
      '"><div class="cart-item__product-description"><div class="product-name">' +
      productName +
      '</div><div class="product-price">' +
      productPrice +
      ' x <span class="product-quantity">' +
      productQuantity +
      '</span></div><div class="product-total-price">' +
      productPrice +
      '</div></div></div><div class="cart-item__action-wrap"><button class="cart-item__action-delete btn-close"><i class="fa-solid fa-xmark"></i></button></div>';
    addCartItem.innerHTML = divContent;
    let cartItems = document.querySelector(".cart-section__body");
    cartItems.appendChild(addCartItem);
  }

  deleteItem();
  increaseNumberOfEachItem();
  decrement();
  cartTotal();
}

/* ----------------- Increase Quantity Of Duplicated Items By Add Now-------------- */
export function increaseQuantityOfDuplicatedItems(product, num) {
  let sumNumberItem = document.querySelector(".quantity-num").innerText;
  if (sumNumberItem == 1 && num == -1) return;
  else {
    let productQuantity =
      parseFloat(product.querySelector(".quantity-num").innerText) + num;
    let productQuantityContent = product.querySelector(".product-quantity");
    productQuantityContent.innerHTML = productQuantity;
    let quantityNumberContent = product.querySelector(".quantity-num");
    quantityNumberContent.innerHTML = productQuantity;
    let productTotalPrice =
      (
        parseFloat(
          product.querySelector(".product-price").innerText.split(".").join("")
        ) * productQuantity
      ).toLocaleString() + "đ";
    let productTotalPriceContent = product.querySelector(
      ".product-total-price"
    );
    productTotalPriceContent.innerHTML = productTotalPrice;
  }
}
/* ----------------- Increase Number Of Each Item-------------- */
export function increaseNumberOfEachItem() {
  let quantityBtn = document.querySelectorAll(".quantity-btn-plus");
  let myArr = Array.from(quantityBtn);
  myArr.map((button) => {
    button.onclick = function (event) {
      let btnItem = event.target;
      let product = btnItem.parentNode.parentNode.parentNode;
      increaseQuantityOfDuplicatedItems(product, 1);
      cartTotal();
      showNumberOfItemsInCart();
    };
  });
}

export function decrement() {
  let quantityBtn = document.querySelectorAll(".substraction");
  let myArr = Array.from(quantityBtn);
  myArr.map((button) => {
    button.onclick = function (event) {
      let btnItem = event.target;
      let product = btnItem.parentNode.parentNode.parentNode;
      increaseQuantityOfDuplicatedItems(product, -1);
      cartTotal();
      showNumberOfItemsInCart();
    };
  });
}
/* ----------------Total Price--------------- */
export function cartTotal() {
  let cartItemList = document.querySelectorAll(".cart-item");
  let myArr = Array.from(cartItemList);
  let arrOfItemPrice = myArr.map((ele) => {
    let productTotalPrice = ele.querySelector(".product-total-price").innerText;
    return productTotalPrice
      .substring(0, productTotalPrice.length - 1)
      .split(".")
      .join("");
  });
  let cartTotalPrice = arrOfItemPrice.reduce(function (a, b) {
    return parseFloat(a) + parseFloat(b);
  }, 0);
  let cartTotalPriceContent = document.querySelector(
    ".cart-section__footer-btn"
  );
  cartTotalPriceContent.innerHTML = `Checkout (${cartTotalPrice.toLocaleString()}đ)`;
}

/* ----------------- Delete Item-------------- */
export function deleteItem() {
  let cartItemDelete = document.querySelectorAll(".cart-item__action-delete");
  let myArr = Array.from(cartItemDelete);
  myArr.map((button) => {
    button.addEventListener("click", function (event) {
      let btnItem = event.target;
      let product = btnItem.parentNode.parentNode.parentNode;
      product.remove();
      cartTotal();
      showNumberOfItemsInCart();
      noProduct();
    });
  });
}

/* ------------------- Show Cart ---------------------- */
export function showCart() {
  const cartShow = document.querySelector(".cart-item-btn");
  const cartClose = document.querySelector(".cart-section__header-close");
  let fadeElement = document.querySelector(".fade");
  cartShow.addEventListener("click", function () {
    Object.assign(document.querySelector(".cart-section").style, {
      right: "0",
    });
    document.querySelector(".cart-section").style.right = "0";
    document.querySelector("body").style.overflow = "hidden";
    fadeElement.style.display = "block";
  });
  cartClose.addEventListener("click", function () {
    Object.assign(document.querySelector(".cart-section").style, {
      right: "-200%",
    });
    document.querySelector("body").style.overflow = "scroll";
    fadeElement.style.display = "none";
  });
  fadeElement.onclick = function () {
    document.querySelector(".cart-section").style.right = "-200%";
    document.querySelector("body").style.overflow = "scroll";
    fadeElement.style.display = "none";
  };
}

/* ------------------- No Products ----------------- */
export function noProduct() {
  let cartItemList = document.querySelectorAll(".cart-item");
  let cartItems = document.querySelector(".cart-section__body");
  if (cartItemList.length == 0) {
    let noProductItem = document.querySelector(".cart-section__body");
    let noProductItemContent =
      '<div> <div class="no-products"><div class="no-products__img"></div><div class="no-products__title">No Product In Cart</div></div> </div>';
    noProductItem.innerHTML = noProductItemContent;
  } else {
    try {
      let noProductItem = document.querySelector(".no-products");
      let divContent = noProductItem.parentNode.parentNode;
      divContent.removeChild(noProductItem.parentNode);
    } catch (error) {}
  }
}
