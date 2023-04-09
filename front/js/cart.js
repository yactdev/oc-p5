// Get cart product information from localstorage.
let cartProducts = JSON.parse(localStorage.getItem("cart"));

// Select DOM HTML elements
const ARTICLES = document.querySelector(".cart__item");

const SECTION = document.querySelector("#cart__items");

// verification of cart status
function checkCart() {
  let cartProducts = JSON.parse(localStorage.getItem("cart"));
  if (!cartProducts || cartProducts == 0) {
    alert("The car is empty");
    const emptyCart = [];
    localStorage.setItem("cart", JSON.stringify(emptyCart)); //
  } else {
    getProducts();
  }
}

checkCart();

// Get products information from the server.
async function getProducts() {
  let x = await fetch("http://localhost:3000/api/products/")
    .then((res) => res.json())
    .then((productsInfo) => {
      renderCartItems(productsInfo);
      calcTotal(productsInfo);
    })
    .then(() => {
      addListener();
    });
}

// add HTML elements to the DOM
function renderCartItems(productsInfo) {
  let cartProducts = JSON.parse(localStorage.getItem("cart"));
  cartProducts.forEach((product) => {
    let productInCart = productsInfo.find(
      (productsInfo) => productsInfo._id === product.id
    );
    let htmlArticle = ` 
        <article class="cart__item" data-id="${product.id}" data-color="${product.color}">
            <div class="cart__item__img">
                <img src="${productInCart.imageUrl}" alt="Photo of a sofa">
            </div>
            <div class="cart__item__content">
                <div class="cart__item__content__description">
                    <h2>${productInCart.name}t</h2>
                        <p>${product.color}</p>
                        <p>€${productInCart.price}</p>
                </div>
            <div class="cart__item__content__settings">
            <div class="cart__item__content__settings__quantity">
                <p>Quantity : </p>
                <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${product.qty}">
      
            </div>
            <div class="cart__item__content__settings__delete" id = "#settings__delete">
                <p class="deleteItem"  data-id="${product.id}">Delete</p>
            </div>
            </div>
            </div>
        </article>`;
    // TODO remove this console log

    SECTION.innerHTML += htmlArticle;
  });
}

// total quantity of the order

function calcTotal(cartInfo) {
  let totalCartQty = 0;
  let totalCartAmount = 0;
  let htmlQty = document.getElementById("totalQuantity");
  let htmlAmount = document.getElementById("totalPrice");
  cartProducts.forEach((product) => {
    let productInCart = cartInfo.find(
      (cartInfo) => cartInfo._id === product.id
    );
    totalCartQty = totalCartQty + product.qty * 1;
    totalCartAmount += productInCart.price * product.qty;
  });
  htmlQty.innerHTML = totalCartQty;
  htmlAmount.innerHTML = totalCartAmount;
}

// add listener to the article items
function clearDOM() {
  console.log("deleting DOM....");
  let productHolder = document.querySelectorAll(".cart__item");
  productHolder.forEach((element) => {
    element.remove();
  });
}
function deleteOne(element) {
  const cartArray = JSON.parse(localStorage.getItem("cart"));
  const article = element.closest("article");
  const color = article.getAttribute("data-color");
  const id = article.getAttribute("data-id");
  const filterResult = cartArray.filter(
    (obj) => obj.id != id || obj.color != color
  );
  console.log("resultado color", filterResult.color);
  localStorage.setItem("cart", JSON.stringify(filterResult));
  clearDOM();
  checkCart();
}

function changeQuantity(element) {
  const cartArray = JSON.parse(localStorage.getItem("cart"));
  const article = element.closest("article");
  const color = article.getAttribute("data-color");
  const id = article.getAttribute("data-id");
  const qtyValue = element.value;
  const getProductQty = cartArray.findIndex(
    (obj) => obj.id == id && obj.color == color
  );
  cartArray[getProductQty].qty = qtyValue;
  if (element.value > 0 && element.value < 100) {
    localStorage.setItem("cart", JSON.stringify(cartArray));
  } else {
    alert("Please select a valid quantity between 1 and 100");
    clearDOM();
    checkCart();
  }
}

// Add event listener to the articles

function addListener() {
  let deleteItems = document.querySelectorAll(".deleteItem");
  let changeQuantities = document.querySelectorAll(".itemQuantity");
  deleteItems.forEach((element) => {
    element.addEventListener("click", () => {
      deleteOne(element);
    });
  });
  changeQuantities.forEach((element) => {
    element.addEventListener("change", () => {
      changeQuantity(element);
    });
  });
}

//// Send order data to the server

function test(cartData) {
  let productInfoToSend = [];
  cartData.forEach((element) => {
    let otros = productInfoToSend.push(element.id);
  });
  return productInfoToSend;
}

function createOrderInfo(cartData) {
  const firstName = document.getElementById("firstName").value;
  const lastName = document.getElementById("lastName").value;
  const address = document.getElementById("address").value;
  const city = document.getElementById("city").value;
  const email = document.getElementById("email").value;
  if (
    firstName == "" ||
    lastName == "" ||
    address == "" ||
    city == "" ||
    email == ""
  ) {
    alert("Please fill the form");
  } else {
    order = {
      contact: {
        firstName: firstName,
        lastName: lastName,
        address: address,
        city: city,
        email: email,
      },
      products: test(cartData),
    };

    // false) {
    localStorage.setItem("order", JSON.stringify(order));
    fetch("http://localhost:3000/api/products/order", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(order),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("por aqui");
        data.orderId; // this is the confirmation number
        console.log(data.orderId);
        // use urlSearchParams

        const orderIdConfirmation = "confirmation.html?orderId=" + data.orderId;
        // create a variable with confirmation page url using the orderId
        window.location.href = orderIdConfirmation;
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

let validationStatus = true;
let orderButton = document.getElementById("order");

// add listener to the order button
orderButton.addEventListener("click", (e) => {
  e.preventDefault();
  if (validationStatus == true) {
    createOrderInfo(cartProducts);
  } else {
    alert("Please fix the field");
  }
});

// regular expressions for validation
let emailRegExp =
  /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
let charAlphaRegExp = /^[A-Za-z -]{3,32}$/;
let addressRegExp = /^[A-Za-z0-9 ]{7,32}$/;
const firstName = document.getElementById("firstName");
const lastName = document.getElementById("lastName");
const address = document.getElementById("address");
const city = document.getElementById("city");
const email = document.getElementById("email");

// function to validate the fields
function validationField(field, errorHandleId, regExp) {
  field.addEventListener("change", checkFieldContent);

  let ErrorMsg = document.getElementById(errorHandleId);
  function checkFieldContent() {
    if (regExp.test(field.value)) {
      ErrorMsg.innerHTML = null;
      field.style.border = "2px solid green";
      validFirstName = true;
    } else if (regExp.test(field.value) === false || field.value === "") {
      ErrorMsg.innerHTML = "Please enter a valid first " + field.name;
      field.style.border = "2px solid red";
      validFirstName = false;
    }
    validationStatus = validationStatus * validFirstName;
    console.log(validationStatus);
  }
}
validationField(firstName, "firstNameErrorMsg", charAlphaRegExp);
validationField(lastName, "lastNameErrorMsg", charAlphaRegExp);
validationField(address, "addressErrorMsg", addressRegExp);
validationField(city, "cityErrorMsg", charAlphaRegExp);
validationField(email, "emailErrorMsg", emailRegExp);
