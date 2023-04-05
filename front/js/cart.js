// getting cart ionformation from localstorage
let cartArray = JSON.parse(localStorage.getItem("cart"));

// selection of the html where the car information will be rendered.
let item = document.querySelector("#cart__items");
let productInfo = "";
// variable of Total quantity of items in the cart

let totalQty = 0;
let totalAmount = 0;
if (!cartArray) {
  alert("The car is empty");
  const emptycart = [];
  localStorage.setItem("cart", JSON.stringify(emptycart)); //
}

// getting all product data from de server

fetch("http://localhost:3000/api/products/")
  .then((response) => response.json())
  .then((products) => {
    //showing the data by console
    //adding products
    setProductInfo(products);
    console.log(products);
    cartBuilder(products);
    return;
  })
  .then(() => {
    addListener();
  })
  .then(() => {
    console.log("testing");
  })
  .catch((err) => console.log(err));

function setProductInfo(info) {
  productInfo = info;
}
console.log("productinfo", productInfo);

// Function building the final shopping cart
function cartUpdate() {
  console.log("deleting DOM....");
  let productHolder = document.querySelectorAll(".cart__item");
  productHolder.forEach((element) => {
    element.remove();
  });
  console.log("building cart");
  cartBuilder(productInfo);
  addListener();
}

function cartBuilder(productArray) {
  let cartArray = JSON.parse(localStorage.getItem("cart"));
  let totalAmount = 0;
  let totalQty = 0;
  if (cartArray && cartArray.length >= 1) {
    cartArray.forEach((element) => {
      let built = productArray.find(
        (productArray) => productArray._id === element.id
      );
      // TODO console log just for testing TODO just remove it when done
      console.log("este" + built.price);

      // redering shopping cart information into the cart page

      let showitems = ` <article class="cart__item" data-id="${built._id}" data-color="${element.color}">
    <div class="cart__item__img">
      <img src="${built.imageUrl}" alt="Photo of a sofa">
    </div>
    <div class="cart__item__content">
      <div class="cart__item__content__description">
        <h2>${built.name}t</h2>
        <p>${element.color}</p>

        <p>€${built.price}</p>
      </div>
      <div class="cart__item__content__settings">
        <div class="cart__item__content__settings__quantity">
          <p>Quantity : </p>
          <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${element.qty}">
          
        </div>
        <div class="cart__item__content__settings__delete" id = "#settings__delete">
          <p class="deleteItem"  data-id="${built._id}">Delete</p>
        </div>
      </div>
    </div>
    </article>`;

      // Total Amount counter
      totalAmount = totalAmount + built.price * element.qty;
      // Total quantity counter
      totalQty = totalQty + element.qty * 1;
      item.innerHTML += showitems;
    });
    // rendering quantity and price total
    let item2 = document.getElementById("totalQuantity");
    item2.innerHTML = totalQty;
    console.log(totalQty);
    let itemPrice = document.getElementById("totalPrice");
    itemPrice.innerHTML = totalAmount;
  }
}

if (!cartArray) {
  console.log(cartArray.length);
  alert("empty cart");
}

function deleteOne(arr, id, color) {
  return arr.filter((obj) => obj.id !== id || obj.color !== color);
}
function addListener() {
  let deleteProd = document.querySelectorAll(".deleteItem");
  let cartArray = JSON.parse(localStorage.getItem("cart"));
  deleteProd.forEach((element) => {
    element.addEventListener("click", () => {
      const article = document.querySelector(".cart__item");
      const color = article.dataset.color;

      const productId = element.getAttribute("data-id");

      let result = deleteOne(cartArray, productId, color);

      localStorage.setItem("cart", JSON.stringify(result));
      cartUpdate();
      console.log("Eliminando ", result);
      console.log("id", productId);
      console.log("color", color);
    });
  });
}
function test(cartData) {
  let otro = [];
  cartData.forEach((element) => {
    let otros = otro.push(element.id);
  });
  return otro;
}
test(cartArray);
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
  createOrderInfo(cartArray);
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
