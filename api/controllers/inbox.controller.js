const inbox_Model = require("../models/inbox.model");

get_Inbox_Page = (req, res) => {
  inbox_Model.inbox_Page(req, res);
};

module.exports = {
  get_Inbox_Page,
};
