// exercise 51 
// Write your code in here:
// const image = document.getElementById('unicorn');
// const heading = document.getElementById('mainheading');



// selecting by tags a,b,p,h1,div , ...
const allImages = document.getElementsByTagName('img');

// for (let image of allImages) {
//     console.log(image.src);
// }


// for (let image of allImages) {
//     image.src = 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/75/Partridge_Silkie_hen.jpg/900px-Partridge_Silkie_hen.jpg';
//     console.log(image.src);
// }


// selecting by class name

// const squareImages = document.getElementsByClassName('square');

// for (let img of squareImages) {
//     img.src = 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e2/Silky_bantam.jpg/440px-Silky_bantam.jpg';
// }


//querySelector are new way to select tags, classes, id's

// querySelector : to select just 1 item. if there are more than 1 just the first one will be selected
const para = document.querySelector('p');
const banner = document.querySelector('#banner');
const squareImg = document.querySelector('.square');
const findByTagAndAttribute = document.querySelector('a[title="Java"]');


//querySelectorAll return a collection of matching elements
const para2 = document.querySelectorAll('p');
const links = document.querySelectorAll('p a'); // all link inside a paragraph

for (let link of links) {
    console.log(link.href)
}



//exercise 52


// const doneTodos = document.querySelectorAll('.done');
// const checkbox = document.querySelector('input[type="checkbox"]')