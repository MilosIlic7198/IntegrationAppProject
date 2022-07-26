const connection = require("../models/db");

function about_Page(req, res) {
  res.render("pages/about");
}

module.exports = { about_Page };
