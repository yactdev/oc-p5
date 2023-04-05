// get param value

let urlSearchParams = new URLSearchParams(window.location.search);
let id = urlSearchParams.get("orderId");
console.log(id);

// render order number
let orderId = document.getElementById("orderId");
orderId.innerHTML = id;

// clean localStorage
localStorage.clear();
