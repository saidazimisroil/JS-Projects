const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const token = req.cookies.jwt;

  if (token) {
    jwt.verify(token, "buM@xfiySoz", (err, decodedToken) => {
      if (err) {
        console.log(err.message);
        next();
      } else {
        req.userId = decodedToken.id;
        next();
      }
    });
  } else {
    next();
  }
};
