const button = document.querySelector('button');
const span = document.querySelector('span');
const body = document.querySelector('body');

button.addEventListener('click', function() {
    const newColor = makeRandColor();
    document.body.style.backgroundColor = newColor;
    span.innerText = newColor;
})

body.addEventListener('keypress', function() {
    const newColor = makeRandColor();
    document.body.style.backgroundColor = newColor;
    span.innerText = newColor;
});


// create random colors
const makeRandColor = () => {
    const r = Math.floor(Math.random() * 255);
    const g = Math.floor(Math.random() * 255);
    const b = Math.floor(Math.random() * 255);
    return `rgb(${r}, ${g}, ${b})`;
}