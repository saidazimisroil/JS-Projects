const express = require("express");
const { create } = require("express-handlebars");
const { allowInsecurePrototypeAccess } = require("@handlebars/allow-prototype-access");
import Handlebars from "handlebars";
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { isEmail } = require("validator");
const flash = require("connect-flash");
const session = require("cookie-session");
const path = require("path");
const multer = require("multer");
const jwt = require("jsonwebtoken");
const User = require("./models/User.js");
const Product = require("./models/Product.js");
const varMiddleware = require("./middlewares/var.js");
const userMiddleware = require("./middlewares/user.js");
const productsController = require("./controllers/products.js");
const authController = require("./controllers/auth.js");
const checkUser = require("./middlewares/checkUser.js");
const requireAuth = require("./middlewares/requireAuth.js");

const app = express();

const hbs = create({
  defaultLayout: "main",
  extname: "hbs",
  helpers: {
    ifequal: function (a, b, options) {
      if (a === b) {
        return options.fn(this);
      } else {
        return options.inverse(this);
      }
    },
  },
  handlebars: allowInsecurePrototypeAccess(Handlebars),
});

app.engine("hbs", hbs.engine);
app.set("view engine", "hbs");
app.set("views", "./views");

// -------MIDDLEWARES-----
// UPLOAD middleware
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    let ext = path.extname(file.originalname).toLowerCase();
    cb(null, Date.now() + ext);
  },
});
const fileFilter = (req, file, cb) => {
  const allowedExtensions = [".jpg", ".png"];
  const ext = path.extname(file.originalname).toLowerCase();

  if (allowedExtensions.includes(ext)) {
    cb(null, true); // Allow the file
  } else {
    console.error("Only JPG and PNG files are supported");
    cb(new Error("Only JPG and PNG files are supported"), false); // Reject the file
  }
};
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 1024 * 1024 * 2, // 2MB limit
  },
});

// middlewares
app.use(express.static("public"));
app.use(express.static("uploads")); // Serve the "uploads" directory as a static folder

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(session({ secret: "Said", resave: false, saveUninitialized: false }));
app.use(flash());
app.use(varMiddleware);
app.use(userMiddleware);

const PORT = process.env.PORT || 3000;

// database connection
const dbURI =
  "mongodb+srv://saidazim:test123@cluster0.mhvu77y.mongodb.net/?retryWrites=true&w=majority";
mongoose
  .connect(dbURI)
  .then((result) => app.listen(PORT))
  .catch((err) => console.log(err));

//---------------productsRoutes--------------------------------
app.get("/", checkUser, productsController.main_get);
app.get("/food", checkUser, productsController.food_get);
app.get("/drinks", checkUser, productsController.drinks_get);
app.get("/add", requireAuth, productsController.add_get);
app.post("/add", upload.single("image"), productsController.add_post);
app.get("/product/:id", productsController.about_get);
// app.get("/product", productsController.product_get);

//---------------authRoutes--------------------------------
app.get("/register", authController.register_get);
app.post("/register", authController.register_post);
app.get("/login", checkUser, authController.login_get);
app.post("/login", authController.login_post);
app.get("/logout", authController.logout_get);
