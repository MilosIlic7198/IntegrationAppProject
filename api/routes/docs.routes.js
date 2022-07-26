const express = require("express");
const router = express.Router();

const check_Auth_Middleware = require("../middleware/authentication/check_Auth");
const check_Role_Middleware = require("../middleware/authorization/check_Role");
const docs_Controller = require("../controllers/docs.controller");

router.get(
  "/docs",

  check_Auth_Middleware.check_Auth,

  check_Role_Middleware.check_Role,

  docs_Controller.get_Docs_Page
);

module.exports = router;
