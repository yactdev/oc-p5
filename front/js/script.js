// fetch the data from de server...

fetch('http://localhost:3000/api/products')
  .then((response) => response.json())
  .then((products) => {
    //showing the data by console
    console.log(products);
    //adding products
    addProducts(products);
});


// Function to add products cards to the DOM 

function addProducts(products){
let container = document.querySelector("#items");
    
products.forEach(element => {
        let showitems =`
        <a href="./product.html?id=${element._id}">
        <article>
        
        <img src="${element.imageUrl}" alt="Lorem ipsum dolor sit amet, Kanap name1" />
        <h3>${element.name}</h3>
        <p>${element.description}</p>
        </article>
        </a>`;
        items.innerHTML += showitems
    });
    return products;


}
// End funtion add products


