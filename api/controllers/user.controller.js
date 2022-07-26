const user_Model = require("../models/user.model");

get_Sign_Up_Page = (req, res) => {
  user_Model.sign_Up_Page(req, res);
};

get_Sign_In_Page = (req, res) => {
  user_Model.sign_In_Page(req, res);
};

user_Sign_Up = (req, res) => {
  user_Model.sign_Up(req, res);
};

user_Sign_In = (req, res) => {
  user_Model.sign_In(req, res);
};

user_Sign_Out = (req, res) => {
  user_Model.sign_Out(req, res);
};

module.exports = {
  get_Sign_Up_Page,
  get_Sign_In_Page,

  user_Sign_Up,
  user_Sign_In,
  user_Sign_Out,
};
