const connection = require("../../models/db");
const jwt = require("jsonwebtoken");

function check_Role(req, res, next) {
  const token = req.cookies.jwt;

  if (typeof token !== "undefined") {
    jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
      console.log(decoded);

      if (err) {
        res.redirect("/signin");
      } else {
        connection.query(
          "SELECT user.user_id, user.name AS user_name, user_role.role_id FROM user LEFT JOIN user_role ON user.user_id = user_role.user_id where user.user_id = ?;",

          [decoded.user_id],

          function (err, role, fields) {
            if (err) {
              res.status(500).json({
                message: err.message & "This error occurred. Try again!",
              });
            } else {
              for (let i = 0; i < role.length; i++) {
                if (role[i].role_id != null) {
                  if (role[i].role_id == 1 || 2 || 3) {
                    res.locals.user_id = decoded.user_id;
                    return next();
                  } else {
                    if (i == role.length - 1) {
                      res.status(403).json({
                        message:
                          "Not allowed! Only user with a role is allowed.",
                      });
                    }
                  }
                } else {
                  if (i == role.length - 1) {
                    res.status(403).json({
                      message: "Not allowed! Only user with a role is allowed.",
                    });
                  }
                }
              }
            }
          }
        );
      }
    });
  } else {
    res.redirect("/signin");
  }
}

function check_Admin_Role(req, res, next) {
  const token = req.cookies.jwt;

  if (typeof token !== "undefined") {
    jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
      console.log(decoded);

      if (err) {
        res.redirect("/signin");
      } else {
        connection.query(
          "SELECT user.user_id, user.name AS user_name, user_role.role_id FROM user LEFT JOIN user_role ON user.user_id = user_role.user_id where user.user_id = ?;",

          [decoded.user_id],

          function (err, role, fields) {
            if (err) {
              res.status(500).json({
                message: err.message & "This error occurred. Try again!",
              });
            } else {
              for (let i = 0; i < role.length; i++) {
                if (role[i].role_id != null) {
                  if (role[i].role_id == 1) {
                    return next();
                  } else {
                    if (i == role.length - 1) {
                      res.status(403).json({
                        message:
                          "Not allowed! Only user with admin role is allowed.",
                      });
                    }
                  }
                } else {
                  if (i == role.length - 1) {
                    res.status(403).json({
                      message: "Not allowed! Only user with a role is allowed.",
                    });
                  }
                }
              }
            }
          }
        );
      }
    });
  } else {
    res.redirect("/signin");
  }
}

function check_Integrator_Role(req, res, next) {
  const token = req.cookies.jwt;

  if (typeof token !== "undefined") {
    jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
      console.log(decoded);

      if (err) {
        res.redirect("/signin");
      } else {
        connection.query(
          "SELECT user.user_id, user.name AS user_name, user_role.role_id FROM user LEFT JOIN user_role ON user.user_id = user_role.user_id where user.user_id = ?;",

          [decoded.user_id],

          function (err, role, fields) {
            if (err) {
              res.status(500).json({
                message: err.message & "This error occurred. Try again!",
              });
            } else {
              for (let i = 0; i < role.length; i++) {
                if (role[i].role_id != null) {
                  if (role[i].role_id == 2) {
                    return next();
                  } else {
                    if (i == role.length - 1) {
                      res.status(403).json({
                        message:
                          "Not allowed! Only user with integrator role is allowed.",
                      });
                    }
                  }
                } else {
                  if (i == role.length - 1) {
                    res.status(403).json({
                      message: "Not allowed! Only user with a role is allowed.",
                    });
                  }
                }
              }
            }
          }
        );
      }
    });
  } else {
    res.redirect("/signin");
  }
}

function check_Salesman_Role(req, res, next) {
  const token = req.cookies.jwt;

  if (typeof token !== "undefined") {
    jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
      console.log(decoded);

      if (err) {
        res.redirect("/signin");
      } else {
        connection.query(
          "SELECT user.user_id, user.name AS user_name, user_role.role_id FROM user LEFT JOIN user_role ON user.user_id = user_role.user_id where user.user_id = ?;",

          [decoded.user_id],

          function (err, role, fields) {
            if (err) {
              res.status(500).json({
                message: err.message & "This error occurred. Try again!",
              });
            } else {
              for (let i = 0; i < role.length; i++) {
                if (role[i].role_id != null) {
                  if (role[i].role_id == 3) {
                    return next();
                  } else {
                    if (i == role.length - 1) {
                      res.status(200).json({
                        message:
                          "Not allowed! Only user with salesman role is allowed.",
                      });
                    }
                  }
                } else {
                  if (i == role.length - 1) {
                    res.status(200).json({
                      message: "Not allowed! Only user with a role is allowed.",
                    });
                  }
                }
              }
            }
          }
        );
      }
    });
  } else {
    res.redirect("/signin");
  }
}

module.exports = {
  check_Role,
  check_Admin_Role,
  check_Integrator_Role,
  check_Salesman_Role,
};
