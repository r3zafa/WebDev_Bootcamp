const args = process.argv.slice(2);
for (let arg of args) {
    console.log(`Hi there, ${arg}`)
}

// with argv you can pass a lot of information to app from commend line
// example to run this script
// node ./greeter.js reza colt niki
// output would be:
// Hi there, reza
// Hi there, colt
// Hi there, niki