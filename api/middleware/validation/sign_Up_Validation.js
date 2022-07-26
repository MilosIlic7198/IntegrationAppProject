const { body, validationResult } = require("express-validator");

//check if the form is valid
sign_Up_Validation = [
  body("name")
    .notEmpty()
    .withMessage("The name must not be empty!")
    .isAlpha("en-US", { ignore: " " })
    .withMessage("The name can only contain: [a-z A-Z]")
    .isLength({ min: 3, max: 20 })
    .withMessage(
      "The name must be minimum 3+ characters long and maximum 20 characters long."
    ),

  body("position")
    .notEmpty()
    .withMessage("The position must not be empty!")
    .isAlpha("en-US", { ignore: " " })
    .withMessage("The position can only contain: [a-zA-Z]")
    .isLength({ min: 6, max: 30 })
    .withMessage(
      "The position must be minimum 6+ characters long and maximum 30 characters long."
    ),

  body("username")
    .notEmpty()
    .withMessage("The username must not be empty!")
    .matches(/^[A-Za-z0-9 .]+$/)
    .withMessage("The username can only contain: [A-Za-z0-9 .]")
    .isLength({ min: 3, max: 15 })
    .withMessage(
      "The username must be minimum 3+ characters long and maximum 15 characters long."
    ),

  body("password")
    .notEmpty()
    .withMessage("The password must not be empty!")
    .matches(/^[A-Za-z0-9 .,:;<>?!'"&$%#]+$/)
    .withMessage(`The password can only contain: [A-Za-z0-9 .,:;<>?!'"&$%#]`)
    .isLength({ min: 6, max: 20 })
    .withMessage(
      "The password must be minimum 6+ characters long and maximum 20 characters long."
    ),

  body("repeat_Password")
    .notEmpty()
    .withMessage("The repeat password must not be empty!")
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Both repeat password and password must match!");
      }
      return true;
    }),

  function (req, res, next) {
    const result = validationResult(req).array();

    console.log(result);

    if (result.length) {
      for (let i = 0; i < result.length; i++) {
        return res.status(200).json({ message: result[i].msg });
      }
    } else {
      next();
    }
  },
];

module.exports = { sign_Up_Validation };
