const about_Model = require("../models/about.model");

get_About_Page = (req, res) => {
  about_Model.about_Page(req, res);
};

module.exports = {
  get_About_Page,
};
