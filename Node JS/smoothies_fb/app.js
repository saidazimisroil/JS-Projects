const express = require("express");
const mongoose = require("mongoose");
const authRoutes = require("./routes/authRoutes");
const cookieParser = require("cookie-parser");
const { requireAuth, checkUser } = require("./middlewares/auth");
const upload = require("./middlewares/upload");
// const path = require("path"); // Import the 'path' module

const app = express();

// middleware
app.use(express.static("public"));

// Serve the "uploads" directory as a static folder
app.use(express.static("uploads"));

app.use(express.json());
app.use(cookieParser());

// view engine
app.set("view engine", "ejs");

// database connection
const dbURI =
    "mongodb+srv://saidazim:test123@cluster0.mhvu77y.mongodb.net/?retryWrites=true&w=majority";
mongoose
    .connect(dbURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
    })
    .then((result) => app.listen(3000))
    .catch((err) => console.log(err));

// routes
app.get("*", checkUser);
app.get("/", (req, res) => res.render("home"));
app.get("/smoothies", requireAuth, (req, res) => res.render("smoothies"));
app.use(authRoutes);

// for getting products from database
const Product = require("./models/Product");
app.get("/products", requireAuth, async (req, res) => {
    const productsData = await Product.find({});
    res.render("products", { products: productsData });
});

// new product
app.get("/newproduct", requireAuth, (req, res) => res.render("new"));
app.post(
    "/newproduct",
    requireAuth,
    upload.single("image"),
    async (req, res) => {
        const { title, price } = req.body;
        const image = req.file;

        try {
            const product = await Product.create({
                title,
                price,
                image: image
                    ? image.path.split("\\")[1]
                    : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJIcQXMnyVDnLvbw7SB0N5gqpEFhYyeSF2jA&usqp=CAU",
            });

            res.status(201).json({ product: product._id });
        } catch (err) {
            const errors = handleErrors(err);
            res.status(400).json({ errors });
        }
    }
);

// load images
app.get("/test", (req, res) => {
    const imagePath = "1702916459539.png"; // Assuming the image is in the 'uploads' directory
    const imagePath2 = "1702916459539.png";

    const products = [
        { name: "banana", imagePath },
        { name: "apple", imagePath: imagePath2 },
    ];

    // Render the 'test' EJS template and pass the image path as a variable
    res.render("test", { products });
});

// handles errors
function handleErrors(err) {
    console.log(err.message);
    let errors = { title: "", price: "", image: "" };

    if (
        err.name === "ValidationError" ||
        err.message.includes("jpg and png files are supported")
    ) {
        // Handle validation errors
        Object.values(err.errors).forEach(({ properties }) => {
            errors[properties.path] = properties.message;
        });
    } else {
        // Handle other types of errors
        errors.price = "Please, enter a number for price";
    }

    return errors;
}
