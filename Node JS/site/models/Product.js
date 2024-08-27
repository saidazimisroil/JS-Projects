const mongoose = require("mongoose");
//-----------PRODUCT------------
// schema for all products
const productSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    price: Number,
    amount: Number,
    image: String,
    category: String,
    user: { type: mongoose.Schema.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

// saying about saved product
productSchema.post("save", function (doc, next) {
  console.log("new product is saved", doc);
  next();
});

const Product = mongoose.model("product", productSchema);

module.exports = Product;
