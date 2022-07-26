const connection = require("../models/db");

function inbox_Page(req, res) {
  res.render("pages/inbox");
}

module.exports = { inbox_Page };
