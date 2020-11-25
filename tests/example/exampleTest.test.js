const example = require("./example");
// const testDb = require("./testDb");
// const mail = require("./mail");

// test("My first test", () => {
//   throw new Error("Something failed.");
// });

// Testing Numbers
describe("absolute", () => {
  it("should return a positive number if input is positive", () => {
    const result = example.absolute(1);
    expect(result).toBe(1);
  });

  it("should return a positive number if input is negative", () => {
    const result = example.absolute(-1);
    expect(result).toBe(1);
  });

  it("should return 0 if input is 0", () => {
    const result = example.absolute(0);
    expect(result).toBe(0);
  });
});

// // Testing String
// describe("greet", () => {
//   it("should return the greeting message", () => {
//     const result = example.greet("Austin");
//     // expect(result).toMatch(/Austin/);
//     expect(result).toContain("Austin");
//   });
// });

// //Testing Array
// describe("getCurrencies", () => {
//   it("should return supported currencies", () => {
//     const result = example.getCurrencies();
//     // Proper way > To check for the existance of an element in the array
//     expect(result).toEqual(expect.arrayContaining(["WON", "USD", "EUR"]));
//     // expect(result).toContain("WON");
//     // expect(result).toContain("USD");
//     // expect(result).toContain("EUR");

//     // Too general > Can be out of test range
//     // expect(result).toBeDefined();
//     // expect(result).not.toBeNull();

//     // Too specific > Don't look for the exact same elements location or length in array
//     // expect(result[0]).toBe("WON");
//     // expect(result[1]).toBe("USD");
//     // expect(result[2]).toBe("EUR");
//     // expect(result.length).toBe(3);
//   });
// });

// // Testing Objects
// describe("getProduct", () => {
//   it("should return the product with the given id", () => {
//     const result = example.getProduct(1);
//     expect(result).toMatchObject({ id: 1, price: 10 });
//     // expect(result).toHaveProperty("id", 1);

//     // Too specific
//     // expect(result).toEqual({ id: 1, price: 10 });
//     // expect(result).toStrictEqual({ id: 1, price: 10 });
//   });
// });

// // Testing Exceptions
// describe("registerUser", () => {
//   // falsy check
//   it("should throw if username is falsey", () => {
//     // array of all falsey values
//     const args = [null, undefined, NaN, "", 0, false];
//     // Execute falsy check
//     args.forEach((a) => {
//       expect((a) => {
//         example.registerUser(a);
//       }).toThrow();
//     });
//   });

//   // time check
//   it("should return a user object if passed username is valid", () => {
//     const result = example.registerUser("Austin");
//     expect(result).toMatchObject({ username: "Austin" });
//     expect(result.registTime).toBeGreaterThan(0);
//   });
// });

// // FizzBuzz Exercise
// describe("fizzBuzz", () => {
//   // Not a number
//   it("should throw an exception if input is not a number", () => {
//     const args = [null, undefined, "abc", {}];
//     args.forEach((a) => {
//       expect((a) => example.fizzBuzz(a)).toThrow();
//     });
//   });

//   // FizzBuzz < multiple of 3 and 5
//   it("should return FizzBuzz if input is divisible by 3 and 5", () => {
//     const result = example.fizzBuzz(15);
//     expect(result).toEqual("FizzBuzz");
//   });

//   // Fizz < multiple of 3
//   it("should return Fizz if input is only divisible by 3", () => {
//     const result = example.fizzBuzz(3);
//     expect(result).toEqual("Fizz");
//   });

//   // Buzz < multiple of 5
//   it("should return Buzz if input is only divisible by 5", () => {
//     const result = example.fizzBuzz(5);
//     expect(result).toBe("Buzz");
//   });

//   // Neither mutiple 3 or 5
//   it("should return input if it's not divisible by 3 or 5", () => {
//     const result = example.fizzBuzz(2);
//     expect(result).toBe(2);
//   });
// });

// // Testing Mock(Fake) Functions
// describe("applyDiscount", () => {
//   it("should apply 10% discount if customer has more than 10 points.", () => {
//     testDb.getCustomerSync = function (customerId) {
//       console.log("Fake reading customer...");
//       return { id: customerId, points: 20 };
//     };

//     const order = { customerId: 1, totalPrice: 10 };
//     example.applyDiscount(order);
//     expect(order.totalPrice).toBe(9);
//   });
// });

// // Testing Interaction
// describe("notifyCustomer", () => {
//   it("should send an email to the customer.", () => {
//     // Example of Mock Fuinction using Jest
//     // const mockFunction = jest.fn();
//     // mockFunction.mockReturnValue(1);
//     // mockFunction.mockResolvedValue(1);
//     // mockFunction.mockRejectedValue(new Error("Error Message..."));
//     // const result = await mockFunction();

//     testDb.getCustomerSync = jest
//       .fn()
//       .mockReturnValue({ email: "test@email.com" });

//     mail.send = jest.fn();

//     // testDb.getCustomerSync = function (customerId) {
//     //   console.log("Fake sending an email...");
//     //   return { email: "test@email.com" };
//     // };

//     // let mailSent = false;
//     // mail.send = function (email, message) {
//     //   mailSent = true;
//     // };

//     example.notifyCustomer({ customerId: 1 });

//     // expect(mailSent).toBe(true);
//     expect(mail.send).toHaveBeenCalled();

//     // You'd rather put Number or Boolean instead of String
//     // expect(mail.send).toHaveBeenCalledWith(
//     //   "test@email.com",
//     //   "Your order was placed successfully."
//     // );

//     // mock > called array > returned array (ex. 1st = email, 2nd = message)
//     expect(mail.send.mock.calls[0][0]).toBe("test@email.com");
//     // including "order" in the message
//     expect(mail.send.mock.calls[0][1]).toMatch(/order/);
//   });
// });
