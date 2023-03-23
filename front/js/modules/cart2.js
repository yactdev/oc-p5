// getting cart ionformation from localstorage
let cartArray = JSON.parse(localStorage.getItem("cart"));

// selection of the html where the car information will be rendered.
let item = document.querySelector("#cart__items");

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
    productArray = products;
    console.log(products);
    cartBuilder(productArray);
  })
  .then(() => {
    addListener();
  })
  .catch((err) => console.log(err));

// Function building the final shopping cart

function cartBuilder(productArray) {
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

function deleteOne(arr, id) {
  return arr.filter((obj) => obj.id !== id);
}
function addListener() {
  let deleteProd = document.querySelectorAll(".deleteItem");

  deleteProd.forEach((element) => {
    element.addEventListener("click", () => {
      let productId = element.getAttribute("data-id");
      let result = deleteOne(cartArray, productId);
      localStorage.setItem("cart", JSON.stringify(result));
      console.log(result);
      console.log(element.getAttribute("data-id"));
    });
  });
}

function createOrderInfo() {
  const firstName = document.getElementById("firstName").value;
  const lastName = document.getElementById("lastName").value;
  const address = document.getElementById("address").value;
  const city = document.getElementById("city").value;
  const mail = document.getElementById("email").vlaue;
  let orderInfo = [firstName, lastName, address, city, mail];
  console.log(city);
  console.log(orderInfo);
}
let orderButton = document.getElementById("order");
orderButton.addEventListener("click", () => {
  createOrderInfo();
});
