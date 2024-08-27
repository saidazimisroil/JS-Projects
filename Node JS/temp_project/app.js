const express = require("express");
const { create } = require("express-handlebars");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const flash = require("connect-flash");
const session = require("express-session");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { isEmail } = require("validator");
const path = require("path");
const multer = require("multer");
// const authRoutes = require("./routes/auth.js");
// const productsRoutes = require("./routes/products.js");

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
});

app.engine("hbs", hbs.engine);
app.set("view engine", "hbs");
app.set("views", "./views");

// models
// ----------------USER ----------------
// schema for all users
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Please, enter an email"],
    unique: true,
    lowercase: true,
    validate: [isEmail, "Please, enter valid email"],
  },
  password: {
    type: String,
    required: [true, "Please, enter your password"],
    minlength: [6, "Minimum length of password is 6 characters"],
  },
});
// hashing password before saving user
userSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});
// saying about saved user
userSchema.post("save", function (doc, next) {
  console.log("new user is saved", doc);
  next();
});

// login function
userSchema.statics.login = async function (email, password) {
  const user = await this.findOne({ email });
  if (!user) throw new Error("Incorrect email");

  const auth = await bcrypt.compare(password, user.password);
  if (!auth) throw new Error("Incorrect password");

  return user;
};

const User = mongoose.model("user", userSchema);

//-----------PRODUCT------------
// schema for all products
const productSchema = new mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  image: String,
  category: String,
  user: { type: mongoose.Schema.ObjectId, ref: "User" },
});

// saying about saved product
productSchema.post("save", function (doc, next) {
  console.log("new product is saved", doc);
  next();
});

const Product = mongoose.model("product", productSchema);

// -------MIDDLEWARES-----
function requireAuth(req, res, next) {
  const token = req.cookies.jwt;

  if (token) {
    jwt.verify(token, "buM@xfiySoz", (err, decodedToken) => {
      if (err) {
        console.log(err.message);
        res.redirect("/login");
      } else {
        console.log(decodedToken);
        next();
      }
    });
  } else {
    res.redirect("/login");
  }
}
function checkUser(req, res, next) {
  const token = req.cookies.jwt;

  if (token) {
    jwt.verify(token, "buM@xfiySoz", async (err, decodedToken) => {
      if (err) {
        console.log(err.message);
        res.locals.user = null;
        next();
      } else {
        console.log(decodedToken);
        let user = await User.findById(decodedToken.id);
        res.locals.user = user;
        next();
      }
    });
  } else {
    res.locals.user = null;
    next();
  }
}

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

function userMiddleware(req, res, next) {
  const token = req.cookies.jwt;

  if (token) {
    jwt.verify(token, "buM@xfiySoz", async (err, decodedToken) => {
      if (err) {
        console.log(err.message);
        res.redirect("/login");
      } else {
        const user = await User.findById(decodedToken.id);
        req.userId = user._id;
        next();
      }
    });
  } else {
    next();
  }
}
function varMiddleware(req, res, next) {
  const isAuth = req.cookies.jwt ? true : false;
  res.locals.token = isAuth;
  next();
}

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

// --------productsController----------
const productsController = {};
productsController.main_get = async (req, res) => {
  const products = await Product.find().lean();
  res.render("index", { products: products.reverse(), userId: req.userId || null });
};
productsController.food_get = async (req, res) => {
  const products = await Product.find({ category: "food" }).lean();
  res.render("food", { products: products.reverse(), userId: req.userId || null });
};
productsController.drinks_get = async (req, res) => {
  const products = await Product.find({ category: "drinks" }).lean();
  res.render("drinks", { products: products.reverse(), userId: req.userId || null });
};
productsController.add_get = (req, res) => {
  res.render("add", {
    addError: req.flash("addError"),
  });
};
productsController.add_post = async (req, res) => {
  const { title, price, description, category } = req.body;
  const image = req.file;
  console.log(req.file);
  if (!title || !price || !description || !category) {
    req.flash("addError", "All fields are required");
    res.redirect("/add");
    return;
  }

  try {
    const product = await Product.create({
      ...req.body,
      user: req.userId,
      image: image.path.split("\\")[1],
    });
    res.status(201).redirect("/");
  } catch (err) {
    res.json(err.message);
  }
};
productsController.about_get = async (req, res) => {
  const id = req.params.id;
  const product = await Product.findById(id).lean();
  res.render("about", { product: product });
};
//---------------productsRoutes--------------------------------
app.get("/", checkUser, productsController.main_get);
app.get("/food", checkUser, productsController.food_get);
app.get("/drinks", checkUser, productsController.drinks_get);
app.get("/add", requireAuth, checkUser, productsController.add_get);
app.post("/add", requireAuth, upload.single("image"), productsController.add_post);
app.get("/product/:id", checkUser, productsController.about_get);

//---------------authController--------------------------------
const authController = {};
// Login
authController.login_get = function (req, res) {
  res.render("login", { loginError: req.flash("loginError") });
};
const handleErrors = (err) => {
  console.log(err.message, err.code);
  let errors = { email: "", password: "" };

  // incorrect email
  if (err.message === "Incorrect email") {
    errors.email = "That email is not registered";
  }

  // incorrect password
  if (err.message === "Incorrect password") {
    errors.password = "That password is incorrect";
  }

  // duplicate error code
  if (err.code === 11000) {
    errors.email = "That email is already registered";
    return errors;
  }

  // validation errors
  if (err.message.includes("user validation failed")) {
    console.log(Object.values(err.errors));

    Object.values(err.errors).forEach(({ properties }) => {
      console.log(properties);
      errors[properties.path] = properties.message;
    });
  }

  return errors;
};
const maxAge = 3 * 24 * 60 * 60; // 3 days in seconds
const createToken = (id) => {
  return jwt.sign({ id }, "buM@xfiySoz", {
    expiresIn: maxAge,
  });
};
authController.login_post = async function (req, res) {
  const { email, password } = req.body;
  try {
    const user = await User.login(email, password);
    const token = createToken(user._id);
    res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 }); // maxAge is in ms in browsers
    res.status(200).redirect("/");
  } catch (err) {
    const errors = handleErrors(err);
    req.flash("loginError", errors.email + errors.password);
    res.redirect("/login");
    // res.status(400).json({ errors });
  }
};
// Sign up
authController.register_get = function (req, res) {
  if (req.cookies.jwt) {
    res.redirect("/");
    return;
  }
  res.render("register", { registerError: req.flash("registerError") });
};
authController.register_post = async function (req, res) {
  const { email, password } = req.body;
  try {
    const user = await User.create({ email, password });
    const token = createToken(user._id);
    res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 }); // maxAge is in ms in browsers
    res.status(201).redirect("/");
  } catch (err) {
    const errors = handleErrors(err);
    req.flash("registerError", errors.email + errors.password);
    res.redirect("/register");
    // res.status(400).json({ errors });
  }
};
// Logout
authController.logout_get = async function (req, res) {
  res.clearCookie("jwt");
  res.redirect("/");
};
//---------------authRoutes--------------------------------
app.get("/register", checkUser, authController.register_get);
app.post("/register", authController.register_post);
app.get("/login", checkUser, authController.login_get);
app.post("/login", authController.login_post);
app.get("/logout", authController.logout_get);
