// Testing Numbers
module.exports.absolute = function (number) {
  return number >= 0 ? number : -number;
  //   if (number >= 0) return number;
  //   return -number;
};

// Testing String
module.exports.greet = function (name) {
  return "Welcome " + name + "!";
};

// Testing Array
module.exports.getCurrencies = function () {
  return ["WON", "USD", "EUR"];
  // return 1;
};

// Testing Objects
module.exports.getProduct = function (productId) {
  return { id: productId, price: 10, category: "" };
};

// Testing Exceptions
module.exports.registerUser = function (username) {
  if (!username) throw new Error("Username is required.");
  return { registTime: new Date().getTime(), username: username };
};

// FizzBuzz Exercise
module.exports.fizzBuzz = function (input) {
  if (typeof input !== "number") throw new Error("Input should be a number");

  if (input % 3 === 0 && input % 5 === 0) return "FizzBuzz";

  if (input % 3 === 0) return "Fizz";

  if (input % 5 === 0) return "Buzz";

  return input;
};
