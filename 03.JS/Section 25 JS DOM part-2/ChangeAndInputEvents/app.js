const input = document.querySelector('.firstInput');
const p = document.querySelector('.liveView');

// change event in addEventListener just work if you blur the input
// input.addEventListener('change', function (e) {
//     console.log("CASKDJASKJHD")
// })


// input events work realtime
input.addEventListener('input', function(e) {
    p.innerText = input.value;
})



// exercise 62 - input event practice

const inputU = document.querySelector('#username');
const h1 = document.querySelector('#view');
// const userNameView = document.querySelector('h1');

inputU.addEventListener('input', function(e) {

    h1.innerText = `Welcome, ${this.value}`;
    if (!this.value) h1.innerText = 'Enter Your Username';
});