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
