const express = require("express");
const router = express.Router();

const check_Auth_Middleware = require("../middleware/authentication/check_Auth");
const check_Role_Middleware = require("../middleware/authorization/check_Role");
const validation_Middleware_Add_Integration = require("../middleware/validation/add_Integration_Validation");
const home_Controller = require("../controllers/home.controller");

router.get(
  "/",

  check_Auth_Middleware.check_Auth,

  home_Controller.get_Home_Page
);

router.post(
  "/addIntegration",

  check_Auth_Middleware.check_Auth,

  check_Role_Middleware.check_Salesman_Role,

  validation_Middleware_Add_Integration.add_Integration_Validation,

  home_Controller.add_Integration
);

module.exports = router;
