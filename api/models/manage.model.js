const connection = require("../models/db");

function manage_Page(req, res) {
  connection.query(
    "SELECT user.*, group_concat(DISTINCT role.name ORDER BY role.name SEPARATOR ', ') AS role FROM user JOIN user_role ON user.user_id = user_role.user_id JOIN role ON role.role_id = user_role.role_id GROUP BY user.user_id;",
    function (err, people, fields) {
      if (err) {
        res.status(500).json({
          message:
            err.message &
            "This error occurred while trying to load manage page. Try again!",
        });
      } else {
        res.render("pages/manage", { people: people });
      }
    }
  );
}

module.exports = { manage_Page };
