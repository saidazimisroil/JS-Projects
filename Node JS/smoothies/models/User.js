const mongoose = require("mongoose");
const { isEmail } = require("validator");
const bcrypt = require("bcrypt");

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

// Create a unique index for the email field
userSchema.index({ email: 1 }, { unique: true });

// fire a function after doc saved to db
userSchema.post("save", function (doc, next) {
    console.log("new user is saved", doc);
    next();
});

// fire a function before doc saved to db
userSchema.pre("save", async function (next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// static method to login user
userSchema.statics.login = async function (email, password) {
    const user = await this.findOne({ email });

    if (user) {
        const auth = await bcrypt.compare(password, user.password);

        if (auth) {
            return user;
        }
        throw new Error("Incorrect password");
    }
    throw new Error("Incorrect email");
};

// Use createIndexes method to create indexes
mongoose.set("useCreateIndex", true);

const User = mongoose.model("user", userSchema);

module.exports = User;
