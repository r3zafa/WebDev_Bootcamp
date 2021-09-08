const myMath = {
    PI: 3.14159,
    square(num) {
        return num * num;
    },
    square_v2: function(num) {
        return num * num;
    },

    cube(num) {
        return num ** 3;
    }
}

// Coding Exercise 45: Methods Exercise
const square = {

    area(sideLength) {
        return sideLength * sideLength;
    },

    perimeter(sideLength) {
        return sideLength * 4;
    }

}

// square.area(10); //100
// square.perimeter(10); //40


// keyword this

const cat = {
    name: 'Blue Steele',
    color: 'grey',
    breed: 'scottish fold',
    meow() {
        //console.log("THIS IS:", this)
        console.log(`${this.name} says MEOWWWW`);
    }
}

// const meow2 = cat.meow;


// Coding Exercise 46: Egg Laying


// const hen = {
//     name: 'helen',
//     eggCount: 0,
//     layAnEgg() {
//         this.eggCount++;
//         console.log('EGG');
//     }
// }

const hen = {
    name: 'Helen',
    eggCount: 0,
    layAnEgg() {
        this.eggCount++;
        return ('EGG');
    }
};