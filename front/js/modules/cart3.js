async function getProductsData() {
  const response = await fetch("http://localhost:3000/api/products/", {
    method: "GET",
  });
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const data = await response.json();
  return data;
}

console.log(getProductsData());

let cartArray = JSON.parse(localStorage.getItem("cart"));
if (!cartArray) {
  alert("The car is empty");
  const emptycart = [];
  localStorage.setItem("cart", JSON.stringify(emptycart)); //
}

function cartBuilder(productArray) {
  if (cartArray) {
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
      let deleteProd = document.querySelector(".deleteItem");
      console.log("boton " + built._id);
      deleteProd.addEventListener("click", () => {
        let productId = deleteProd.getAttribute("data-id");
        let result = new deleteOne(cartArray, productId);
        localStorage.setItem("cart", JSON.stringify(result));
        console.log(result);
        location.reload();
      });
    });
    // rendering quantity and price total
    let item2 = document.getElementById("totalQuantity");
    item2.innerHTML = totalQty;
    console.log(totalQty);
    let itemPrice = document.getElementById("totalPrice");
    itemPrice.innerHTML = totalAmount;
  }
}

let datas = getProductsData();
console.log(datas);
cartBuilder(datas);
