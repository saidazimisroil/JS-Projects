const Product = require("../models/Product.js");
const fs = require("node:fs");

function writeFile(content) {
  fs.writeFile("test.txt", content, (err) => {
    if (err) {
      console.error(err);
    }
    // file written successfully
  });
}
module.exports.editIdFunc = function (req, res) {
  const id = req.params.id;
  const content = id;
  writeFile(content);
  res.redirect("/edit-product");
};

module.exports.editFunc = function (req, res) {
  fs.readFile("test.txt", "utf8", (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
    send4edit(data, req, res); // Pass the 'res' object to the next function
  });
};
async function send4edit(data, req, res) {
  try {
    let product = await Product.findById(data);
    res.render("edit", { product, userId: req.userId || null });
  } catch (err) {
    res.json(err.message);
  }
}

module.exports.editPostFunc = async function (req, res) {
  const { title, price, description, category, amount } = req.body;
  if (!title || !price || !description || !category || !amount) {
    req.flash("editError", "All fields are required");
    res.redirect("/edit-product");
    return;
  }
  fs.readFile("test.txt", "utf8", (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
    update(data, req, res); // Pass the 'res' object to the next function
  });
};
async function update(data, req, res) {
  try {
    const product = await Product.findByIdAndUpdate(data, req.body, { new: true });
    res.status(204).redirect("/");
  } catch (err) {
    res.json(err.message);
  }
}
