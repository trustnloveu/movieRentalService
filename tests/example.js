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
