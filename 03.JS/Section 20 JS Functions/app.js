function singSong() {
    console.log("DO");
    console.log("RE");
    console.log("MI");
}

function greet(firstName, lastName) {
    console.log(`Hey there, ${firstName} ${lastName[0]}.`)
}

function repeat(str, numTimes) {
    let result = '';
    for (let i = 0; i < numTimes; i++) {
        result += str;
    }
    console.log(result);
}

function add(x, y) {
    if (typeof x !== 'number' || typeof y !== 'number') {
        return false;
    }
    return x + y;
}

// exercise 35

// Write your function here:
function printHeart() {
    console.log('<3');
};


// exercise 36

function rant(message) {
    let msg = message.toUpperCase();
    console.log(msg);
    console.log(msg);
    console.log(msg);
}

// exercise 37

function isSnakeEyes2(num1, num2) {

    if (isNaN(num1) === true || isNaN(num2) === true) {


        console.log('please input valid numbers "Not strings"');


    } else {


        if (num1 === 1 && num2 === 1) {
            console.log('Snake Eyes!');

        } else {
            console.log('Not Snake Eyes!');
        }
    };
}

function isSnakeEyes(num1, num2) {

    if (num1 === 1 && num2 === 1 && num1 == num2) {
        console.log('snake Eyes!')

    } else {
        console.log('Not Snake Eyes!')
    }
};


// exercise 38 - Return Value Practice

function multiply(num1, num2) {

    if (typeof num1 === 'number' && typeof num2 === 'number') {
        let mul = num1 * num2;
        return mul;
    } else {

        console.log('error - not a number input');
    }

};

// exercise 39 - isShortsWeather Function

function isShortsWeather(temperature) {

    if (temperature >= 75) {
        return true;
    } else {
        return false;
    }
};


// exercise 40


function lastElement(array) {


    if (typeof array === 'object') {

        let arrayLength = array.length;

        if (arrayLength >= 1) {
            let output = array[arrayLength - 1]
            return (output);
        } else {
            return null;
        }
    } else {
        return false;
    }
};

// exercise 41 - capitalize
function capitalize(str) {
    const lower = str.toLowerCase();
    let outputString = str[0].toUpperCase() +
        lower.slice(1);
    return (outputString);
}

// exercise 42 - sumArray 

function sumArray(array) {

    if (typeof array === 'object') {
        let sum = 0;
        for (let i = 0; i < array.length; i++) {
            sum += array[i];
        }

        return (sum);
    } else {
        return false;
    }

};

// exercise -  Days Of The Week

function returnDay(dayNumber) {

    if (typeof dayNumber === 'number') {
        switch (dayNumber) {
            case 1:
                return ('Monday');
            case 2:
                return ('Tuesday');
            case 3:
                return ('Wednesday');
            case 4:
                return ('Thursday');
            case 5:
                return ('Friday');
            case 6:
                return ('Saturday');
            case 7:
                return ('Sunday');
            default:
                return null;
        }
    } else {
        return false;
    }

}




}