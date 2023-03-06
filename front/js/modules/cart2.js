// getting cart ionformation from localstorage
let cartArray = JSON.parse(localStorage.getItem("cart"));

// selection of the html where the car information will be rendered.
let item = document.getElementById("cart__items");

// variable of Total quantity of items in the cart
let totalQty = 0;
let totalAmount = 0;

// getting all product data from de server

fetch("http://localhost:3000/api/products/")
  .then((response) => response.json())
  .then((products) => {
    //showing the data by console
    //adding products
    productArray = products;
    console.log(products);
    cartBuilder(productArray);
  });

// Function building the final shopping cart

function cartBuilder(productArray) {
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
        <div class="cart__item__content__settings__delete">
          <p class="deleteItem">Delete</p>
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
