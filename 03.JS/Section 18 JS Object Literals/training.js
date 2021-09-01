// first object

const fitBitData = {
    totalStep: 20000,
    totalMiles: 1000,
    avgCalorieBurn: 2331,
    workoutsThisWeek: '5 of 7',
    avgGoodSleep: '2:13'
};

fitBitData.totalMiles; //1000
typeof {}; // object


const person = {
    firstName: 'reza',
    lastName: 'faraji',
    downVotes: 12,
    upVotes: 123,
    netScore: 195,
    commentText: 'lorem ipsum',
    tags: ['#good', '#blue', '#nice'],
    isGilded: false
};
person;
person.upVotes; //123
person['lastName']; //faraji

const restaurant = {
    name: 'Ichiran Ramen',
    address: `${Math.floor(Math.random() * 100) + 1} Johnson Ave`,
    city: 'Brooklyn',
    state: 'NY',
    zipcode: '11206',
};

let fullAddress = restaurant['address'] + ', ' + restaurant['city'] + ', ' + restaurant['state'] + ', ' + restaurant['zipcode'];
fullAddress; // "19 Johnson Ave, Brooklyn, NY, 11206"



// modifying objects
const midterms = { danielle: 96, thomas: 78 };
midterms.thomas = 79;
midterms.thomas = 'C+';
midterms['danielle'] = 'A'; // {danielle: "A", thomas: "C+"}
// adding new information in object
midterms.ezra = 'B+';
midterms.antonio = 'A-'; //{danielle: "A", thomas: "C+", ezra: "B+", antonio: "A-"}