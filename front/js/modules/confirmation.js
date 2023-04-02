let urlSearchParams = new URLSearchParams(window.location.search);
let id = urlSearchParams.get("orderId");
console.log(id);

let orderId = document.getElementById("orderId");
orderId.innerHTML = id;
