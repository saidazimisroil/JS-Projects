module.exports.absolute = function (n) {
    return n >= 0 ? n : -n;
};

module.exports.salom = function (name) {
    return "Assalomu aleykum, " + name;
};

module.exports.getCurrencies = function () {
    return ["UZS", "MYR", "USD"];
};

module.exports.getProduct = function (id) {
    return { id: 11, title: "banana", price: 2 };
};

module.exports.registerUser = function (userName) {
    if (!userName) throw new Error("UserName is not valid");

    return { id: 111, userName: userName };
};

const db = require("./db");
module.exports.applyDiscount = function (order) {
    const customer = db.getCustomer(order.customerId);
    if (customer.points > 100)
        order.totalPrice = order.price - order.price * 0.1;
};
