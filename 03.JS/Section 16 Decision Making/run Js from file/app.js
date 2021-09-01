console.log('hello from JS');
// alert('Hello from JS');
console.log('--------------------');

let name = 'Reza';

if (1 + 1 === 3) {
    console.log(true)

} else {
    console.log('its not', true)
}
console.log('--------------------');

if (1 + 2 === 3) {
    console.log('2+1=3 is', true)
} else {
    console.log('its not', true)
}

console.log('--------------------');
let random = Math.random();

if (random < 0.5) {
    console.log('random value under 0.5:', random)

} else {
    console.log('random value over 0.5:', random)
}

console.log('--------------------');

let dayOfWeek = 'Friday';

if (dayOfWeek === 'Monday') {
    console.log('it is:', dayOfWeek)
} else if (dayOfWeek === 'Saturday') {
    console.log('Yay I love;', dayOfWeek)
} else if (dayOfWeek === 'Friday') {
    console.log('Fridays are decent after work :d;', dayOfWeek)
}
console.log('--------------------');
const age = 66;

if (age < 5) {
    console.log('ticket is free for child under 5');
} else if (age < 10) {
    console.log('ticket is 10€ for child under 10');
} else if (age < 65) {
    console.log('ticket is 20€ for persons between 10 and 65');
} else {
    console.log('ticket is 10€ for persons over 65');
}
console.log('you are', age, 'years old')

console.log('--------------------');
const day = prompt('Enter a day').toLowerCase();

if (day === 'monday') {
    console.log('oops it is:', day);
} else if (day === 'saturday') {
    console.log('Yay I love;', day);
} else if (day === 'friday') {
    console.log('Fridays are decent after work :d;', day);
} else {
    console.log('Meh')
}

console.log('---------first nested condition-----------');
const password = prompt('Enter your password').toLowerCase();

if (password.length >= 6) {
    if (password.indexOf(' ') === -1) {
        console.log('valid password!');
    } else {
        console.log('you are not allowed to use space!');
    }
} else {
    console.log('your password does not meet the minimum requirements');

}

console.log('---------second nested condition-----------');
const password2 = prompt('Enter your password 2').toLowerCase();

if (password2.length >= 6) {
    if (password2.indexOf(' ') === -1) {
        console.log('valid password2!');
    } else {
        console.log('you are not allowed to use space!');
    }
} else {
    console.log('your password2 does not meet the minimum requirements');

}