// getting product  Id 

const urlSearchParams = new URLSearchParams(window.location.search);
const id = urlSearchParams.get("id");
console.log("El id es:", id);

// Filter product by id 

fetch('http://localhost:3000/api/products/'+ id)
  .then((response) => response.json())
  .then((products) => {
    //showing the data by console
 
  // Just console log for testing the data
  console.log(products);
  // adding information to the DOM.
  document.getElementById("title").innerHTML = products.name;  
  document.getElementById("price").innerHTML = products.price;
  document.getElementById("description").innerHTML = products.description;

 addColors(products);
});

// Funtion to add colors to the option selector DOM 

 function addColors(products){
    let options = document.querySelector("#colors");

    products.colors.forEach(element => {
        fillColors =`
        <option value=${element}> ${element}</option>

        `;

        colors.innerHTML += fillColors
    });
    
return products;
}
// End function add option selection