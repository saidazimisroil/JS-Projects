const mylib = require("../fizzbuzz");
describe("fizzBuzz", () => {
    it("should throw an error if input is not a number", () => {
        const invalidItems = ["bu", false, null, undefined];
        invalidItems.forEach((item) =>
            expect(() => mylib.fizzBuzz(item)).toThrow()
        );
        // expect(() => mylib.fizzBuzz(NaN)).toThrow();
    });

    it("should return fizz if input mode 3 equals to 0", () => {
        const result = mylib.fizzBuzz(3);
        expect(result).toContain("fizz");
    });

    it("should return buzz if input mode 5 equals to 0", () => {
        const result = mylib.fizzBuzz(5);
        expect(result).toContain("buzz");
    });

    it("should return fizzbuzz if input mode 5 and 3 equals to 0", () => {
        const result = mylib.fizzBuzz(15);
        expect(result).toContain("fizzbuzz");
    });

    it("should return input if input is not divisible by 5 and 3", () => {
        const result = mylib.fizzBuzz(16);
        expect(result).toBe(16);
    });
});
