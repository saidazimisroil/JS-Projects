const express = require("express");
const authRoute = require("./routes/auth");
const productsRoute = require("./routes/products");
const cookieParser = require("cookie-parser");
const flash = require("connect-flash");
const session = require("cookie-session");
const { create } = require("express-handlebars");
const { allowInsecurePrototypeAccess } = require("@handlebars/allow-prototype-access");
const Handlebars = require("handlebars");
const mongoose = require("mongoose");
const Product = require("./models/Product");

// Create an instance of the Express application
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

// middlewares
app.use(express.static("uploads")); // Serve the "uploads" directory as a static folder

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(session({ secret: "Said", resave: false, saveUninitialized: false }));
app.use(flash());

const PORT = process.env.PORT || 3000;
// database connection
const dbURI =
  "mongodb+srv://saidazim:test123@cluster0.mhvu77y.mongodb.net/?retryWrites=true&w=majority";
mongoose
  .connect(dbURI)
  .then((result) => app.listen(PORT))
  .catch((err) => console.log(err));

// Use the authRoute middleware
app.use(authRoute);
app.use(productsRoute);
