const express = require("express");
const router = express.Router();

const check_Auth_Middleware = require("../middleware/authentication/check_Auth");
const check_Role_Middleware = require("../middleware/authorization/check_Role");
const integration_List_Controller = require("../controllers/integration_List.controller");

router.get(
  "/integrationList",

  check_Auth_Middleware.check_Auth,

  check_Role_Middleware.check_Role,

  integration_List_Controller.integration_List
);

router.get(
  "/integrationList/editIntegration/:integration_id",

  check_Auth_Middleware.check_Auth,

  check_Role_Middleware.check_Admin_Role,

  integration_List_Controller.get_Edit_Integration_Page
);

router.patch(
  "/integrationList/editIntegration/:integration_id",

  check_Auth_Middleware.check_Auth,

  check_Role_Middleware.check_Admin_Role,

  integration_List_Controller.edit_Integration
);

router.post(
  "/integrationList/setNote",

  check_Auth_Middleware.check_Auth,

  check_Role_Middleware.check_Role,

  integration_List_Controller.set_Note
);

router.delete(
  "/integrationList/deleteNote/:id",

  check_Auth_Middleware.check_Auth,

  check_Role_Middleware.check_Role,

  integration_List_Controller.delete_Note
);

module.exports = router;
