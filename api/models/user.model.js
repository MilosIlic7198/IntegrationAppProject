const connection = require("../models/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

function sign_Up_Page(req, res) {
  res.render("pages/sign_Up");
}

function sign_In_Page(req, res) {
  res.render("pages/sign_In");
}

function sign_Up(req, res) {
  console.log(req.body);

  let name = req.body.name;
  let position = req.body.position;
  let username = req.body.username;
  let password = req.body.password;

  connection.query(
    "SELECT * FROM user WHERE username=?",
    [username],

    function (err, result, fields) {
      if (err) {
        res.status(500).json({
          message:
            err.message &
            "This error occurred while creating user in sign up. Try again!",
        });
      } else if (result.length > 0) {
        res.status(200).json({
          message: "The username is already in use!",
        });
      } else {
        bcrypt.hash(password, 10, (err, hash) => {
          if (err) {
            res.status(500).json({
              message:
                err &
                "This error occurred while creating user in sign up. Try again!",
            });
          } else {
            connection.query(
              "INSERT INTO user (name, position, username, password) VALUES(?,?,?,?)",
              [name, position, username, hash],

              function (err, result, fields) {
                if (err) {
                  res.status(500).json({
                    message:
                      err.message &
                      "This error occurred while creating user in sign up. Try again!",
                  });
                } else {
                  res.status(201).json({
                    message: "The user was successfully signed up!",
                    user: result.insertId,
                  });
                }
              }
            );
          }
        });
      }
    }
  );
}

function sign_In(req, res) {
  console.log(req.body);

  let username = req.body.username;
  let password = req.body.password;

  connection.query(
    "SELECT * FROM user WHERE username=?",
    [username],

    function (err, result, fields) {
      if (err) {
        res.status(500).json({
          message:
            err.message & "This error occurred while signing in. Try again!",
        });
      } else if (result.length === 0) {
        res.status(200).json({
          message: "Invalid username!",
        });
      } else {
        // Stavio sam compare za lakše razumevanje umesto res, da me ne bi jebala greška: res.status is not a function.
        bcrypt.compare(password, result[0].password, (err, compare) => {
          if (err) {
            res.status(500).json({
              message: err & "This error occurred while signing in. Try again!",
            });
          } else if (!compare) {
            res.status(200).json({
              message: "Incorrect password!",
            });
          } else {
            jwt.sign(
              {
                user_id: result[0].user_id,
                username: result[0].username,
              },
              process.env.JWT_KEY,
              {
                expiresIn: "1h",
              },

              function (err, token) {
                if (err) {
                  res.status(500).json({
                    message:
                      err & "This error occurred while signing in. Try again!",
                  });
                } else {
                  const cookie = res.status(201).cookie("jwt", token, {
                    httpOnly: true,
                    maxAge: 6000000,
                  });

                  if (cookie) {
                    res.status(200).json({
                      message: "The user was successfully signed in!",
                      token: token,
                    });
                  }
                }
              }
            );
          }
        });
      }
    }
  );
}

function sign_Out(req, res) {
  res.cookie("jwt", "", { maxAge: 1 });
  res.redirect("/");
}

module.exports = { sign_Up_Page, sign_In_Page, sign_Up, sign_In, sign_Out };
