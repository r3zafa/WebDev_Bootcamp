module.exports = fn => {
    return (req, res, next) => {
        fn(req, res, next).catch(next);
    }
}

// or like this:
// function warpAsync(fn) {
//     return function(req, res, next) {
//         fn(req, res, next).catch(e => next(e));
//     }
// }
// module.exports = warpAsync;