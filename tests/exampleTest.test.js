const example = require("./example");

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

// Testing String
describe("greet", () => {
  it("should return the greeting message", () => {
    const result = example.greet("Austin");
    // expect(result).toMatch(/Austin/);
    expect(result).toContain("Austin");
  });
});

//Testing Array
describe("getCurrencies", () => {
  it("should return supported currencies", () => {
    const result = example.getCurrencies();
    // Proper way > To check for the existance of an element in the array
    // expect(result).toContain("WON");
    // expect(result).toContain("USD");
    // expect(result).toContain("EUR");
    expect(result).toEqual(expect.arrayContaining(["WON", "USD", "EUR"]));

    // Too general > Can be out of test range
    // expect(result).toBeDefined();
    // expect(result).not.toBeNull();

    // Too specific > Don't look for the exact same elements location or length in array
    // expect(result[0]).toBe("WON");
    // expect(result[1]).toBe("USD");
    // expect(result[2]).toBe("EUR");
    // expect(result.length).toBe(3);
  });
});
