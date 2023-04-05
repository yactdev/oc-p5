function getProductId() {
  let urlSearchParams = new URLSearchParams(window.location.search);
  let id = urlSearchParams.get("id");
  return id;
}

// Funtion to add colors to the option selector DOM

function addColors(products) {
  let options = document.querySelector("#colors");

  products.colors.forEach((element) => {
    let fillColors = `
      <option value=${element}> ${element}</option>

      `;

    colors.innerHTML += fillColors;
  });

  return products;
}
const id = getProductId();
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

    addColors(products);
  });
// TODO
// add product to the cart
let name_field = document.querySelector("#title").value;

let cart = JSON.parse(localStorage.getItem("cart"));

if (!cart) {
  const emptycart = [];
  localStorage.setItem("cart", JSON.stringify(emptycart)); //
}
//Function to add products information to the cart
function addToCart() {
  let id_field = getProductId();
  let qty_field = document.querySelector("#quantity").value;
  let color_field = document.querySelector("#colors").selectedOptions[0].text;
  let carto = {
    id: id_field,
    color: color_field,
    qty: qty_field,
  };

  let old_data = JSON.parse(localStorage.getItem("cart"));
  console.log(old_data);
  console.log(carto.id);

  let resultado = old_data.find(
    (p) => p.id === carto.id && p.color == carto.color
  );
  console.log(resultado);
  if (resultado == undefined) {
    console.log("no existe");

    old_data.push(carto);
    localStorage.setItem("cart", JSON.stringify(old_data));
  } else {
    resultado.qty = Number(resultado.qty) + Number(carto.qty);
    localStorage.setItem("cart", JSON.stringify(old_data));
    return console.log(old_data.indexOf(carto.id));
  }
}
// function addToCart() {
const addButton = document.querySelector("#addToCart");
addButton.addEventListener("click", (e) => {
  // TODO WHAT IF THE USER HAS NOT BEEN TO THE PAGE BEFORE?!!?
  e.preventDefault;

  // Color and Quantities field validation

  const color_field = document.querySelector("#colors");
  const qty_field = document.querySelector("#quantity");

  // Color Validation  and error message
  if (color_field.value == "") {
    alert("Please select a color");
  } else {
    // Quantity  validation  and error message
    if (qtyValidation(qty_field.value)) {
      //// Addig products to the localstorage
      addToCart();
    } else {
      alert("Please selec a quantity");
    }
  }
});

function qtyValidation(qty) {
  if (qty >= 1 && qty <= 100) {
    //// Addig products to the localstorage
    return true;
  }
}

// function productExistValidation(cartArray, productId) {
//   const result = cartArray.find(({ id }) => id === productId);
//   if (result) {
//     console.log("Existe");
//   } else {
//     console.log("No existe");
//   }
// }

// TODO End function add option selection
// TODO get the cart from localStorage

// TODO put productObject in global space

// TODO use listener functions to change color and quantity!!!
// TODO listener function to add products to cart
// TODO functions can access variables in global scope
