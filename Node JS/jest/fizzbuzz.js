module.exports.fizzBuzz = function (input) {
    if (typeof input !== "number") throw new Error("input must be a number");

    if (input % 3 === 0 && input % 5 === 0) return "fizzbuzz";

    if (input % 3 === 0) return "fizz";

    if (input % 5 === 0) return "buzz";

    return input;
};
