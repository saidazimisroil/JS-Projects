const mylib = require("../mylib");

describe("absolute", () => {
    it("should return a positive number if the input is positive", () => {
        const result = mylib.absolute(1);
        expect(result).toBe(1);
    });
    it("should return a positive number if the input is negative", () => {
        const result = mylib.absolute(-1);
        expect(result).toBe(1);
    });
    it("should return a zero if the input is zero", () => {
        const result = mylib.absolute(0);
        expect(result).toBe(0);
    });
});

// matnni test qilish
// toContain(), toMatch(regExp)
describe("salom", () => {
    it("should return the greeting message", () => {
        const result = mylib.salom("Farhod");
        // expect(result).toContain("Farhod");
        expect(result).toMatch(/Farhod/);
    });
});

// array`larni test qilish
describe("getCurrencies", () => {
    it("should return default currencies", () => {
        const result = mylib.getCurrencies();

        // o'ta umumiy testlar
        expect(result).toBeDefined();
        expect(result).not.toBeNull();

        // o'ta aniq test
        expect(result[0]).toBe("UZS");
        expect(result[1]).toBe("MYR");
        expect(result[2]).toBe("USD");
        expect(result.length).toBe(3);

        // to'g'ri usulda yozilgan test
        expect(result).toContain("UZS");
        expect(result).toContain("USD");
        expect(result).toContain("MYR");
        expect(result).toEqual(expect.arrayContaining(["USD", "MYR", "UZS"]));
    });
});

// obyektlarni test qilish
describe("getProduct", () => {
    it("should return object with the given id", () => {
        const result = mylib.getProduct(11);
        // noto`g`ri usul:
        expect(result).toEqual({ id: 11, title: "banana", price: 2 });
        // to`g`ri usul:
        expect(result).toMatchObject({ id: 11, price: 2 });
        expect(result).toHaveProperty("price", 2);
    });
});

// exception`larni test qilish
describe("registerUser", () => {
    it("should throw an error if input is invalid", () => {
        // null, undefined, NaN, "", 0, false
        const falsyItems = [null, undefined, NaN, "", 0, false];
        falsyItems.forEach((fi) =>
            expect(() => mylib.registerUser(fi)).toThrow()
        );
    });

    it("should return user object if input is valid", () => {
        const result = mylib.registerUser("admin");
        expect(result).toMatchObject({ userName: "admin" });
        expect(result.id).toBeGreaterThan(0);
    });
});

const db = require("../db");
describe("applyDiscount", () => {
    it("should apply discount if points of customer is greater than 100", () => {
        // mock function for not to connect to db and make this test as Unit
        db.getCustomer = function (id) {
            console.log("Mijoz mock qilindi...");
            return { id: 7, points: 101 };
        };

        const order = { customerId: 7, price: 100, totalPrice: 100 };
        mylib.applyDiscount(order);
        expect(order.totalPrice).toBe(90);
    });
    it("should not apply discount if points of customer is less than 100", () => {
        // mock function for not to connect to db and make this test as Unit
        db.getCustomer = function (id) {
            console.log("Mijoz mock qilindi...");
            return { id: 7, points: 55 };
        };

        const order = { customerId: 7, price: 100, totalPrice: 100 };
        mylib.applyDiscount(order);
        expect(order.totalPrice).toBe(100);
    });
});
