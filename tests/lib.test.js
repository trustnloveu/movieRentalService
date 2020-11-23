const lib = require("./lib");

// test("My first test", () => {
//   throw new Error("Something failed.");
// });

test("absolute - should return a positive number if input is positive", () => {
  const result = lib.absolute(1);
  expect(result).toBe(1);
});
