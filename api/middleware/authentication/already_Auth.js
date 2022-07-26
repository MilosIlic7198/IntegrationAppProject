const jwt = require("jsonwebtoken");

// check if the user is alredy authorized
function already_Auth(req, res, next) {
  const token = req.cookies.jwt;

  if (typeof token !== "undefined") {
    jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
      if (err) {
        next();
      } else {
        res.redirect("/");
      }
    });
  } else {
    next();
  }
}

module.exports = { already_Auth };
