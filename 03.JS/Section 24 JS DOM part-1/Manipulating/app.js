// const allLinks = document.querySelectorAll('a');


// innerText - change the innerText of an element. this just changes inner text. cant update the tags
// textContent - ...
// for (let link of allLinks) {
//     link.innerText = 'I AM A LINK!!!!'
// };

// innerHtml - if you want to add html tags in 

// for (let link of allLinks) {
//     link.innerHTML = '<b>I AM A LINK!!!!</b>'
// };

// for (let link of allLinks) {
//     link.innerHTML += '<b>I AM A LINK!!!!</b>'
// };



// Exercise 53: Pickles Exercise
// let spanText = document.querySelector('h1 span');
// spanText.innerText = 'Disgusting';



// DOM attributes

// document.querySelector('#banner').id; //output: banner
// document.querySelector('#banner').id = 'whoops'; 
// styling that was defined for image with this tag will be not working after that we change id
// document.querySelector('#banner').src; // gives the image url back
// document.querySelector('a').href; // gives the url back
// document.querySelector('a').title; // gives the title back


// getAttribute('....') - second way to get attributes
// document.querySelector('a').getAttribute('href'); // gives the url back
// document.querySelector('a').getAttribute('id'); // gives the id back
// document.querySelector('a').getAttribute('class'); // gives the id back
// document.querySelector('a').getAttribute('title'); // gives the id back

// setAttribute('...')
// document.querySelector('a').setAttribute('class', 'reza');
// document.querySelector('a').getAttribute('class'); //reza


// Exercise 54: Manipulating Attributes Practice

// let image = document.querySelector('#egg');

// image.setAttribute('src', 'https://www.flaticon.com/svg/static/icons/svg/3523/3523063.svg');
// image.setAttribute('alt', 'chicken');


// const h1 = document.querySelector('h1');
// style attribute
// console.log(h1.style); // shows all style properties for the element
// console.log('"', h1.style.color, '"', 'is the defined color');

// h1.style.color = 'blue';
// h1.style.fontSize = '0.5rem'
// for (let link of allLinks) {
//     link.style.color = 'rgb(0, 108, 204)';
//     link.style.textDecorationColor = 'red';
//     link.style.textDecorationStyle = 'wavy'
// }


// window.getComputedStyle(h1); to get actual css for an element
// window.getComputedStyle(h1).color; to get actual color for an element


// exercise 55 - magical forest circle

// const div = document.querySelector('#container');
// div.style.textAlign = 'center';
// const image55 = document.querySelector('#container img');
// image55.style.width = '150px';
// image55.style.borderRadius = '50%';


// exercise 56 - rainbow text
// const colors = ['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet']; //PLEASE DON'T CHANGE THIS LINE!

//YOU CODE GOES HERE:
// const rainBow = document.querySelectorAll('h1 span');
// let i  = 0;
// for (let rain of rainBow) {
//     rain.style.color = colors[i];
// i++
// }

// classList to add classes to an element

// h1.classList; // gives the actual value back
// h1.classList.add('reza'); // adds reza to classes and do not overwrite the older classes that are existing already
// h1.classList.add('ali') ; // adds ali to classes
// OR remove by .remove
// h1.classList.remove('ali') ; // removes ali to classes
// h1.classList.contains('ali') ; // check to see if a class exist in classes and return true/false
// h1.classList.toggle('ali') // toggle between add/remove a class

// exercise 57 - ClassList practice
// const list = document.querySelectorAll('ul li');

// for (let i of list){
//     i.classList.toggle('highlight');
// }



// .parentElement, .children, ...
// h1.parentElement; //hive back the parent element
// h1.children; // give back all child elements
// h1.children[0] // would give the first child of mother back.

// .nextSibling : give next element but normally its not recommended, instead use: 
// .nextElementSibling to get actual elements and not a white space created by browser
// the same goes to previousSibling and previousElementSibling

// h1.nextElementSibling;
// h1.previousElementSibling;


// creating a new elements in DOM with .createElements('elementTyp'), innerText and append
// const newH3 = document.createElement('h3'); // an empty h3 is now created
// to set a content we can use:
// newH3.innerText = 'new text -  hello i am created with DOM createElements future';
// to add it to body we can do:
// document.body.append(newH3)

// append - just append somethings to the end of something
// h1.append(' LOL')

// prepend

// const newB = document.createElement('b');
// newB.append('testing append and add it as prepend');
// h1.prepend(newB);

// Element.insertAdjacentElement(position, element)
// to use it u will need to create element than select element that u will interact with and use this method to add the new element in position


// const newB = document.createElement('b');
// newB.append('test Element.insertAdjacentElement(position, element)');
// const h1 = document.querySelector('h1');
// h1.insertAdjacentElement('afterend', newB);


// after method
// const newBB = document.createElement('b');
// newBB.append('test after method');
// h1.after(newBB);

// Coding Exercise 58: 100 Button Insanity Exercise


// for (let i = 1; i <= 100; i++) {
//     const div = document.querySelector('div');
//     const btn = document.createElement('button');
//     btn.innerText = 'Hey';
//     div.appendChild(btn)

// }

// removing elements with removeChild
// to remove with this method parent should be selected

const b = document.querySelector('b');
b.parentElement.removeChild(b);

// remove with remove

// const image = document.querySelector('img');
// image.remove();