const connection = require("./db");

function home_Page(req, res) {
  connection.query(
    "SELECT user.user_id, user.name FROM user LEFT JOIN user_role ON user.user_id = user_role.user_id LEFT JOIN role ON user_role.role_id = role.role_id WHERE role.name = 'integrator';",
    function (err, integrator, files) {
      if (err) {
        res.status(500).json({
          message:
            err.message &
            "This error occurred while loading home page. Try again!",
        });
      } else {
        connection.query(
          "SELECT user.user_id, user.name FROM user LEFT JOIN user_role ON user.user_id = user_role.user_id LEFT JOIN role ON user_role.role_id = role.role_id WHERE role.name = 'salesman';",
          function (err, salesman, fields) {
            if (err) {
              res.status(500).json({
                message:
                  err.message &
                  "This error occurred while loading home page. Try again!",
              });
            } else {
              res.render("pages/home", {
                integrators: integrator,

                salesmans: salesman,
              });
            }
          }
        );
      }
    }
  );
}

function add(req, res) {
  console.log(req.body);

  let name = req.body.name;
  let status = req.body.status;
  let contact_name = req.body.contact_name;
  let contact_email = req.body.contact_email;
  let contact_phone = req.body.contact_phone;
  let contact_skype = req.body.contact_skype;
  let salesman_id = req.body.salesman_id;
  let integrator_id = req.body.integrator_id;
  let product = req.body.product;

  if (!name || !status || !contact_email || !product) {
    res.status(200).json({
      message:
        "Content cannot be empty! fill out: name, status, contact email, and product",
    });
  } else {
    connection.query(
      "SELECT * FROM client WHERE name=?;",
      [name],

      function (err, result, fields) {
        if (err) {
          res.status(500).json({
            message:
              err.message &
              "This error occurred while creating integration. Try again!",
          });
        } else if (result.length > 0) {
          res.status(200).json({
            message: `This client with name: ${name} already exists!`,
          });
        } else {
          try {
            connection.query(
              "INSERT INTO client (name, status, contact_name, contact_email, contact_phone, contact_skype, salesman_id, integrator_id) VALUES(?,?,?,?,?,?,?,?);",
              [
                name,
                status,
                contact_name,
                contact_email,
                contact_phone,
                contact_skype,
                salesman_id,
                integrator_id,
              ],

              // Stavio sam client_id za lakše razumevanje umesto result, zato što mi treba client id za unos u client_product.
              function (err, client_id, fields) {
                if (err) {
                  res.status(500).json({
                    message:
                      err.message &
                      "This error occurred while creating integration. Try again!",
                  });
                } else {
                  for (let i in product) {
                    connection.query(
                      "SELECT product_id FROM product WHERE name=?",
                      [product[i]],

                      function (err, result, fields) {
                        if (err) {
                          throw err;
                        } else if (result.length > 0) {
                          connection.query(
                            "INSERT INTO client_product VALUES(?,?)",
                            [client_id.insertId, result[0].product_id],

                            function (err, result, fields) {
                              if (err) {
                                throw err;
                              }
                            }
                          );
                        }
                      }
                    );
                  }

                  res.status(201).json({
                    message: "Integration was created!",
                    integration: client_id.insertId,
                  });
                }
              }
            );
          } catch (err) {
            res.status(408).json({
              message:
                err.message &
                "This error occurred while trying to add products. Try again!",
            });
          }
        }
      }
    );
  }
}

module.exports = { home_Page, add };
