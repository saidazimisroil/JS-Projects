const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { isEmail } = require("validator");
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
// hashing password before saving userconst bcrypt = require("bcrypt");
userSchema.pre("save", function (next) {
  bcrypt.genSalt((err, salt) => {
    if (err) {
      return next(err);
    }

    bcrypt.hash(this.password, salt, (err, hash) => {
      if (err) {
        return next(err);
      }

      this.password = hash;
      next();
    });
  });
});

userSchema.post("save", function (doc, next) {
  console.log("New user is saved", doc);
  next();
});

userSchema.statics.login = myLogin;

async function myLogin(email, password) {
  const user = await this.findOne({ email });
  if (user) {
    const auth = await bcrypt.compare(password, user.password);

    if (auth) {
      return user;
    }
    throw new Error("Incorrect password");
  }
  throw new Error("Incorrect email");
}
const User = mongoose.model("user", userSchema);

module.exports = User;
