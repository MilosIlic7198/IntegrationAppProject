const express = require("express");
const router = express.Router();

const check_Auth_Middleware = require("../middleware/authentication/check_Auth");
const check_Role_Middleware = require("../middleware/authorization/check_Role");
const inbox_Controller = require("../controllers/inbox.controller");

router.get(
  "/inbox",

  check_Auth_Middleware.check_Auth,

  check_Role_Middleware.check_Integrator_Role,

  inbox_Controller.get_Inbox_Page
);

module.exports = router;
