const manage_Model = require("../models/manage.model");

get_Manage_Page = (req, res) => {
  manage_Model.manage_Page(req, res);
};

module.exports = {
  get_Manage_Page,
};
