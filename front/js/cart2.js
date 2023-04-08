// Get cart product information from localstorage.
let cartProducts = JSON.parse(localStorage.getItem("cart"));

// Select DOM HTML elements
const ARTICLES = document.querySelector(".cart__item");
const DELETE_BUTTON = document.querySelector(".deleteItem");
const SECTION = document.querySelector("#cart__items");
function checkCart() {
  if (!cartProducts) {
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
      console.log("otro");
    });
}

// add HTML elements to the DOM
function renderCartItems(productsInfo) {
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
    console.log(product);

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
    console.log("qtyt ", totalCartQty);
    console.log(totalCartAmount);
  });
  htmlQty.innerHTML = totalCartQty;
  htmlAmount.innerHTML = totalCartAmount;
}

//// Send order data to the server

function test(cartData) {
  let otro = [];
  cartData.forEach((element) => {
    let otros = otro.push(element.id);
  });
  return otro;
}
test(cartProducts);
function createOrderInfo(cartData) {
  const firstName = document.getElementById("firstName").value;
  const lastName = document.getElementById("lastName").value;
  const address = document.getElementById("address").value;
  const city = document.getElementById("city").value;
  const email = document.getElementById("email").value;
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

  console.log(city);
  console.log(order);

  localStorage.setItem("order", JSON.stringify(order)); //
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

let orderButton = document.getElementById("order");
orderButton.addEventListener("click", (e) => {
  e.preventDefault();
  createOrderInfo(cartProducts);
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
  }
}
validationField(firstName, "firstNameErrorMsg", charAlphaRegExp);
validationField(lastName, "lastNameErrorMsg", charAlphaRegExp);
validationField(address, "addressErrorMsg", addressRegExp);
validationField(city, "cityErrorMsg", charAlphaRegExp);
validationField(email, "emailErrorMsg", emailRegExp);
