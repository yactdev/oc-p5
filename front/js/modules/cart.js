let data = JSON.parse(localStorage.getItem("cart"));
let item = document.getElementById("cart__items");
console.log(data.color);

data.forEach((element) => {
  algo(element.id);
});
let productsArray;

fetch("http://localhost:3000/api/products/")
  .then((response) => response.json())
  .then((products) => {
    //showing the data by console
    //adding products
    productsArray = products;
    console.log(products);
    rellenar(data);
  });

function rellenar(products) {
  let showitems = ` <article class="cart__item" data-id="{product-ID}" data-color="{product-color}">
      <div class="cart__item__img">
        <img src="${products.imageUrl}" alt="Photo of a sofa">
      </div>
      <div class="cart__item__content">
        <div class="cart__item__content__description">
          <h2>${products.name}t</h2>
          <p>Green</p>

          <p>€${productsArray.[products.id].price}</p>
        </div>
        <div class="cart__item__content__settings">
          <div class="cart__item__content__settings__quantity">
            <p>Quantity : </p>
            <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="42">
          </div>
          <div class="cart__item__content__settings__delete">
            <p class="deleteItem">Delete</p>
          </div>
        </div>
      </div>
      </article>`;
  item.innerHTML += showitems;
}
