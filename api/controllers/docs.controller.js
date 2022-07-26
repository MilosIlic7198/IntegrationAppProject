const docs_Model = require("../models/docs.model");

get_Docs_Page = (req, res) => {
  docs_Model.docs_Page(req, res);
};

module.exports = {
  get_Docs_Page,
};
