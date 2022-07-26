const connection = require("../models/db");

function docs_Page(req, res) {
  res.render("pages/docs");
}

module.exports = { docs_Page };
