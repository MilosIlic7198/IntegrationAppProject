const express = require("express");
const router = express.Router();

const check_Auth_Middleware = require("../middleware/authentication/check_Auth");
const check_Role_Middleware = require("../middleware/authorization/check_Role");
const about_Controller = require("../controllers/about.controller");

router.get(
  "/about",

  check_Auth_Middleware.check_Auth,

  check_Role_Middleware.check_Role,

  about_Controller.get_About_Page
);

module.exports = router;
