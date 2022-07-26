const jwt = require("jsonwebtoken");

// check if the user is authorized
function check_Auth(req, res, next) {
  const token = req.cookies.jwt;

  if (typeof token !== "undefined") {
    jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
      if (err) {
        res.redirect("/signin");
      } else {
        next();
      }
    });
  } else {
    res.redirect("/signin");
  }
}

module.exports = { check_Auth };
