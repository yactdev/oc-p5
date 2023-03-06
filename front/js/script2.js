//import products from "./modules/products.js";
import utilidades from "./modules/products.js";

// import addToCart from "./modules/cart.js";
// Filter product by id

const id = utilidades.getProductId();
console.log(id);
fetch("http://localhost:3000/api/products/" + id)
  .then((response) => response.json())
  .then((products) => {
    //showing the data by console
    console.log(products);
    // Just console log for testing the data
    console.log(products);
    // adding information to the DOM.

    document.getElementById("item_img").src = products.imageUrl;
    document.getElementById("title").innerHTML = products.name;
    document.getElementById("price").innerHTML = products.price;
    document.getElementById("description").innerHTML = products.description;

    utilidades.addColors(products);
  });

// const buttonAddToCart = document.getElementById("addToCart");
// buttonAddToCart.addEventListener("click", prueba.addToCart());

// TODO // listener function to add products to cart
// functions can access variables in global scope

// conditional and for loop to check if product object is in cart
