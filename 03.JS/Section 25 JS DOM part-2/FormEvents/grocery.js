// exercise 61 - Form Events, Grocery List

const form = document.querySelector('form');
const cart = document.querySelector('#list');


form.addEventListener('submit', function(e) {
    e.preventDefault();
    const product = form.elements.product;
    const qty = form.elements.qty;
    addToCart(product.value, qty.value)
    product.value = ''; // reset the inputs
    qty.value = ''; // reset the inputs
});

const addToCart = (inputProduct, inputQty) => {
    const listElement = document.createElement('li');
    listElement.innerText = `${inputProduct} ${inputQty}`;
    cart.appendChild(listElement);
}