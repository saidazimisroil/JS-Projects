const Product = require("../models/Product.js");
const fs = require("node:fs");
const edit = require("./edit.js");

// --------productsController----------
const productsController = {};

productsController.main_get = mainFunc;
async function mainFunc(req, res) {
  const products = await Product.find().lean();
  res.render("index", { products: products.reverse(), userId: req.userId || null });
}
productsController.food_get = foodFunc;
async function foodFunc(req, res) {
  const products = await Product.find({ category: "food" }).lean();
  res.render("food", { products: products.reverse(), userId: req.userId || null });
}

productsController.drinks_get = drinksFunc;
async function drinksFunc(req, res) {
  const products = await Product.find({ category: "drinks" }).lean();
  res.render("drinks", { products: products.reverse(), userId: req.userId || null });
}

productsController.add_get = addGetFunc;
function addGetFunc(req, res) {
  res.render("add", {
    addError: req.flash("addError"),
    userId: req.userId || null,
  });
}

productsController.add_post = addPostFunc;
async function addPostFunc(req, res) {
  const { title, price, description, category, amount } = req.body;
  const image = req.file;
  console.log(req.file);
  if (!title || !price || !description || !category || !amount) {
    req.flash("addError", "All fields are required");
    res.redirect("/add");
    return;
  }

  try {
    const product = await Product.create({
      title,
      price,
      description,
      category,
      amount,
      user: req.userId,
      image: image.path.split("/")[1],
    });
    res.status(201).redirect("/");
  } catch (err) {
    res.json(err.message);
  }
}

function writeFile(content) {
  fs.writeFile("test.txt", content, (err) => {
    if (err) {
      console.error(err);
    }
    // file written successfully
  });
}

productsController.about_get = aboutFunc;
function aboutFunc(req, res) {
  const id = req.params.id;
  const content = id;
  writeFile(content);
  res.redirect("/product");
}

productsController.product_get = prodFunc;
function prodFunc(req, res) {
  fs.readFile("test.txt", "utf8", (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
    next(data, req, res); // Pass the 'res' object to the next function
  });
}
async function next(data, req, res) {
  try {
    let product = await Product.findById(data);
    res.render("about", { product, userId: req.userId || null });
  } catch (err) {
    res.json(err.message);
  }
}
// EDIT PRODUCT
productsController.editId_get = edit.editIdFunc;
productsController.edit_get = edit.editFunc;
productsController.edit_post = edit.editPostFunc;
module.exports = productsController;
