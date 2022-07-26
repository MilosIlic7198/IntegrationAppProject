const home_Model = require("../models/home.model");

get_Home_Page = (req, res) => {
  home_Model.home_Page(req, res);
};

add_Integration = (req, res) => {
  home_Model.add(req, res);
};

module.exports = { get_Home_Page, add_Integration };
