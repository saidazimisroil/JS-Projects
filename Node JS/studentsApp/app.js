const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
// const authController = require("./controllers/authController");
// const User = require("./models/user");
const jwt = require("jsonwebtoken");
const { isEmail } = require("validator");
// const { compare } = require("bcrypt");

const app = express();

// middleware
app.use(express.static("public"));
app.use(express.json());
app.use(cookieParser());

// view engine
app.set("view engine", "ejs");

// database connection
const dbURI =
  "mongodb+srv://saidazim:test123@cluster0.mhvu77y.mongodb.net/smoothies?retryWrites=true&w=majority";

mongoose
  .connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then((result) => app.listen(3000))
  .catch((err) => console.log(err));

// routes
app.get("/", (req, res) => res.render("home"));
app.get("/smoothies", (req, res) => res.render("smoothies"));
app.get("/test", (req, res) => res.send("salom"));
app.get("/login", (req, res) => res.render("login"));
app.get("/signup", (req, res) => res.render("signup"));

// model User

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
    required: [true, "Please, enter a password"],
    minlength: [6, "Minimum length of password is 6 characters"],
  },
});

// fire a function after doc saved to db
userSchema.post("save", function (doc, next) {
  console.log("new user is saved", doc);
  next();
});

// static method to login user
userSchema.statics.login = log_in;

async function log_in(email, password) {
  const user = await this.findOne({ email });

  if (user) {
    // const auth = await bcrypt.compare(password, user.password);
    const auth = password === user.password;

    if (auth) {
      return user;
    }
    throw new Error("Incorrect password");
  }
  throw new Error("Incorrect email");
}

const User = mongoose.model("user", userSchema);

// routes - post - login

app.post("/login", login_post);
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
    Object.values(err.errors).forEach((properties) => {
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

async function login_post(req, res) {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);
    const token = createToken(user._id);
    console.log(token);
    res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 }); // maxAge is in ms in browsers
    res.status(200).json({ user: user._id });
  } catch (err) {
    const errors = handleErrors(err);
    res.status(400).json({ errors });
  }
}

// routes - post - signup
app.post("/signup", signup_post);

async function signup_post(req, res) {
  const { email, password } = req.body;
  try {
    const user = await User.create({ email, password });
    const token = createToken(user._id);
    res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 }); // maxAge is in ms in browsers
    res.status(201).json({ user: user._id });
  } catch (err) {
    const errors = handleErrors(err);
    res.status(400).json({ errors });
  }
}
// app.get("/logout",  (req, res) => {
//     res.cookie("jwt", "", { maxAge: 1 });
//     res.redirect("/");
// });
