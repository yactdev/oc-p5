let cartArray = JSON.parse(localStorage.getItem("cart"));
let item = document.getElementById("cart__items");
let totalQty = 0;
fetch("http://localhost:3000/api/products/")
  .then((response) => response.json())
  .then((products) => {
    //showing the data by console
    //adding products
    productArray = products;
    console.log(products);
    cartBuilder(productArray);
  });

function cartBuilder(productArray) {
  cartArray.forEach((element) => {
    let built = productArray.find(
      (productArray) => productArray._id === element.id
    );
    console.log("este" + built.price);

    let showitems = ` <article class="cart__item" data-id="${built._id}" data-color="{product-color}">
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
          <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value=${element.qty}>
        </div>
        <div class="cart__item__content__settings__delete">
          <p class="deleteItem">Delete</p>
        </div>
      </div>
    </div>
    </article>`;
    totalQty = totalQty + element.qty * 1;
    item.innerHTML += showitems;
  });
  let item2 = document.getElementById("totalQuantity");
  item2.innerHTML = totalQty;
  console.log(totalQty);
}

// cartArray.forEach((element) => {
//   let showitems = ` <article class="cart__item" data-id="{product-ID}" data-color="{product-color}">
//     <div class="cart__item__img">
//       <img src="${productArray.imageUrl}" alt="Photo of a sofa">
//     </div>
//     <div class="cart__item__content">
//       <div class="cart__item__content__description">
//         <h2>${productArray.name}</h2>
//         <p>Green</p>

//         <p>€${productArray.find(({ id }) => id === element.id)}</p>
//       </div>
//       <div class="cart__item__content__settings">
//         <div class="cart__item__content__settings__quantity">
//           <p>Quantity : </p>
//           <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${
//             productArray.price
//           }">
//         </div>
//         <div class="cart__item__content__settings__delete">
//           <p class="deleteItem">Delete</p>
//         </div>
//       </div>
//     </div>
//     </article>`;
//   item.innerHTML += showitems;
// });
