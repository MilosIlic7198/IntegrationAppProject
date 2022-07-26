const { body, validationResult } = require("express-validator");

//check if the form is valid
add_Integration_Validation = [
  body("name")
    .notEmpty()
    .withMessage("The firm name must not be empty!")
    .matches(/^[A-Za-z .]+$/)
    .withMessage("The firm name can only contain: [A-Za-z .]")
    .isLength({ min: 3, max: 25 })
    .withMessage(
      "The firm name must be minimum 3+ characters long and maximum 25 characters long."
    ),

  body("contact_name")
    .optional({ checkFalsy: true })
    .isAlpha("en-US", { ignore: " " })
    .withMessage("The contact name can only contain: [a-zA-Z]")
    .isLength({ min: 3, max: 20 })
    .withMessage(
      "The contact name must be minimum 3+ characters long and maximum 20 characters long."
    ),

  body("contact_email")
    .notEmpty()
    .withMessage("The contact email must not be empty!")
    .normalizeEmail()
    .isEmail()
    .withMessage("This is not a valid email!")
    .isLength({ min: 12, max: 30 })
    .withMessage(
      "The email must be minimum 12+ characters long and maximum 30 characters long."
    ),

  body("contact_phone")
    .optional({ checkFalsy: true })
    .isMobilePhone()
    .withMessage("This is not a valid phone number!")
    .isLength({ min: 10, max: 10 })
    .withMessage("The phone must be 10 numbers long."),

  body("contact_skype")
    .optional({ checkFalsy: true })
    .isString()
    .matches(/^[A-Za-z0-9 .:@]+$/)
    .withMessage("The contact skype can only contain: [A-Za-z0-9 .:@]")
    .isLength({ min: 6, max: 35 })
    .withMessage(
      "The skype must be minimum 6+ characters long and maximum 35 characters long."
    ),
  body("status")
    .notEmpty()
    .withMessage("The status must not be empty!")
    .isString()
    .isIn(["Negotiations", "Integration", "Production"])
    .withMessage("You need to check one of the available options in status!"),

  body("salesman_id")
    .notEmpty()
    .isInt()
    .withMessage("You need to check one of the salesman!"),

  body("integrator_id")
    .notEmpty()
    .isInt()
    .withMessage("You need to check one of the integrator!"),

  body("product")
    .notEmpty()
    .withMessage("The product must not be empty!")
    .isArray({ min: 1, max: 5 })
    .isIn([
      "File servers",
      "Cloud services",
      "Odds feed data",
      "Data security",
      "Support system",
    ])
    .withMessage("You need to check one or more available options in product!"),

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

module.exports = { add_Integration_Validation };
