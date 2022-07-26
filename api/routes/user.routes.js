const express = require("express");
const router = express.Router();

const already_Auth_Middleware = require("../middleware/authentication/already_Auth");
const check_Auth_Middleware = require("../middleware/authentication/check_Auth");
const validation_Middleware_Sign_Up = require("../middleware/validation/sign_Up_Validation");
const validation_Middleware_Sign_In = require("../middleware/validation/sign_In_Validation");
const user_Controller = require("../controllers/user.controller");

router.get(
  "/signup",

  already_Auth_Middleware.already_Auth,

  user_Controller.get_Sign_Up_Page
);
router.get(
  "/signin",

  already_Auth_Middleware.already_Auth,

  user_Controller.get_Sign_In_Page
);

router.post(
  "/signup",

  already_Auth_Middleware.already_Auth,

  validation_Middleware_Sign_Up.sign_Up_Validation,

  user_Controller.user_Sign_Up
);

router.post(
  "/signin",

  already_Auth_Middleware.already_Auth,

  validation_Middleware_Sign_In.sign_In_Validation,

  user_Controller.user_Sign_In
);

router.get(
  "/signout",

  check_Auth_Middleware.check_Auth,

  user_Controller.user_Sign_Out
);

module.exports = router;
