fetch('http://localhost:3000/api/products')
  .then((response) => response.json())
  .then((products) => {
    console.log(products);
    addProducts(products);
});



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

