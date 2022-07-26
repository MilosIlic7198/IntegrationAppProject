const integration_List_Model = require("../models/integration_List.model");

integration_List = (req, res) => {
  integration_List_Model.list(req, res);
};

get_Edit_Integration_Page = (req, res) => {
  integration_List_Model.edit_Page(req, res);
};

edit_Integration = (req, res) => {
  integration_List_Model.edit_Int(req, res);
};

set_Note = (req, res) => {
  integration_List_Model.note(req, res);
};

delete_Note = (req, res) => {
  integration_List_Model.del_Note(req, res);
};

set_Reminder = (req, res) => {
  integration_List_Model.reminder(req, res);
};

delete_Reminder = (req, res) => {
  integration_List_Model.del_Reminder(req, res);
};

module.exports = {
  integration_List,
  get_Edit_Integration_Page,
  edit_Integration,
  set_Note,
  delete_Note,
  set_Reminder,
  delete_Reminder,
};
