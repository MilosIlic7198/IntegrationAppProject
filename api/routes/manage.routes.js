const express = require("express");
const router = express.Router();

const check_Auth_Middleware = require("../middleware/authentication/check_Auth");
const check_Role_Middleware = require("../middleware/authorization/check_Role");
const manage_Controller = require("../controllers/manage.controller");

router.get(
  "/manage",

  check_Auth_Middleware.check_Auth,

  check_Role_Middleware.check_Admin_Role,

  manage_Controller.get_Manage_Page
);

module.exports = router;
