const localCart = JSON.parse(localStorage.getItem("cart"));
console.log(localCart);
fetch("http://localhost:3000/api/products/")
  .then((response) => response.json())
  .then((products) => {
    //showing the data by console
    //adding products

    console.log(products);

    console.log(products.length);
    showAllElements(products);
  })
  .then(() => {
    console.log(localCart);
    const result = localCart.filter((obj) => obj.qty >= 1);
    const qty = result.length;
    console.log(
      "Included " + result.includes("415b7cacb65d43b2b5c1ff70f3393ad1")
    );
    console.log(result);
    console.log(qty);
  })

  .catch((err) => console.log(err));

// Function building the final shoppi

function showAllElements(information) {
  for (element of information) {
    console.log(element.price);
  }
}
