const connection = require("./db");

function list(req, res) {
  let user_id = res.locals.user_id;

  connection.query(
    "SELECT client.client_id, client.name, client.company_id, client.status, client.contact_name, client.contact_email, client.contact_phone, client.contact_skype, salesman_user.name AS salesman_name, integrator_user.name AS integrator_name, group_concat(DISTINCT product.name ORDER BY product.name SEPARATOR ', ') AS product FROM client JOIN user AS salesman_user ON client.salesman_id = salesman_user.user_id JOIN user AS integrator_user ON client.integrator_id = integrator_user.user_id JOIN client_product ON client.client_id = client_product.client_id JOIN product ON client_product.product_id = product.product_id GROUP BY client.client_id;",

    function (err, list, fields) {
      if (err) {
        res.status(500).json({
          message:
            err.message &
            "This error occurred while trying to get list of integrations. Try again!",
        });
      } else {
        connection.query(
          "SELECT client.client_id, client.name AS client_name, note.note_id, note.date_time AS note_date_time, note.note, note.public FROM client LEFT JOIN note ON client.client_id = note.client_id WHERE note.user_id = ? OR note.public = 1;",
          [user_id],

          function (err, notes, fields) {
            if (err) {
              res.status(500).json({
                message:
                  err.message &
                  "This error occurred while trying to get list of integrations. Try again!",
              });
            } else {
              res.status(200).render("pages/integration_List", {
                list: list,

                notes: notes,
              });
            }
          }
        );
      }
    }
  );
}

function edit_Page(req, res) {
  console.log(req.params.integration_id);

  let integration_id = parseInt(req.params.integration_id);

  connection.query(
    "SELECT user.user_id, user.name FROM user LEFT JOIN user_role ON user.user_id = user_role.user_id LEFT JOIN role ON user_role.role_id = role.role_id WHERE role.name = 'salesman';",

    function (err, salesman, fields) {
      if (err) {
        res.status(500).json({
          message:
            err.message &
            "This error occurred while trying to load edit page. Try again!",
        });
      } else {
        connection.query(
          "SELECT user.user_id, user.name FROM user LEFT JOIN user_role ON user.user_id = user_role.user_id LEFT JOIN role ON user_role.role_id = role.role_id WHERE role.name = 'integrator';",

          function (err, integrator, fields) {
            if (err) {
              res.status(500).json({
                message:
                  err.message &
                  "This error occurred while trying to load edit page. Try again!",
              });
            } else {
              connection.query(
                "SELECT * FROM client WHERE client_id = ?;",

                [integration_id],

                function (err, integration, fields) {
                  if (err) {
                    res.status(500).json({
                      message:
                        err.message &
                        "This error occurred while trying to load edit page. Try again!",
                    });
                  } else {
                    connection.query(
                      "SELECT product_id FROM client_product WHERE client_id = ?;",

                      [integration_id],

                      function (err, product_Id_Array, fields) {
                        if (err) {
                          res.status(500).json({
                            message:
                              err.message &
                              "This error occurred while trying to load edit page. Try again!",
                          });
                        } else {
                          let product_Name_Array = [];

                          for (let i = 0; i < product_Id_Array.length; i++) {
                            connection.query(
                              "SELECT name FROM product WHERE product_id = ?;",

                              [product_Id_Array[i].product_id],

                              function (err, product_Name, fields) {
                                for (let i = 0; i < product_Name.length; i++) {
                                  product_Name_Array.push(product_Name[i].name);
                                }

                                if (i == product_Id_Array.length - 1) {
                                  res
                                    .status(200)
                                    .render("pages/edit_Integration", {
                                      salesmans: salesman,

                                      integrators: integrator,

                                      integration: integration,

                                      product: product_Name_Array,
                                    });
                                }
                              }
                            );
                          }
                        }
                      }
                    );
                  }
                }
              );
            }
          }
        );
      }
    }
  );
}

function edit_Int(req, res) {
  console.log(req.params.integration_id);
  console.log(req.body);

  let integration_id = parseInt(req.params.integration_id);

  let name = req.body.name;
  let company_id = req.body.company_id;
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
    try {
      connection.query(
        "UPDATE client SET name = ?, company_id = ?, status = ?, contact_name = ?, contact_email = ?, contact_phone = ?, contact_skype = ?, salesman_id = ?, integrator_id = ? WHERE client.client_id = ?;",
        [
          name,
          company_id,
          status,
          contact_name,
          contact_email,
          contact_phone,
          contact_skype,
          salesman_id,
          integrator_id,
          integration_id,
        ],
        function (err, edited_Integration, fields) {
          if (err) {
            res.status(500).json({
              message:
                err.message &
                "This error occurred while trying to edit integration. Try again!",
            });
          } else {
            connection.query(
              "DELETE FROM client_product WHERE client_id = ?;",

              [integration_id],

              function (err, deleted_Products, fields) {
                if (err) {
                  throw err;
                } else {
                  let product_Id_Array = [];

                  for (let i = 0; i < product.length; i++) {
                    connection.query(
                      "SELECT product_id FROM product WHERE name=?",

                      [product[i]],

                      function (err, selected_Products, fields) {
                        if (err) {
                          throw err;
                        } else {
                          product_Id_Array.push(
                            selected_Products[0].product_id
                          );

                          if (i == product.length - 1) {
                            for (let i = 0; i < product_Id_Array.length; i++) {
                              connection.query(
                                "INSERT INTO client_product (client_id, product_id) VALUES (?,?);",

                                [integration_id, product_Id_Array[i]],

                                function (err, edited_Products, fields) {
                                  if (err) {
                                    throw err;
                                  } else if (i == product_Id_Array.length - 1) {
                                    res.status(200).json({
                                      message: `You have successfully edited integration with id of: ${integration_id}`,
                                    });
                                  }
                                }
                              );
                            }
                          }
                        }
                      }
                    );
                  }
                }
              }
            );
          }
        }
      );
    } catch (err) {
      res.status(408).json({
        message:
          err.message &
          "This error occurred while trying to edit products. Try again!",
      });
    }
  }
}

function note(req, res) {
  console.log(req.body);
  console.log(res.locals.user_id);

  let client_id = req.body.client_id;
  let user_id = res.locals.user_id;
  let date_time = req.body.date_time;
  let note = req.body.note;
  let public = req.body.public;

  connection.query(
    "INSERT INTO note (client_id, user_id, date_time, note, public) VALUES(?,?,?,?,?);",

    [client_id, user_id, date_time, note, public],

    function (err, result, fields) {
      if (err) {
        res.status(200).json({
          message: "Something went wrong while creating note.",
        });
      } else {
        res.status(200).json({ message: "You have created note." });
      }
    }
  );
}

function del_Note(req, res) {
  console.log(req.params.id);

  let note_id = req.params.id;

  connection.query(
    "DELETE FROM note WHERE note.note_id = ?",

    [note_id],

    function (err, result, fields) {
      if (err) {
        res.status(200).json({
          message: `Something went wrong while deleting note with id: ${note_id}`,
        });
      } else {
        res
          .status(200)
          .json({ message: `You have delete note with id: ${note_id}` });
      }
    }
  );
}

module.exports = {
  list,
  edit_Page,
  edit_Int,
  note,
  del_Note,
};
