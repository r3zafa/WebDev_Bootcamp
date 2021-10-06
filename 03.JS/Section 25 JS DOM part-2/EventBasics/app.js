const btn = document.querySelector('#v2');
// console.dir(btn) // to see properties like onclick ondrag, ---
btn.onclick = function() {
    console.log("YOU CLICKED ME!")
    console.log("I HOPE IT WORKED!!")
}

function scream() {
    console.log("AAAAAHHHHH");
    console.log("STOP TOUCHING ME!")
}

btn.onmouseenter = scream;


document.querySelector('h1').onclick = () => {
    alert('you clicked the h1!')
}


const btn3 = document.querySelector('#v3');
// first entry in addEventListner is type of event and the second one is function passed to that event 
btn3.addEventListener('click', function() {
    alert("CLICKED!");
})

function twist() {
    console.log("TWIST!")
}

function shout() {
    console.log("SHOUT!")
}

const tasButton = document.querySelector('#tas');

// tasButton.onclick = twist;
// tasButton.onclick = shout;

tasButton.addEventListener('click', twist)
    // tasButton.addEventListener('event here', function here, options here) 
    // tasButton.addEventListener('click', twist, {once: true}) 
    // with eventListener we can also pass some other option as you can see over
tasButton.addEventListener('click', shout)


// exercise 60 JS code
const btnHello = document.querySelector('#hello');
const btnGoodbye = document.querySelector('#goodbye');

const helloLog = () => console.log('hello');
const byeLog = () => console.log('goodbye');


btnHello.addEventListener('click', helloLog)
btnGoodbye.addEventListener('click', byeLog)

// exercise 60 end